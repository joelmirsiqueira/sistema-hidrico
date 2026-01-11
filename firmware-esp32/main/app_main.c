#include <stdio.h>
#include <stdint.h>
#include <stddef.h>
#include <string.h>
#include <inttypes.h>
#include "sdkconfig.h"
#include "esp_event.h"
#include "esp_system.h"
#include "nvs_flash.h"
#include "esp_netif.h"
#include "protocol_examples_common.h"
#include "esp_log.h"
#include "mqtt_client.h"
#include "driver/gpio.h"
#include <ultrasonic.h>
#include <freertos/FreeRTOS.h>
#include <freertos/task.h>

static const char *TAG = "app_main";

#define TOPICO_CONSUMO "sistema_hidrico/consumo"
#define TOPICO_NIVEL_STATUS "sistema_hidrico/reservatorio/nivel/status"
#define TOPICO_COMPORTA_STATUS "sistema_hidrico/reservatorio/comporta/status"
#define TOPICO_COMPORTA_ACIONAR "sistema_hidrico/reservatorio/comporta/acionar"

#define SENSOR_NIVEL_TRIGGER GPIO_NUM_19
#define SENSOR_NIVEL_ECHO GPIO_NUM_18
#define SENSOR_FLUXO GPIO_NUM_5
#define COMPORTA GPIO_NUM_21

#define PULSOS_POR_LITRO 450.0

static esp_mqtt_client_handle_t cliente_mqtt;
static volatile uint32_t pulsos_total = 0;

void comporta_setup(void)
{
    gpio_reset_pin(COMPORTA);
    gpio_set_direction(COMPORTA, GPIO_MODE_OUTPUT);
    gpio_set_level(COMPORTA, 1);
    gpio_set_pull_mode(COMPORTA, GPIO_PULLUP_ONLY);

}

static void set_comporta(char *data, int data_len)
{
    if (strncmp(data, "0", data_len) == 0)
    {
        gpio_set_level(COMPORTA, 0);
        esp_mqtt_client_publish(cliente_mqtt, TOPICO_COMPORTA_STATUS, "0", 0, 0, 0);
    }
    else if (strncmp(data, "1", data_len) == 0)
    {
        gpio_set_level(COMPORTA, 1);
        esp_mqtt_client_publish(cliente_mqtt, TOPICO_COMPORTA_STATUS, "1", 0, 0, 0);
    }
}

static void log_error_if_nonzero(const char *message, int error_code)
{
    if (error_code != 0)
    {
        ESP_LOGE(TAG, "Last error %s: 0x%x", message, error_code);
    }
}

static void mqtt_event_handler(void *handler_args, esp_event_base_t base, int32_t event_id, void *event_data)
{
    ESP_LOGD(TAG, "Event dispatched from event loop base=%s, event_id=%" PRIi32 "", base, event_id);
    esp_mqtt_event_handle_t event = event_data;
    esp_mqtt_client_handle_t client = event->client;
    int msg_id;
    switch ((esp_mqtt_event_id_t)event_id)
    {
    case MQTT_EVENT_CONNECTED:
        ESP_LOGI(TAG, "MQTT_EVENT_CONNECTED");
        msg_id = esp_mqtt_client_subscribe(client, TOPICO_COMPORTA_ACIONAR, 0);
        ESP_LOGI(TAG, "inscrito com sucesso, msg_id=%d", msg_id);
        break;

    case MQTT_EVENT_DISCONNECTED:
        ESP_LOGI(TAG, "MQTT_EVENT_DISCONNECTED");
        break;

    case MQTT_EVENT_PUBLISHED:
        ESP_LOGI(TAG, "MQTT_EVENT_PUBLISHED, msg_id=%d", event->msg_id);
        break;
    case MQTT_EVENT_DATA:
        ESP_LOGI(TAG, "MQTT_EVENT_DATA");
        set_comporta(event->data, event->data_len);
        break;

    case MQTT_EVENT_ERROR:
        ESP_LOGI(TAG, "MQTT_EVENT_ERROR");
        if (event->error_handle->error_type == MQTT_ERROR_TYPE_TCP_TRANSPORT)
        {
            log_error_if_nonzero("reported from esp-tls", event->error_handle->esp_tls_last_esp_err);
            log_error_if_nonzero("reported from tls stack", event->error_handle->esp_tls_stack_err);
            log_error_if_nonzero("captured as transport's socket errno", event->error_handle->esp_transport_sock_errno);
            ESP_LOGI(TAG, "Last errno string (%s)", strerror(event->error_handle->esp_transport_sock_errno));
        }
        break;
    default:
        ESP_LOGI(TAG, "Other event id:%d", event->event_id);
        break;
    }
}

static void ultrasonic_task(void *pvParameters)
{
    ultrasonic_sensor_t sensor = {
        .trigger_pin = SENSOR_NIVEL_TRIGGER,
        .echo_pin = SENSOR_NIVEL_ECHO};

    ultrasonic_init(&sensor);

    while (true)
    {
        uint32_t distance;
        esp_err_t res = ultrasonic_measure_cm(&sensor, 500, &distance);
        if (res != ESP_OK)
        {
            ESP_LOGE("ultrasonic", "Error %d: ", res);
            switch (res)
            {
            case ESP_ERR_ULTRASONIC_PING:
                ESP_LOGE("ultrasonic", "Cannot ping (device is in invalid state)\n");
                break;
            case ESP_ERR_ULTRASONIC_PING_TIMEOUT:
                ESP_LOGE("ultrasonic", "Ping timeout (no device found)\n");
                break;
            case ESP_ERR_ULTRASONIC_ECHO_TIMEOUT:
                ESP_LOGE("ultrasonic", "Echo timeout (i.e. distance too big)\n");
                break;
            default:
                ESP_LOGE("ultrasonic", "%s\n", esp_err_to_name(res));
            }
        }
        else
        {
            char nivel_str[16];
            snprintf(nivel_str, sizeof(nivel_str), "%ld", distance);
            esp_mqtt_client_publish(cliente_mqtt, TOPICO_NIVEL_STATUS, nivel_str, 0, 0, 0);
        }

        vTaskDelay(pdMS_TO_TICKS(2000));
    }
}

static void IRAM_ATTR flow_isr_handler(void *arg)
{
    pulsos_total++;
}

static void fluxometro_task(void *pvParameters)
{
    gpio_reset_pin(SENSOR_FLUXO);
    gpio_set_direction(SENSOR_FLUXO, GPIO_MODE_INPUT);
    gpio_set_level(SENSOR_FLUXO, 1);
    gpio_set_pull_mode(SENSOR_FLUXO, GPIO_PULLUP_ONLY);
    gpio_set_intr_type(SENSOR_FLUXO, GPIO_INTR_POSEDGE);

    gpio_install_isr_service(0);
    gpio_isr_handler_add(SENSOR_FLUXO, flow_isr_handler, NULL);

    while (true)
    {
        // uint32_t pulsos = pulsos_total;
        // vTaskDelay(pdMS_TO_TICKS(1000));
        // if (pulsos_total > 0 && pulsos == pulsos_total)
        if (pulsos_total > 0)
        {
            float litros = (float)pulsos_total / PULSOS_POR_LITRO;
            ESP_LOGI(TAG, "Litros: %.3f", litros);
            char litros_str[16];
            snprintf(litros_str, sizeof(litros_str), "%.3f", litros);
            esp_mqtt_client_publish(cliente_mqtt, TOPICO_CONSUMO, litros_str, 0, 0, 0);
            pulsos_total = 0;
        }
        vTaskDelay(pdMS_TO_TICKS(5000));
    }
}

static void mqtt_app_start(void)
{
    esp_mqtt_client_config_t mqtt_cfg = {
        .broker.address.uri = CONFIG_BROKER_URL,
    };

    cliente_mqtt = esp_mqtt_client_init(&mqtt_cfg);
    esp_mqtt_client_register_event(cliente_mqtt, ESP_EVENT_ANY_ID, mqtt_event_handler, NULL);
    esp_mqtt_client_start(cliente_mqtt);
}

static void wifi_connect_start(void)
{
    ESP_ERROR_CHECK(nvs_flash_init());
    ESP_ERROR_CHECK(esp_netif_init());
    ESP_ERROR_CHECK(esp_event_loop_create_default());

    ESP_ERROR_CHECK(example_connect());
}

void app_main(void)
{
    ESP_LOGI(TAG, "[APP] Startup..");
    ESP_LOGI(TAG, "[APP] Free memory: %" PRIu32 " bytes", esp_get_free_heap_size());
    ESP_LOGI(TAG, "[APP] IDF version: %s", esp_get_idf_version());

    esp_log_level_set("*", ESP_LOG_INFO);
    esp_log_level_set("app_main", ESP_LOG_VERBOSE);
    esp_log_level_set("mqtt_client", ESP_LOG_VERBOSE);

    comporta_setup();
    wifi_connect_start();
    mqtt_app_start();
    xTaskCreatePinnedToCore(ultrasonic_task, "ultrasonic_task", 4096, NULL, 1, NULL, 1);
    xTaskCreatePinnedToCore(fluxometro_task, "fluxometro_task", 4096, NULL, 1, NULL, 1);
}