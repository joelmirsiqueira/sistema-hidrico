export async function acionarComporta(req, res) {
    const { mqttClient } = req;
    const { comporta } = req.params;
    const { comando } = req.body;

    if (!mqttClient) {
        return res.status(500).json({ error: 'Serviço MQTT indisponível' });
    }

    if (!comando) {
        return res.status(400).json({ error: 'Comando não informado' });
    }

    try {
        await mqttClient.publishAsync('sistema_hidrico/comporta/acionar/' + comporta, comando);
        res.json({ ok: true });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
