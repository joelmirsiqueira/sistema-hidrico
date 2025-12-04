# Requisitos do Sistema - Gestão Hídrica

Este documento detalha os requisitos funcionais e não funcionais para o projeto de Gestão Hídrica.

## 1. Requisitos Funcionais (RF)

Os requisitos funcionais descrevem o que o sistema deve fazer.

| ID   | Módulo    | Funcionalidade                     | Descrição                                                                                                    | Prioridade |
| :--- | :-------- | :--------------------------------- | :----------------------------------------------------------------------------------------------------------- | :--------- |
| RF01 | Cliente   | Consultar Status da Unidade        | O sistema deve permitir que o cliente consulte o status de sua unidade (ativo, inativo ou suspenso).         | Alta       |
| RF02 | Cliente   | Consultar Consumo                  | O sistema deve permitir que o cliente consulte seu consumo de água atual.                                    | Alta       |
| RF03 | Cliente   | Visualizar Cronograma              | O sistema deve exibir ao cliente os dias programados para o abastecimento.                                   | Média      |
| RF04 | Cliente   | Visualizar Duração do Abastecimento | O sistema deve informar ao cliente a duração do abastecimento.                                               | Média      |
| RF05 | Cliente   | Verificar Status do Racionamento   | O sistema deve permitir que o cliente verifique se o racionamento de água está ativo ou inativo para sua unidade. | Média      |
| RF06 | Cliente   | Relatar Problema                   | O sistema deve fornecer uma interface para o cliente relatar problemas no abastecimento.                     | Baixa      |
| RF07 | Cliente   | Relatar Vazamento                  | O sistema deve fornecer uma interface para o cliente relatar suspeitas de vazamentos.                        | Baixa      |
| RF08 | Funcionário | Monitorar Nível do Reservatório    | O sistema deve permitir que o funcionário consulte o nível atual de água no reservatório central.            | Alta       |
| RF09 | Funcionário | Monitorar Comportas                | O sistema deve permitir que o funcionário consulte o estado atual das comportas de saída de água (abertas ou fechadas). | Alta       |
| RF10 | Funcionário | Consultar Cliente                  | O sistema deve permitir que o funcionário consulte o status de um cliente específico.                        | Alta       |
| RF11 | Funcionário | Cadastrar Cliente                  | O sistema deve permitir que o funcionário realize o cadastro de novos clientes.                              | Alta       |
| RF12 | Funcionário | Alterar Status do Cliente          | O sistema deve permitir que o funcionário altere o status de um cliente (ex: ativar, suspender).             | Alta       |
| RF13 | Funcionário | Controle Remoto de Comportas       | O sistema deve permitir que o funcionário abra e feche as comportas de saída de água remotamente.            | Alta       |
| RF14 | Funcionário | Consultar Histórico de Consumo     | O sistema deve permitir que o funcionário consulte o histórico de consumo dos clientes.                      | Média      |
| RF15 | Funcionário | Agendar Operações                  | O sistema deve permitir que o funcionário agende futuras aberturas ou fechamentos das comportas.             | Baixa      |

## 2. Requisitos Não Funcionais (RNF)

Os requisitos não funcionais descrevem como o sistema deve operar, definindo suas qualidades e restrições.

| ID    | Categoria             | Funcionalidade          | Descrição                                                                                                                    | Prioridade  |
| :---- | :-------------------- | :---------------------- | :--------------------------------------------------------------------------------------------------------------------------- | :---------- |
| RNF01 | Arquitetura           | Arquitetura em Camadas  | O sistema deve ser implementado em uma arquitetura de 4 camadas: Sistema Embarcado, Broker MQTT, Backend e Frontend.           | Alta        |
| RNF02 | Hardware              | Hardware Embarcado      | O controle de sensores e válvulas deve ser feito por um sistema embarcado baseado na placa ESP32.                            | Alta        |
| RNF03 | Tecnologia            | Backend                 | O backend da aplicação deve ser desenvolvido utilizando o Node.js.                                                           | Média       |
| RNF04 | Tecnologia            | Frontend                | A interface do usuário deve ser desenvolvida utilizando React.                                                               | Alta        |
| RNF05 | Persistência de Dados | Banco de Dados          | Os dados da aplicação devem ser armazenados em um banco de dados MongoDB (MongoDB Atlas).                                    | Alta        |
| RNF06 | Comunicação           | Protocolo de Comunicação | A comunicação entre o sistema embarcado e o backend deve ser realizada através do protocolo MQTT para garantir leveza e eficiência. | Alta        |
| RNF07 | Usabilidade           | Interface Web           | O sistema deve possuir uma interface web para que clientes e funcionários possam interagir com suas respectivas funcionalidades. | Alta        |
| RNF08 | Segurança             | Controle de Acesso      | O sistema deve garantir que o acesso às funcionalidades seja restrito por tipo de usuário (cliente ou funcionário).              | Alta        |
| RNF09 | Desempenho            | Baixa Latência          | A comunicação entre o hardware e o servidor deve ter baixa latência para permitir o gerenciamento remoto com delay mínimo.     | Alta        |
| RNF10 | Escalabilidade        | Escalabilidade do Backend | A aplicação de backend deve ser construída de forma a ser eficiente e escalável, conforme as capacidades do Node.js.         | Média       |
| RNF11 | Criptografia          | Segurança de Dados      | O sistema deve garantir segurança dos dados, com criptografia de senhas e conexões seguras.                                | Média/Alta  |

---
