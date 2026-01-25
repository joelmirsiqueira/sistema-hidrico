const validador = (schema) => async (req, res, next) => {
    try {
        req.body = await schema.parseAsync(req.body);
        next();
    } catch (error) {
        if (error.issues) {
            return res.status(400).json({ error: error.issues.map(e => e.message) });
        }
        console.error("Erro interno no validador:", error);
        return res.status(500).json({ error: "Erro interno na validação dos dados." });
    }
};

export default validador;