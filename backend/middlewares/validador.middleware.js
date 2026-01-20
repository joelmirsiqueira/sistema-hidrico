const validador = (schema) => (req, res, next) => {
    try {
        // Valida o corpo da requisição e atualiza req.body com os dados tipados/limpos
        req.body = schema.parse(req.body);
        next();
    } catch (error) {
        // Se for erro do Zod, formata e retorna
        if (error.issues) {
            console.log("Erro de validação:", JSON.stringify(error.issues, null, 2)); // Log para debug
            return res.status(400).json({ error: error.issues.map(e => e.message) });
        }
        // Erro inesperado
        console.error("Erro interno no validador:", error);
        return res.status(500).json({ error: "Erro interno na validação dos dados." });
    }
};

export default validador;