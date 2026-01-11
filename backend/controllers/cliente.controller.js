import Relato from "../models/relato.model.js";

export async function CriarRelato(req, res) {
    const { cliente, mensagem } = req.body;

    if (!cliente || !mensagem) {
        return res.status(400).json({ error: 'Cliente e mensagem são campos obrigatórios' });
    }

    try {
        const relato = await Relato.create({ cliente, mensagem });
        res.status(201).json(relato);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}