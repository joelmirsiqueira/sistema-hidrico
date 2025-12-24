import { connectAsync } from "mqtt";

export default async function mqttConnectAsync() {
    const brokerUrl = process.env.MQTT_URL;
    try {
        const client = await connectAsync(brokerUrl);
        console.log('Conectado ao broker MQTT');
        return client;
    } catch (error) {
        console.error('Erro ao conectar ao broker MQTT:', error);
    }
}

async function mqttSubscribeAsync(client) {
    const topicosLista = [
        process.env.MQTT_TOPIC_STATUS_NIVEL,
        process.env.MQTT_TOPIC_STATUS_COMPORTA_1,
        process.env.MQTT_TOPIC_STATUS_COMPORTA_2,
    ];
    try {
        await Promise.all(
            topicosLista.map(async (topico) => {
                await client.subscribe(topico);
            })
        );
        console.log('Assinatura realizada com sucesso');
    } catch (error) {
        console.error('Erro ao assinar tópicos:', error);
    }
}

async function mqttMessageAsync(client) {
    client.on('message', async (topic, message) => {
        const messageString = message.toString();
        console.log(`Mensagem recebida no tópico ${topic}: ${messageString}`);

    });
}


