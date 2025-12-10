# Protótipo
Para construir um protótipo funcional e econômico, focando em materiais de fácil acesso e baixo custo, você precisará dos seguintes itens:

## 💧 Componentes de Hardware e Hidráulica

| Categoria | Item Necessário | Especificações / Opções Econômicas | Função no Sistema |
|---|---|---|---|
| Microcontrolador | Placa ESP32 | Placa de desenvolvimento ESP32 DevKit (ou similar, como ESP32-WROOM-32) - São acessíveis e já possuem Wi-Fi e Bluetooth. | O "cérebro" do sistema, processa dados dos sensores e controla as válvulas. |
| Reservatório | Reservatório Principal | Garrafa PET de 2 litros, Balde pequeno, ou um recipiente plástico (Tupperware) de formato adequado. Utilize materiais que você já tem ou são muito baratos. | Armazenar a água para o protótipo. |
| Tubulação e Conexões | Mangueiras e Conexões | Mangueiras de silicone (aquelas transparentes para aquário), tubos de PVC de diâmetro pequeno (ex: 1/2 polegada, 20mm), ou mangueiras de irrigação simples. Use abraçadeiras e cola/adesivo para vedação. | Criar o caminho para a água sair do reservatório para as saídas, conectando os sensores e válvulas. |
| Saídas de Água | Válvulas Solenoide (2x) | Mini Válvulas Solenoide 12V DC para Água (Normalmente Fechada). São compactas e baratas. | Atuar como torneiras controladas eletronicamente pela ESP32, liberando ou bloqueando o fluxo de água. |
| Medição de Fluxo | Medidores de Fluxo (2x) | Sensor de Fluxo de Água YF-S201 (modelo comum, 1/2 polegada) ou modelos mini como o SEN-HZ06D (se a vazão for muito baixa). | Medir a quantidade de água que passa por cada saída. |
| Medição de Nível | Sensor Ultrassônico (1x) | Sensor Ultrassônico HC-SR04 (muito comum e barato, mas deve ser instalado acima do reservatório, evitando contato com a água) ou o JSN-SR04T/M (versão à prova d'água, um pouco mais cara, mas mais adequada para medir nível de líquido). | Medir a distância até a superfície da água para determinar o nível no reservatório. |
| Fonte de Energia | Fonte de Alimentação | Fonte 5V DC 2A (para alimentar a ESP32 e lógica) e uma Fonte 12V DC (para as válvulas solenoide, que geralmente precisam de mais potência) ou uma única fonte 12V com um regulador de tensão (LM7805) para a placa e sensores. | Fornecer energia para todo o sistema. |

## 🛠️ Componentes Eletrônicos Auxiliares

| Item Necessário | Especificações / Opções Econômicas | Observação |
|---|---|---|
| Módulo Relé (2 canais) | Módulo Relé 5V de 2 canais (compatível com a saída da ESP32). | Essencial para acionar as válvulas solenoide de 12V, pois a ESP32 não consegue fornecer energia e corrente suficientes. O relé isola o circuito de controle de 3.3V/5V do circuito de potência de 12V. |
| Protoboard | Protoboard de 400 ou 830 pontos. | Para montar o circuito de forma temporária e fazer as conexões dos sensores. |
| Cabos Jumper | Cabos Jumper (Macho-Fêmea e Macho-Macho). | Para fazer as conexões entre a ESP32, a protoboard e os módulos. |
| Fios Elétricos | Fios finos de cobre ou cabos de prototipagem para as conexões de 12V. | Usar para ligar as válvulas solenoide à fonte de 12V, através do Módulo Relé. |
## 🔧 Ferramentas e Consumíveis
 * Ferro de Solda e Estanho (para conexões mais permanentes e seguras).
 * Chave de Fenda/Phillips.
 * Alicate de corte/descascador de fios.
 * Cola quente ou Cola de PVC (para vedar e fixar o reservatório e as tubulações).
 * Abraçadeiras de nylon (para fixar tubos e mangueiras).
Dicas para Economizar e Simplificar
 * Reservatório: Use uma garrafa PET grande (2 ou 3 litros) ou uma caixa de sorvete de plástico. Custo zero.
 * Tubulação: Use mangueiras de aquário de silicone finas (são baratas) e conecte-as às válvulas e sensores usando adaptadores de plástico ou até mesmo improvisando com conexões de mangueira de jardim pequenas, selando com cola quente ou fita veda-rosca para protótipos de baixa pressão.
 * Sensores de Fluxo: Se a prioridade for apenas a demonstração, você pode comprar um modelo mais barato, mesmo que a precisão não seja de nível industrial. O YF-S201 ou o mini HZ06D são boas opções de baixo custo.

Com essa lista, você deve conseguir montar um protótipo funcional para testes e demonstração.