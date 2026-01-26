import Relato from "../models/relato.model.js";
import Consumo from "../models/consumo.model.js";
import { Usuario } from "../models/usuario.model.js";
import Comporta from "../models/comporta.model.js";
import Nivel from "../models/nivel.model.js";

export async function CriarRelato(req, res) {
    const { user, mensagem } = req.body;

    try {
        const relato = await Relato.create({ cliente: user.id, mensagem });
        res.status(201).json(relato);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function obterConsumo(req, res) {
    const cliente = req.user.id;

    try {
        const umMinutoAtras = new Date();
        umMinutoAtras.setMinutes(umMinutoAtras.getMinutes() - 1)

        const registros = await Consumo.find({cliente, dataHora: {$gte: umMinutoAtras}}).sort({ dataHora: -1 });

        if (!registros || registros.length === 0) {
            return res.status(404).json({ message: "Nenhum registro de consumo encontrado para este cliente." });
        }

        const consumoAtual = registros.reduce((acc, curr) => acc + curr.quantidade, 0)

        res.status(200).json({
            consumoAtual: consumoAtual,
            registro: registros
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar dados de consumo.", error: error.message });
    }
}

export async function atualizarSenha(req, res) {
    const clienteId = req.user.id;
    const { senhaAtual, novaSenha } = req.body;

    try {
        const cliente = await Usuario.findById(clienteId);

        if (!cliente) {
            return res.status(404).json({ message: "Cliente não encontrado." });
        }

        const senhaCorreta = await cliente.compararSenha(senhaAtual);

        if (!senhaCorreta) {
            return res.status(401).json({ message: "Senha atual incorreta." });
        }

        cliente.senha = novaSenha;
        await cliente.save();
        
        res.status(200).json({ message: "Senha atualizada com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar senha.", error: error.message });
    }
}

export async function listarConsumos(req, res) {
    const clienteId = req.user.id;

    try {
        const tempoLimite = new Date();
        tempoLimite.setMinutes(tempoLimite.getMinutes() - 12);

        const registros = await Consumo.find({
            cliente: clienteId,
            dataHora: { $gte: tempoLimite }
        }).sort({ dataHora: 1 });

        if(!registros || registros.length === 0) {
            return res.status(404).json({ message: "Nenhum registro de consumo encontrado para este cliente." });
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

        const resultadoFinal = Object.keys(listagemPorMinuto).map(minuto => ({
            minuto: minuto,
            totalConsumido: listagemPorMinuto[minuto]
        }));

        res.status(200).json(resultadoFinal);
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar listagem.", error: error.message });
    }
}

export async function obterComportaStatus(req, res) {
    const id = req.params.id;
    
    try {
        const consulta = await Comporta.findById(id);

        if (!consulta) {
            return res.status(404).json({ error: 'Comporta não encontrada' });
        }

        res.status(200).json({ status: consulta.status });
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar status da comporta.", error: error.message });
    }
}

export async function obterStatusRacionamento(req, res) {
    try {
        const consulta = await Nivel.findOne({}, {racionamento: 1, _id: 0}).sort({ dataHora: -1 });

        if (!consulta) {
            return res.status(404).json({ error: 'Nenhum dado de racionamento encontrado' });
        }

        res.status(200).json({ racionamento: consulta.racionamento });
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar status de racionamento.", error: error.message });
    }
}