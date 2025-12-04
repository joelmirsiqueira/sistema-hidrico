# Monitoramento de Temperatura e Umidade IoT com ESP32, MQTT e MongoDB

Este projeto implementa uma solução completa de IoT para monitorar a temperatura e a umidade. Um dispositivo ESP32 lê os dados de um sensor e os publica em um broker MQTT. Uma aplicação backend se inscreve nos tópicos MQTT, recebe os dados e os armazena em um banco de dados MongoDB para futura análise e visualização.

## Arquitetura

O projeto segue uma arquitetura IoT clássica:

```
+---------+      +-----------------+      +-----------------+      +-------------------+
|  ESP32  |----->|  Broker MQTT    |<-----|    Backend      |----->|     MongoDB       |
| Sensor  |      | (ex: Mosquitto) |      | (ex: Node.js)   |      |     Database      |
+---------+      +-----------------+      +-----------------+      +-------------------+
    |                                              ^
    | (Publica Dados)                              | (Inscreve-se nos Tópicos)
    |                                              |
    v                                              |
[Tópico: /temperature]                             |
[Tópico: /humidity]                                |
```

1.  **ESP32:** Um microcontrolador responsável por ler a temperatura e a umidade de um sensor conectado (como DHT11/DHT22).
2.  **Broker MQTT:** Um intermediário de mensagens central que gerencia a comunicação entre o ESP32 (publisher) e o backend (subscriber).
3.  **Backend:** Uma aplicação que se inscreve nos tópicos `/temperature` e `/humidity` no broker MQTT.
4.  **MongoDB:** Um banco de dados NoSQL onde o backend armazena os dados recebidos do sensor.

## Tecnologias Utilizadas

*   **Hardware:**
    *   ESP32
    *   Sensor de Temperatura/Umidade (ex: DHT11, DHT22)
*   **Software:**
    *   **Firmware:** C (ESP-IDF)
    *   **Backend:** Node.js com Express (ou qualquer outro framework)
    *   **Banco de Dados:** MongoDB
    *   **Mensageria:** MQTT

## Como Começar

### Pré-requisitos

*   **Hardware:**
    *   Uma placa de desenvolvimento ESP32.
    *   Um sensor de temperatura e umidade compatível.
*   **Software:**
    *   ESP-IDF para a programação do ESP32.
    *   Um Broker MQTT em execução (como Mosquitto).
    *   Uma instância do MongoDB em execução.
    *   Node.js e npm instalados para o backend.

### Instalação

1.  **Firmware do ESP32:**
    *   Clone o repositório que contém o código do ESP32.
    *   Abra o projeto em seu editor de código de preferência.
    *   Configure os componentes necessários através do `idf.py menuconfig` (ex: MQTT, driver de sensor).
    *   Configure suas credenciais de Wi-Fi e o endereço do broker MQTT no código.
    *   Compile e faça o upload do firmware para o seu ESP32 com `idf.py flash`.

2.  **Backend:**
    *   Navegue até o diretório `backend`.
    *   Instale as dependências:
        ```bash
        npm install
        ```
    *   Crie um arquivo `.env` e configure os detalhes de conexão do broker MQTT e do MongoDB.
    *   Inicie o servidor backend:
        ```bash
        npm start
        ```

## Uso

Com todos os componentes em execução, o ESP32 começará a ler automaticamente os dados do sensor e a publicá-los nos tópicos MQTT configurados. O backend ouvirá essas mensagens, as processará e as salvará no banco de dados MongoDB.

Você pode então consultar o banco de dados para recuperar dados históricos ou construir uma aplicação frontend para visualizar os dados em tempo real.
