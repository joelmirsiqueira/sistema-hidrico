import Comporta from "../models/comporta.model.js";

export async function getComportaStatus(req, res) {
    const { comporta } = req.params;
    if (!comporta) {
        return res.status(400).json({ error: 'O identificador da comporta é obrigatório' });
    }
    const status = await Comporta.findOne({ numero: comporta }, { status: 1 });
    if (!status) {
        return res.status(404).json({ error: 'Comporta não encontrada' });
    }
    res.json(status);
    
}

export async function setComporta(req, res) {
    const { mqttClient } = req;
    const { comporta } = req.params;
    const { comando } = req.body;

    try {
        await mqttClient.publishAsync('sistema_hidrico/comporta/acionar/' + comporta, comando);
        res.json({ ok: true });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
