import e from "express";

const validador = (schema) => (req, res, next) => {
    try {
        // Valida o corpo da requisição e atualiza req.body com os dados tipados/limpos
        req.body = schema.parse(req.body);
        next();
    } catch (error) {
        // Retorna os erros de validação formatados
        const message = JSON.parse(error.message);
        return res.status(400).json({ error: message.map(e => e.message) });
    }
};

export default validador;