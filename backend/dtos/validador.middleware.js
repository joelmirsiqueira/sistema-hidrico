const validador = (schema) => (req, res, next) => {
    try {
        // Valida o corpo da requisição e atualiza req.body com os dados tipados/limpos
        req.body = schema.parse(req.body);
        next();
    } catch (error) {
        // Retorna os erros de validação formatados
        return res.status(400).json({
            error: "Erro de validação",
            detalhes: error.errors.map(e => ({ campo: e.path[0], mensagem: e.message }))
        });
    }
};

export default validador;