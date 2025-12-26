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

#define TOPICO_STATUS_NIVEL "sistema_hidrico/reservatorio/status/nivel"
#define TOPICO_STATUS_COMPORTA_1 "sistema_hidrico/reservatorio/status/comporta/1"
#define TOPICO_STATUS_COMPORTA_2 "sistema_hidrico/reservatorio/status/comporta/2"
#define TOPICO_ACIONAR_COMPORTA_1 "sistema_hidrico/reservatorio/acionar/comporta/1"
#define TOPICO_ACIONAR_COMPORTA_2 "sistema_hidrico/reservatorio/acionar/comporta/2"

#define VALVULA_1 23
#define VALVULA_2 22
#define SENSOR_NIVEL_TRIGGER GPIO_NUM_32
#define SENSOR_NIVEL_ECHO GPIO_NUM_35
#define SENSOER_FLUXO GPIO_NUM_5

static esp_mqtt_client_handle_t client;

void components_start(void)
{
    gpio_reset_pin(VALVULA_1);
    gpio_reset_pin(VALVULA_2);
    gpio_reset_pin(SENSOR_NIVEL_TRIGGER);
    gpio_reset_pin(SENSOR_NIVEL_ECHO);
    gpio_reset_pin(SENSOER_FLUXO);

    gpio_set_direction(VALVULA_1, GPIO_MODE_INPUT_OUTPUT);
    gpio_set_direction(VALVULA_2, GPIO_MODE_INPUT_OUTPUT);
    gpio_set_direction(SENSOR_NIVEL_TRIGGER, GPIO_MODE_OUTPUT);
    gpio_set_direction(SENSOR_NIVEL_ECHO, GPIO_MODE_INPUT);
    gpio_set_direction(SENSOER_FLUXO, GPIO_MODE_INPUT);
    gpio_set_pull_mode(SENSOER_FLUXO, GPIO_PULLDOWN_ENABLE);

    gpio_set_level(VALVULA_1, 0);
    gpio_set_level(VALVULA_2, 0);
    gpio_set_level(SENSOR_NIVEL_TRIGGER, 0);
}

static void set_valvula(int valvula, char *data)
{
    int level = (strncmp(data, "0", 1) == 0) ? 0 : 1;
    gpio_set_level(valvula, level);
}

static void publish_get_valvula(int valvula, char *topico)
{
    char *level = (gpio_get_level(valvula) == 0) ? "0" : "1";
    esp_mqtt_client_publish(client, topico, level, 0, 0, 0);
}

static void ultrasonic_start(void *pvParameters)
{
    ultrasonic_sensor_t sensor = {
        .trigger_pin = SENSOR_NIVEL_TRIGGER,
        .echo_pin = SENSOR_NIVEL_ECHO
    };

    ultrasonic_init(&sensor);

    while (true)
    {
        float distance;
        esp_err_t res = ultrasonic_measure(&sensor, 500, &distance);
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
        else {
            char nivel_str[16];
            snprintf(nivel_str, sizeof(nivel_str), "%.0f", distance * 100);
            esp_mqtt_client_publish(client, TOPICO_STATUS_NIVEL, nivel_str, 0, 0, 0);
        }

        vTaskDelay(pdMS_TO_TICKS(2000));
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

        msg_id = esp_mqtt_client_subscribe(client, TOPICO_ACIONAR_COMPORTA_1, 0);
        ESP_LOGI(TAG, "inscrito com sucesso, msg_id=%d", msg_id);
        msg_id = esp_mqtt_client_subscribe(client, TOPICO_ACIONAR_COMPORTA_2, 0);
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
        if (event->topic_len == strlen(TOPICO_ACIONAR_COMPORTA_1) && strncmp(event->topic, TOPICO_ACIONAR_COMPORTA_1, event->topic_len) == 0)
        {
            set_valvula(VALVULA_1, (char *)event->data);
            publish_get_valvula(VALVULA_1, TOPICO_STATUS_COMPORTA_1);
        }
        else if (event->topic_len == strlen(TOPICO_ACIONAR_COMPORTA_2) && strncmp(event->topic, TOPICO_ACIONAR_COMPORTA_2, event->topic_len) == 0)
        {
            set_valvula(VALVULA_2, (char *)event->data);
            publish_get_valvula(VALVULA_2, TOPICO_STATUS_COMPORTA_2);
        }

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

static void mqtt_app_start(void)
{
    esp_mqtt_client_config_t mqtt_cfg = {
        .broker.address.uri = CONFIG_BROKER_URL,
    };

    client = esp_mqtt_client_init(&mqtt_cfg);
    esp_mqtt_client_register_event(client, ESP_EVENT_ANY_ID, mqtt_event_handler, NULL);
    esp_mqtt_client_start(client);
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

    components_start();
    wifi_connect_start();
    mqtt_app_start();
    xTaskCreatePinnedToCore(ultrasonic_start, "ultrasonic_start", 4096, NULL, 1, NULL, 1);
}