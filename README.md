# Sistema de Monitoramento e Gestão Hídrica

## 📝 Descrição do projeto

O projeto visa permitir o gerenciamento remoto do abastecimento hídrico, oferecendo funcionalidades tanto para clientes quanto para a equipe de operação. Clientes podem monitorar seu consumo, verificar o status do abastecimento e relatar problemas, enquanto funcionários podem gerenciar clientes, controlar comportas remotamente e monitorar a infraestrutura, como o nível dos reservatórios.

## ✨ Funcionalidades

O sistema oferece um conjunto de funcionalidades para dois tipos de usuários: **Clientes** e **Funcionários**.

### Para Clientes
- **Consultar status da unidade:** Verificar se o fornecimento está ativo, inativo ou suspenso.
- **Consultar consumo:** Acompanhar o consumo de água em tempo real.
- **Visualizar cronograma de abastecimento:** Acessar os dias e a duração programada para o abastecimento.
- **Verificar status de racionamento:** Saber se o racionamento de água está ativo para sua localidade.
- **Relatar problemas:** Enviar relatórios sobre falhas no abastecimento ou suspeitas de vazamento.

### Para Funcionários
- **Monitoramento de infraestrutura:**
  - Consultar o nível de água do reservatório central.
  - Verificar o estado das comportas de saída (abertas ou fechadas).
- **Gerenciamento de clientes:**
  - Cadastrar novos clientes.
  - Consultar e alterar o status de clientes (ativo, suspenso, etc.).
  - Acessar o histórico de consumo.
- **Controle operacional:**
  - Abrir e fechar comportas remotamente.
  - Agendar operações futuras de controle das comportas.

## 🏗️ Arquitetura e Tecnologias

O projeto segue uma arquitetura de 4 camadas, garantindo modularidade e escalabilidade:

1.  **Sistema Embarcado (Hardware):**
    -   **Hardware:** Placa **ESP32** para controle de sensores e atuadores.
    -   **Comunicação:** Protocolo **MQTT** para comunicação leve e eficiente com o backend.

2.  **Broker MQTT:**
    -   Atua como intermediário de mensagens entre o sistema embarcado e o backend.

3.  **Backend:**
    -   **Tecnologia:** **Node.js**.
    -   **Responsabilidades:** Gerencia a lógica de negócio, a comunicação com o banco de dados e a conexão com o broker MQTT.

4.  **Frontend:**
    -   **Tecnologia:** **React**.
    -   **Responsabilidades:** Interface web para interação dos clientes e funcionários com o sistema.

5.  **Banco de Dados:**
    -   **Tecnologia:** **MongoDB** (MongoDB Atlas) para armazenamento dos dados da aplicação.

```
+-----------------+      +---------------+      +-------------+      +-------------------+
| Sistema Embarcado|----->|  Broker MQTT  |<-----|   Backend   |----->|     MongoDB       |
| (ESP32, Sensores)|      |               |      |  (Node.js)  |      |      Database     |
+-----------------+      +---------------+      +-------------+      +-------------------+
                                                       ^
                                                       |
                                                       v
                                                 +-------------+
                                                 |  Frontend   |
                                                 |   (React)   |
                                                 +-------------+
```

## 🛠️ Protótipo de Hardware

Para a construção de um protótipo funcional, os seguintes componentes são sugeridos:

| Categoria | Item | Especificação | Função |
|---|---|---|---|
| **Microcontrolador** | Placa ESP32 | ESP32 DevKit ou similar | Cérebro do sistema, controla sensores e válvulas. |
| **Reservatório** | Recipiente plástico | Garrafa PET, balde ou similar | Armazenamento de água. |
| **Tubulação** | Mangueiras e conexões | Mangueiras de silicone ou PVC | Caminho da água. |
| **Saídas de Água** | Válvulas Solenoide (2x) | Mini Válvula Solenoide 12V DC | Controle de fluxo de água. |
| **Medição de Fluxo** | Medidores de Fluxo (2x) | Sensor de Fluxo YF-S201 | Medir a quantidade de água. |
| **Medição de Nível** | Sensor Ultrassônico | HC-SR04 ou JSN-SR04T (à prova d'água) | Medir o nível do reservatório. |
| **Alimentação** | Fonte de Alimentação | Fontes 5V e 12V DC | Fornecer energia para os componentes. |
| **Acionamento** | Módulo Relé (2 canais) | Módulo Relé 5V | Isolar e acionar as válvulas de 12V. |

## 🚀 Como Executar o Projeto

*(Esta seção será atualizada com instruções detalhadas de instalação e execução.)*

### Pré-requisitos

- Node.js e npm
- Git
- Docker (opcional, para o broker MQTT e banco de dados)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/sistema-hidrico.git

# Navegue até o diretório do backend e instale as dependências
cd sistema-hidrico/backend
npm install

# Navegue até o diretório do frontend e instale as dependências
cd ../frontend
npm install
```

### Execução

```bash
# Inicie o backend
cd ../backend
npm start

# Em outro terminal, inicie o frontend
cd ../frontend
npm run dev
```

## 👥 Equipe

- Joelmir Siqueira
- Jalmir Siqueira
- Daniel Ferreira
