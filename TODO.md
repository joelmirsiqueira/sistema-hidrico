# Lista de Tarefas - Sistema de Monitoramento e Gestão Hídrica

Este arquivo descreve os passos para desenvolver o sistema de gestão hídrica com ESP32, MQTT, Node.js, React e MongoDB.

##  Fase 1: Configuração do Ambiente e Infraestrutura

- [x] **Controle de Versão:**
  - [x] Iniciar um repositório Git.
  - [x] Estrutura de pastas (`/backend`, `/firmware-esp32`, `/frontend`).

- [x] **Broker MQTT:**
  - [x] Instalar e configurar Broker MQTT (Mosquitto ou HiveMQ).
  - [x] Testar pub/sub.

- [x] **Banco de Dados:**
  - [x] Configurar MongoDB (Atlas ou local).
  - [x] Criar database para o sistema.

## Fase 2: Desenvolvimento do Firmware (ESP32 com ESP-IDF)

- [x] **Inicialização do Projeto:**
  - [x] Criar um novo projeto usando o template do ESP-IDF.

- [x] **Conectividade Wi-Fi:**
  - [x] Implementar a lógica para conectar o ESP32 a uma rede Wi-Fi.
  - [x] Armazenar as credenciais de forma segura (ex: via `menuconfig`).

- [x] **Sensores e Atuadores (Hardware):**
  - [x] **Fluxo:** Implementar leitura de pulsos para os sensores de fluxo (YF-S201).
  - [x] **Nível:** Implementar leitura do sensor ultrassônico (HC-SR04).
  - [x] **Válvulas:** Implementar controle de GPIO para acionamento dos relés das válvulas solenoide.

- [ ] **Lógica e MQTT:**
  - [x] Conectar ao broker MQTT.
  - [x] **Publicação:** Enviar telemetria de nível (`/sensor/nivel`) e fluxo (`/sensor/fluxo`) periodicamente.
  - [x] **Subscrição:** Escutar tópico de comando das válvulas (`/comando/valvula`).
  - [x] Implementar ação de abrir/fechar válvulas ao receber mensagem MQTT.

- [x] **Lógica Principal:**
  - [x] Criar a tarefa principal que:
    - [x] Conecta ao Wi-Fi.
    - [x] Conecta ao MQTT.
    - [x] Entra em um loop para ler o sensor e publicar os dados em intervalos definidos (ex: a cada 5 minutos).

- [x] **Testes e Depuração:**
  - [x] Implementar logs para monitorar o status da conexão e os dados enviados.
  - [x] Testar o firmware de forma isolada, verificando se as mensagens chegam corretamente no broker MQTT.

## Fase 3: Desenvolvimento do Backend (Node.js)

- [x] **Inicialização:**
  - [x] Projeto Node.js, dependências (`express`, `mqtt`, `mongoose`, `dotenv`).

- [ ] **Banco de Dados (MongoDB):**
  - [x] Conexão Mongoose.
  - [ ] **Definição de Schemas (Models):**
    - [ ] `LeituraNivel` (timestamp, valor).
    - [ ] `LeituraConsumo` (timestamp, clienteId, volume).
    - [ ] `Cliente` (dados cadastrais, status, unidade).
    - [x] `Usuario` (login, senha, tipo: cliente/funcionario).

- [ ] **Serviço MQTT:**
  - [x] Subscrever aos tópicos de sensores (`/sensor/+`).
  - [ ] Processar e salvar dados de nível e consumo no banco.
  - [ ] Implementar função para publicar comandos de controle de válvulas.

- [ ] **API REST (Express):**
  - [ ] **Autenticação:** Login e middleware de proteção de rotas.
  - [ ] **Rotas de Cliente:** Consultar consumo, status da unidade e cronograma.
  - [ ] **Rotas de Funcionário:**
    - [ ] Dashboard de nível do reservatório.
    - [ ] Controle de válvulas (acionar via MQTT).
    - [ ] Gestão de clientes (CRUD).

- [ ] **Configuração:**
  - [ ] Criar um arquivo `.env` para armazenar as variáveis de ambiente (URL do MongoDB, endereço do broker MQTT).
  - [ ] Carregar as variáveis de ambiente na aplicação usando `dotenv`.
## Fase 4: Desenvolvimento do Frontend (React)

- [ ] **Inicialização:**
  - [ ] Criar projeto React com **Vite**.
  - [ ] Configurar rotas e bibliotecas (Axios, Chart.js, etc).

- [ ] **Interfaces de Usuário:**
  - [ ] **Login:** Tela de acesso para clientes e funcionários.
  - [ ] **Portal do Cliente:**
    - [ ] Exibir consumo atual e histórico.
    - [ ] Exibir status do abastecimento e alertas.
  - [ ] **Portal do Funcionário:**
    - [ ] **Monitoramento:** Gráfico em tempo real do nível do reservatório.
    - [ ] **Operacional:** Botões para abrir/fechar comportas (válvulas).
    - [ ] **Administrativo:** Lista de clientes e alteração de status.

## Fase 5: Integração e Finalização

- [ ] **Teste End-to-End:**
  - [ ] Validar fluxo completo: Sensor -> MQTT -> Backend -> DB -> Frontend.
  - [ ] Validar comando remoto: Frontend -> Backend -> MQTT -> ESP32 -> Válvula.

- [ ] **Documentação:**
  - [ ] Atualizar instruções de instalação e execução.
  - [ ] Documentar API e tópicos MQTT.
