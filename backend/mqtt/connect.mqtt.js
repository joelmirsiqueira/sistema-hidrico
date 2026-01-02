import { connectAsync } from "mqtt";

async function mqttConnectAsync() {
    const brokerUrl = process.env.MQTT_URL;
    if (!brokerUrl) {
        throw new Error('URL do broker MQTT não especificada');
    }
    try {
        const client = await connectAsync(brokerUrl);
        console.log('Conectado ao broker MQTT');
        await mqttSubscribeAsync(client);
        client.on('message', (topic, message) => {
            console.log(`Mensagem recebida no tópico ${topic}: ${message.toString()}`);
        });
        return client;
    } catch (error) {
        console.error('Erro ao conectar ao broker MQTT:', error);
        throw error;
    }
}

async function mqttSubscribeAsync(client) {
    const topicSubscribe = process.env.MQTT_TOPIC_SUBSCRIBE;
    if (!topicSubscribe) {
        throw new Error('Tópico de subscrição não especificado');
    }
    try {
        await client.subscribeAsync(topicSubscribe + '/#');
        console.log('Inscrito nos tópicos MQTT');
    } catch (error) {
        console.error('Erro ao se inscrever no tópico MQTT:', error);
        throw error;
    }
}

export default mqttConnectAsync;
