import { connectAsync } from "mqtt";
import LeituraNivel from "../models/leitura_nivel.model.js";
import Consumo from "../models/consumo.model.js";
import Usuario from "../models/usuario.model.js";

async function mqttConnectAsync() {
    const brokerUrl = process.env.MQTT_URL;
    if (!brokerUrl) {
        throw new Error('URL do broker MQTT não especificada');
    }
    try {
        const client = await connectAsync(brokerUrl);
        console.log('Conectado ao broker MQTT'); // log
        await mqttSubscribe(client);

        const consumoRegex = new RegExp(`^${process.env.MQTT_TOPIC_CLIENTE_CONSUMO}/\\d+$`);

        client.on('message', (topic, message) => {
            console.log(`Mensagem recebida no tópico ${topic}: ${message.toString()}`); // log
            if (topic === process.env.MQTT_TOPIC_NIVEL) {
                registrarNivel(message);
            } else if (consumoRegex.test(topic)) {
                registrarConsumo(topic, message);
            } else if (topic === process.env.MQTT_TOPIC_COMPORTA_STATUS) {
                registrarComportaStatus(topic, message);
            } else if (topic === process.env.MQTT_TOPIC_ERROR_LOG) {
                registrarLog(topic, message);
            } else {
                console.log(`Tópico desconhecido: ${topic}`); // log
            }
        });
        return client;
    } catch (error) {
        console.error('Erro ao conectar ao broker MQTT:', error);
        throw error;
    }
}

async function mqttSubscribe(client) {
    const nivel = process.env.MQTT_TOPIC_NIVEL;
    const consumo = process.env.MQTT_TOPIC_CLIENTE_CONSUMO + '/#';
    const comporta = process.env.MQTT_TOPIC_COMPORTA_STATUS + '/#';
    const log = process.env.MQTT_TOPIC_ERROR_LOG;
    if (!nivel || !consumo || !comporta || !log) {
        throw new Error('Tópico de subscrição não especificado');
    }
    try {
        for (const topic of [nivel, consumo, comporta, log]) {
            await client.subscribeAsync(topic);
        }
        console.log('Inscrito nos tópicos MQTT');
    } catch (error) {
        console.error('Erro ao se inscrever no tópico MQTT:', error);
        throw error;
    }
}

async function registrarNivel(message) {
    const nivel = parseInt(message.toString());
    if (nivel < 0 || nivel > 100) {
        console.error(`Nível inválido: ${nivel}`); // log
        return;
    }
    const capacidade = nivel * 10;
    console.log(`capacidade do reservatório: ${capacidade}%`); // log
    const reservatorioAnterior = await LeituraNivel.findOne().sort({ createdAt: -1 });
    if (reservatorioAnterior && reservatorioAnterior.capacidade === capacidade) {
        return;
    }
    try {
        await LeituraNivel.create({
        capacidade: capacidade
    });
    } catch (error) {
        console.error('Erro ao criar leitura de nível:', error);
    }
}

async function registrarConsumo(topic, message) {
    const parts = topic.split('/');
    const codigo = parseInt(parts[parts.length - 1]);
    const cliente = await Usuario.findOne({ codigo: codigo });
    if (!cliente) {
        console.error(`Cliente não encontrado com código ${codigo}`); // log
        return;
    }
    const consumo = parseFloat(message.toString());
    console.log(`consumo do cliente ${cliente.nome}: ${consumo}`); // log
    try {
        await Consumo.create({
            cliente: cliente._id,
            codigo: codigo,
            data: new Date(),
            consumo: consumo.toFixed(2)
        });
    } catch (error) {
        console.error('Erro ao criar consumo:', error);
    }
}

async function registrarComportaStatus(topic, message) {
    
}

async function registrarLog(topic, message) {
    
}

 export default mqttConnectAsync;