import { Cliente, Funcionario, Usuario } from '../models/usuario.model.js';
import Comporta from '../models/comporta.model.js';
import Relato from '../models/relato.model.js';
import Nivel from '../models/nivel.model.js';
import { respostaUsuarioDto } from '../dtos/usuario.dto.js';
import { respostaRelatoDto } from '../dtos/relato.dto.js';
import { respostaComportaDto, respostaNivelDto } from '../dtos/mqtt.dto.js';
import Consumo from '../models/consumo.model.js';
import { listarConsumos } from './cliente.controller.js';

export async function criarFuncionario(req, res) {
    const { nome, email, senha } = req.body;

    try {
        const consulta = await Funcionario.create({ nome, email, senha });
        const funcionario = respostaUsuarioDto.parse(consulta);
        res.status(201).json({ message: 'Funcionário criado com sucesso', funcionario });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ error: 'Email já cadastrado' });
        }
        res.status(500).json({ error: error.message });
    }
}

export async function criarCliente(req, res) {
    const { nome, email, senha, codigoCliente, comporta, endereco } = req.body;

    try {
        const consulta = await Cliente.create({ nome, email, senha, codigoCliente, comporta, endereco });
        const cliente = respostaUsuarioDto.parse(consulta);
        res.status(201).json({ message: 'Cliente criado com sucesso', cliente });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ error: 'Email já cadastrado' });
        }
        res.status(500).json({ error: error.message });
    }
}

export async function atualizarCliente(req, res) {
    const { id } = req.params;
    const { nome, email, endereco, status } = req.body;

    try {
        const consulta = await Cliente.findByIdAndUpdate(id, { nome, email, endereco, status }, { new: true });

        if (!consulta) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        const cliente = respostaUsuarioDto.parse({
            ...consulta.toObject(),
            _id: consulta._id.toString(),
        });

        res.status(200).json({ message: 'Cliente atualizado com sucesso', cliente });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function atualizarFuncionario(req, res) {
    const { id } = req.params;
    const { nome, email } = req.body;

    try {
        const consulta = await Usuario.findByIdAndUpdate(id, { nome, email }, { new: true });

        if (!consulta) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const funcionario = respostaUsuarioDto.parse(consulta);

        res.status(200).json({ message: 'Usuário atualizado com sucesso', funcionario });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function resetarSenha(req, res) {
    const { id } = req.params;

    try {
        const consulta = await Usuario.findById(id).select('+senha');

        if (!consulta) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        consulta.senha = consulta.email;
        await consulta.save();

        res.status(200).json({ message: 'Senha resetada com sucesso' });
    } catch {
        res.status(500).json({ error: error.message });
    }
}

export async function listarFuncionarios(req, res) {
    try {
        const consulta = await Funcionario.find().sort({ nome: 1 })

        if (!consulta) {
            return res.status(404).json({ error: 'Nenhum funcionário encontrado' });
        }

        const funcionarios = consulta.map(funcionario => respostaUsuarioDto.parse(funcionario));

        res.status(200).json(funcionarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function listarClientes(req, res) {
    try {
        const consulta = await Cliente.find().sort({ nome: 1 });

        if (!consulta) {
            return res.status(404).json({ error: 'Nenhum cliente encontrado' });
        }

        const clientes = consulta.map(cliente =>
            respostaUsuarioDto.parse({
                ...cliente.toObject(),
                _id: cliente._id.toString(),
            })
        );

        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function listarRelatos(req, res) {
    try {
        const consulta = await Relato.find().sort({ dataHora: -1 });

        if (!consulta) {
            return res.status(404).json({ error: 'Nenhum relato encontrado' });
        }

        const relatos = consulta.map(relato => respostaRelatoDto.parse(relato));

        res.status(200).json(relatos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function obterNivelReservatorio(req, res) {
    try {
        const consulta = await Nivel.findOne().sort({ dataHora: -1 });

        if (!consulta) {
            return res.status(404).json({ error: 'Nenhum nível de reservatório encontrado' });
        }

        const nivel = respostaNivelDto.parse(consulta);

        res.status(200).json(nivel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function listarComportas(req, res) {
    try {
        const consulta = await Comporta.find();

        if (!consulta || consulta.length === 0) {
            return res.status(404).json({ error: 'Nenhuma comporta encontrada' });
        }

        const comportas = consulta.map(comporta => respostaComportaDto.parse(comporta.toObject()));

        res.status(200).json(comportas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function acionarComporta(req, res) {
    const { mqttClient } = req;
    const { numero, comando } = req.body;
    const topicoComportaAcionar = `${process.env.MQTT_TOPIC_COMPORTA_ACIONAR}/${numero}`;
    const topicoRespostaStatus = `${process.env.MQTT_TOPIC_COMPORTA_STATUS}/${numero}`;

    try {
        const responsePromise = new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                mqttClient.removeListener('message', messageHandler);
                reject(new Error('Tempo de resposta esgotado do dispositivo.'));
            }, 10000);

            const messageHandler = (topic, message) => {
                if (topic === topicoRespostaStatus) {
                    clearTimeout(timeout);
                    mqttClient.removeListener('message', messageHandler);
                    resolve(message.toString());
                }
            };

            mqttClient.on('message', messageHandler);
        });

        await mqttClient.publishAsync(topicoComportaAcionar, comando);
        const comportaStatus = await responsePromise;
        return res.status(200).json({ message: "Comando executado.", status: comportaStatus });
    } catch (error) {
        if (error.message.includes('Tempo de resposta esgotado')) {
            return res.status(408).json({ error: error.message }); // Request Timeout
        }
        return res.status(500).json({ error: "Erro interno ao acionar a comporta.", details: error.message });
    }
}

export async function consultarCliente(req, res) {
    const { id } = req.params;

    try {
        const consulta = await Cliente.findById(id);

        if (!consulta) {
            res.status(404).json({ error: 'Cliente não encontrado' });
            return;
        }

        const comportaStatus = await Comporta.findById(consulta.comporta).select('status');
        consulta.comportaStatus = comportaStatus.status || "Comporta não encontrada"

        const tempoLimite = new Date();
        tempoLimite.setMinutes(tempoLimite.getMinutes() - 12);

        const registros = await Consumo.find({
            cliente: consulta._id,
            dataHora: { $gte: tempoLimite }
        }).sort({ dataHora: 1 });

        if (!registros || registros.length === 0) {
            consulta.historicoConsumo = "Nenhum registro de consumo encontrado para este cliente.";
        }

        const listagemPorMinuto = registros.reduce((acc, curr) => {
            const data = new Date(curr.dataHora);
            const chaveMinuto = data.toLocaleDateString('pt-BR') + ' ' +
                data.getHours().toString().padStart(2, '0') + ':' +
                data.getMinutes().toString().padStart(2, '0');

            if (!acc[chaveMinuto]) {
                acc[chaveMinuto] = 0;
            }

            acc[chaveMinuto] += curr.quantidade;
            return acc;
        }, {});

        consulta.historicoConsumo = Object.keys(listagemPorMinuto).map(minuto => ({
            minuto: minuto,
            totalConsumido: listagemPorMinuto[minuto]
        }));

        const cliente = respostaUsuarioDto.parse(consulta);

        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}