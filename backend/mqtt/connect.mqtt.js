import { connectAsync } from "mqtt";
import Nivel from "../models/nivel.model.js";
import Consumo from "../models/consumo.model.js";
import { Cliente } from "../models/usuario.model.js";
import Comporta from "../models/comporta.model.js";
import { LogComporta, LogESP32 } from "../models/log.model.js";

function gerarTopicoRegex(topico) {
    return new RegExp(`^${topico}/\\d+$`);
}

let topicos = {};

async function mqttConnectAsync() {
    const brokerUrl = process.env.MQTT_URL;
    const topicNivel = process.env.MQTT_TOPIC_NIVEL;
    const topicConsumo = process.env.MQTT_TOPIC_CLIENTE_CONSUMO;
    const topicComporta = process.env.MQTT_TOPIC_COMPORTA_STATUS;
    const topicLog = process.env.MQTT_TOPIC_ERROR_LOG;
    topicos = {
        nivel: topicNivel,
        consumo: topicConsumo,
        consumoRegex: gerarTopicoRegex(topicConsumo),
        consumoSubTopicos: topicConsumo + '/#',
        comporta: topicComporta,
        comportaRegex: gerarTopicoRegex(topicComporta),
        comportaSubTopicos: topicComporta + '/#',
        log: topicLog,
    }
    
    if (!brokerUrl) {
        throw new Error('URL do broker MQTT não especificada');
    }
    try {
        const client = await connectAsync(brokerUrl);
        console.log('Conectado ao broker MQTT'); // log
        await mqttSubscribe(client);

        client.on('message', (topic, message) => {
            if (topicos.nivel === topic) {
                registrarNivel(message);
            } else if (topicos.consumoRegex.test(topic)) {
                registrarConsumo(topic, message);
            } else if (topicos.comportaRegex.test(topic)) {
                registrarComportaStatus(topic, message);
            } else if (topicos.log === topic) {
                registrarLog(message);
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
    const listaTopicos = [topicos.nivel, topicos.consumoSubTopicos, topicos.comportaSubTopicos, topicos.log]
    listaTopicos.map(topico => {
        if (!topico) {
            throw new Error(`Há tópicos indefinidos: ${listaTopicos}`);
        }
    })
    try {
        await Promise.all(listaTopicos.map(topico => client.subscribe(topico)));
        console.log('Inscrito nos tópicos MQTT'); // log
    } catch (error) {
        console.error('Erro ao se inscrever no tópico MQTT:', error);
        throw error;
    }
}

async function registrarNivel(message) {
    const nivel = parseInt(message.toString());
    if (nivel < 0 || nivel > 10) {
        return;
    }
    const capacidade = nivel * 10;
    const reservatorioAnterior = await Nivel.findOne().sort({ createdAt: -1 });
    if (reservatorioAnterior && reservatorioAnterior.capacidade === capacidade) {
        return;
    }
    const racionamento = capacidade < 30 ? true : false;
    try {
        await Nivel.create({
            capacidade,
            racionamento,
        });
    } catch (error) {
        console.error('Erro ao criar leitura de nível:', error);
    }
}

async function registrarConsumo(topic, message) {
    const parts = topic.split('/');
    const codigoCliente = parseInt(parts[parts.length - 1]);
    const cliente = await Cliente.findOne({ codigoCliente });
    if (!cliente) {
        // disparar alerta
        console.error(`Cliente não encontrado com código ${codigoCliente}`); // log
        return;
    }
    if (cliente.status === 'inativo') {
        // disparar alerta
        console.error(`Cliente com código ${codigoCliente} está inativo e consumindo água`); // log
        return;
    }
    const quantidade = parseFloat(message.toString());
    try {
        await Consumo.create({
            cliente: cliente._id,
            quantidade
        });
    } catch (error) {
        console.error('Erro ao criar consumo:', error);
    }
}

async function registrarComportaStatus(topic, message) {
    const parts = topic.split('/');
    const numero = parseInt(parts[parts.length - 1]);
    const comporta = await Comporta.findOne({ numero });
    if (!comporta) {
        // disparar alerta
        console.error(`Comporta não encontrada com número ${numero}`); // log
        return;
    }
    const status = message.toString();
    try {
        await LogComporta.create({
            comporta: comporta._id,
            status: status
        });
        await Comporta.updateOne({ numero }, { status });
    } catch (error) {
        console.error('Erro ao criar log de comporta:', error);
    }
}

async function registrarLog(message) {
    const mensagem = message.toString();
    try {
        await LogESP32.create({
            mensagem
        });
    } catch (error) {
        console.error('Erro ao criar log:', error);
    }
}

export default mqttConnectAsync;