#include <stdio.h>
#include <stdint.h>
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

#define TOPICO_NIVEL "sgh/reservatorio/nivel"
#define TOPICO_CONSUMOS "sgh/consumos/cliente"
#define TOPICO_COMPORTA_STATUS "sgh/reservatorio/comporta/status"
#define TOPICO_COMPORTA_ACIONAR "sgh/reservatorio/comporta/acionar"

#define SENSOR_NIVEL_TRIGGER GPIO_NUM_17
#define SENSOR_NIVEL_ECHO GPIO_NUM_16
#define COMPORTA_1 GPIO_NUM_5
#define COMPORTA_2 GPIO_NUM_18

#define CLIENTE_1 GPIO_NUM_19
#define CLIENTE_2 GPIO_NUM_21
#define CLIENTE_3 GPIO_NUM_22
#define CLIENTE_4 GPIO_NUM_23

#define PULSOS_POR_LITRO 450.0
#define MINIMO 21

static esp_mqtt_client_handle_t cliente_mqtt;
static int altura = 1;

typedef struct
{
    const char *id;
    gpio_num_t pin;
} comporta_entry_t;

static const comporta_entry_t tabela_comportas[] = {
    {"1", COMPORTA_1},
    {"2", COMPORTA_2}};

typedef struct
{
    const char *id;
    gpio_num_t pin;
    volatile uint32_t pulsos;
} cliente_flow_t;

static cliente_flow_t tabela_clientes[] = {
    {"1", CLIENTE_1, 0},
    {"2", CLIENTE_2, 0},
    {"3", CLIENTE_3, 0},
    {"4", CLIENTE_4, 0},
};

static bool is_vazio(void)
{
    return altura < 1;
}

void comportas_setup(void)
{
    for (int i = 0; i < sizeof(tabela_comportas) / sizeof(tabela_comportas[0]); i++)
    {
        gpio_reset_pin(tabela_comportas[i].pin);
        gpio_set_direction(tabela_comportas[i].pin, GPIO_MODE_INPUT_OUTPUT);
        gpio_set_level(tabela_comportas[i].pin, 1);
        gpio_set_pull_mode(tabela_comportas[i].pin, GPIO_PULLUP_ONLY);
    }
}

static void set_comporta(char *comporta_id, char *data)
{
    int comporta_num = -1;

    for (int i = 0; i < sizeof(tabela_comportas) / sizeof(tabela_comportas[0]); i++)
    {
        if (strcmp(comporta_id, tabela_comportas[i].id) == 0)
        {
            comporta_num = tabela_comportas[i].pin;
            break;
        }
    }

    if (comporta_num == -1)
        return;

    if (strncmp(data, "1", strlen(data)) == 0)
    {
        gpio_set_level(comporta_num, 1);
    }
    else if (strncmp(data, "0", strlen(data)) == 0)
    {
        gpio_set_level(comporta_num, 0);
    }

    char topic[128];
    snprintf(topic, sizeof(topic), "%s/%s", TOPICO_COMPORTA_STATUS, comporta_id);
    esp_mqtt_client_publish(cliente_mqtt, topic, data, 0, 0, 0);
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
        char topico[128];
        snprintf(topico, sizeof(topico), "%s/#", TOPICO_COMPORTA_ACIONAR);
        msg_id = esp_mqtt_client_subscribe(client, topico, 0);
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

        char topic_safe[128];
        char data_safe[32];

        if (event->topic_len >= sizeof(topic_safe) || event->data_len >= sizeof(data_safe))
        {
            ESP_LOGE(TAG, "Topic or data too long");
            break;
        }

        memcpy(topic_safe, event->topic, event->topic_len);
        topic_safe[event->topic_len] = '\0';

        memcpy(data_safe, event->data, event->data_len);
        data_safe[event->data_len] = '\0';

        if (is_vazio() && strcmp(data_safe, "0") == 0)
        {
            strcpy(data_safe, "1");
        }

        char *comporta = strrchr(topic_safe, '/');

        if (comporta == NULL)
        {
            ESP_LOGE(TAG, "Invalid topic: %s", topic_safe);
            break;
        }
        comporta++;
        set_comporta(comporta, data_safe);
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
    uint32_t distancia;

    int altura_anterior = 1;

    while (true)
    {
        esp_err_t res = ultrasonic_measure_cm(&sensor, 500, &distancia);
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
            char altura_str[16];
            altura = MINIMO - distancia;
            snprintf(altura_str, sizeof(altura_str), "%d", altura);
            esp_mqtt_client_publish(cliente_mqtt, TOPICO_NIVEL, altura_str, 0, 0, 0);
            if (altura != altura_anterior)
            {
                altura_anterior = altura;
                if (is_vazio())
                {
                    for (int i = 0; i < sizeof(tabela_comportas) / sizeof(tabela_comportas[0]); i++)
                    {
                        gpio_set_level(tabela_comportas[i].pin, 1);
                        char topic[128];
                        snprintf(topic, sizeof(topic), "%s/%s", TOPICO_COMPORTA_STATUS, tabela_comportas[i].id);
                        esp_mqtt_client_publish(cliente_mqtt, topic, "1", 0, 0, 0);
                    }
                }
            }
            vTaskDelay(pdMS_TO_TICKS(2000));
        }
    }
}

static void IRAM_ATTR flow_isr_handler(void *arg)
{
    volatile uint32_t *pulsos = (volatile uint32_t *)arg;
    (*pulsos)++;
}

static void fluxometro_task(void *pvParameters)
{
    gpio_install_isr_service(0);

    for (int i = 0; i < sizeof(tabela_clientes) / sizeof(tabela_clientes[0]); i++)
    {
        gpio_reset_pin(tabela_clientes[i].pin);
        gpio_set_direction(tabela_clientes[i].pin, GPIO_MODE_INPUT);
        gpio_set_pull_mode(tabela_clientes[i].pin, GPIO_PULLUP_ONLY);
        gpio_set_intr_type(tabela_clientes[i].pin, GPIO_INTR_POSEDGE);
        gpio_isr_handler_add(tabela_clientes[i].pin, flow_isr_handler, (void *)&tabela_clientes[i].pulsos);
    }

    while (true)
    {
        uint32_t pulsos_snapshot[sizeof(tabela_clientes) / sizeof(tabela_clientes[0])];
        for (int i = 0; i < sizeof(tabela_clientes) / sizeof(tabela_clientes[0]); i++)
        {
            pulsos_snapshot[i] = tabela_clientes[i].pulsos;
        }

        vTaskDelay(pdMS_TO_TICKS(1000));

        for (int i = 0; i < sizeof(tabela_clientes) / sizeof(tabela_clientes[0]); i++)
        {
            uint32_t pulsos_atuais = tabela_clientes[i].pulsos;

            if (pulsos_atuais > 0)
            {
                if (pulsos_atuais != pulsos_snapshot[i])
                {
                    ESP_LOGD("Fluxo", "Cliente %s consumindo...", tabela_clientes[i].id);
                }
                else
                {
                    float litros = (float)pulsos_atuais / PULSOS_POR_LITRO;
                    char topic[128];
                    char payload[16];
                    snprintf(topic, sizeof(topic), "%s/%s", TOPICO_CONSUMOS, tabela_clientes[i].id);
                    snprintf(payload, sizeof(payload), "%.3f", litros);

                    esp_mqtt_client_publish(cliente_mqtt, topic, payload, 0, 0, 0);
                    ESP_LOGI(TAG, "Cliente %s: %.3f Litros", tabela_clientes[i].id, litros);

                    tabela_clientes[i].pulsos = 0;
                }
            }
        }
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

// FUNÇÃO PRINCIPAL
void app_main(void)
{
    ESP_LOGI(TAG, "[APP] Startup..");
    ESP_LOGI(TAG, "[APP] Free memory: %" PRIu32 " bytes", esp_get_free_heap_size());
    ESP_LOGI(TAG, "[APP] IDF version: %s", esp_get_idf_version());

    esp_log_level_set("*", ESP_LOG_INFO);
    esp_log_level_set("app_main", ESP_LOG_VERBOSE);
    esp_log_level_set("mqtt_client", ESP_LOG_VERBOSE);

    comportas_setup();
    wifi_connect_start();
    mqtt_app_start();
    xTaskCreatePinnedToCore(ultrasonic_task, "ultrasonic_task", 4096, NULL, 1, NULL, 1);
    xTaskCreatePinnedToCore(fluxometro_task, "fluxometro_task", 4096, NULL, 1, NULL, 1);
}