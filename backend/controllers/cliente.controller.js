import Relato from "../models/relato.model.js";
import Consumo from "../models/consumo.model.js";

export async function CriarRelato(req, res) {
    const { usuario, mensagem } = req.body;

    if (!usuario || !mensagem) {
        return res.status(400).json({ error: 'Cliente e mensagem são campos obrigatórios' });
    }

    try {
        const relato = await Relato.create({ usuario, mensagem });
        res.status(201).json(relato);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function obterConsumo(req, res) {
    const clienteId = req.user.id;

    try {
        const umMinutoAtras = new Date();
        umMinutoAtras.setMinutes(umMinutoAtras.getMinutes() - 1)

        const consumoLista = await Consumo.find({cliente_id: clienteId, data_hora: {$gte: umMinutoAtras}}).sort({ data_hora: -1 });

        if (!consumoLista || consumoLista.length === 0) {
            return res.status(404).json({ message: "Nenhum registro de consumo encontrado para este usuário." });
        }

        const consumoAtual = consumoLista.reduce((acc, curr) => acc + curr.consumo, 0)

        res.status(200).json({
            consumoAtual: consumoAtual,
            registro: consumoLista
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