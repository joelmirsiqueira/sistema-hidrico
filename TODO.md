# Lista de Tarefas - Projeto IoT de Monitoramento

Este arquivo descreve todos os passos necessários para desenvolver o projeto de monitoramento de temperatura e umidade com ESP32, MQTT e MongoDB.

##  Fase 1: Configuração do Ambiente e Infraestrutura

- [x] **Controle de Versão:**
  - [x] Iniciar um repositório Git para o projeto.
  - [x] Criar uma estrutura de pastas (`/backend`, `/firmware-esp32`, `frontend`).

- [x] **Broker MQTT:**
  - [x] Instalar e configurar um broker MQTT (ex: Mosquitto) localmente ou usar um serviço em nuvem.
  - [x] Testar a publicação e subscrição de mensagens para validar o broker.

- [x] **Banco de Dados:**
  - [x] Instalar e configurar uma instância do MongoDB localmente ou usar um serviço em nuvem (ex: MongoDB Atlas).
  - [x] Criar o banco de dados e a coleção para armazenar os dados de telemetria.

## Fase 2: Desenvolvimento do Firmware (ESP32 com ESP-IDF)

- [x] **Inicialização do Projeto:**
  - [x] Criar um novo projeto usando o template do ESP-IDF.

- [x] **Conectividade Wi-Fi:**
  - [x] Implementar a lógica para conectar o ESP32 a uma rede Wi-Fi.
  - [x] Armazenar as credenciais de forma segura (ex: via `menuconfig`).

- [x] **Integração com Sensor:**
  - [x] Escolher e adicionar o componente/driver para o sensor de temperatura e umidade (ex: DHT11/DHT22).
  - [x] Implementar a função para ler os dados do sensor.

- [x] **Cliente MQTT:**
  - [x] Adicionar o componente MQTT do ESP-IDF ao projeto.
  - [x] Implementar a lógica para conectar o ESP32 ao broker MQTT.
  - [x] Criar funções para publicar os dados lidos do sensor nos tópicos corretos (ex: `/sensor/temperatura` e `/sensor/umidade`).

- [x] **Lógica Principal:**
  - [x] Criar a tarefa principal que:
    - [x] Conecta ao Wi-Fi.
    - [x] Conecta ao MQTT.
    - [x] Entra em um loop para ler o sensor e publicar os dados em intervalos definidos (ex: a cada 5 minutos).

- [x] **Testes e Depuração:**
  - [x] Implementar logs para monitorar o status da conexão e os dados enviados.
  - [x] Testar o firmware de forma isolada, verificando se as mensagens chegam corretamente no broker MQTT.

## Fase 3: Desenvolvimento do Backend (Node.js)

- [x] **Inicialização do Projeto:**
  - [x] Iniciar um novo projeto Node.js (`npm init -y`).
  - [x] Instalar as dependências principais: `express`, `mqtt`, `mongodb` (ou `mongoose`), `dotenv`.

- [ ] **Conexão com Banco de Dados:**
  - [x] Implementar a lógica para se conectar ao banco de dados MongoDB.
  - [ ]Criar um módulo para gerenciar a conexão com o MongoDB.
  - [ ] Definir um Schema/Modelo para os dados de telemetria (ex: `timestamp`, `type`, `value`).

- [ ] **Serviço MQTT:**
  - [ ] Criar um serviço para se conectar ao broker MQTT.
  - [ ] Implementar a lógica para se inscrever (subscribe) nos tópicos de temperatura e umidade.
  - [ ] Implementar o handler que será executado ao receber uma nova mensagem.

- [ ] **Lógica de Negócio:**
  - [ ] No handler de mensagens MQTT, processar os dados recebidos.
  - [ ] Salvar os dados processados no MongoDB, associando um timestamp.

- [ ] **Configuração:**
  - [ ] Criar um arquivo `.env` para armazenar as variáveis de ambiente (URL do MongoDB, endereço do broker MQTT).
  - [ ] Carregar as variáveis de ambiente na aplicação usando `dotenv`.

- [ ] **API (Opcional):**
  - [ ] Criar rotas com Express para expor os dados salvos (ex: `GET /dados/temperatura`).

- [ ] **Testes:**
  - [ ] Testar o backend de forma isolada, publicando mensagens manualmente no broker e verificando se são salvas no banco.

## Fase 4: Integração e Finalização

- [ ] **Teste End-to-End:**
  - [ ] Executar todos os componentes (Firmware, Broker, Backend, Banco de Dados) simultaneamente.
  - [ ] Verificar se o fluxo completo, desde a leitura do sensor até o armazenamento no banco, está funcionando como esperado.

- [ ] **Documentação:**
  - [ ] Revisar e atualizar o `README.md` com as instruções finais de configuração e execução do projeto.
  - [ ] Adicionar comentários importantes no código.
