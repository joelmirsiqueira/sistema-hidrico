import jwt from "jsonwebtoken";

export function verificarToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Acesso negado. Nenhum token fornecido." });
    }

    if (req.blackList[token]) {
        return res.status(401).json({ message: "Acesso negado. Token inválido ou expirado." });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Acesso negado. Token inválido ou expirado." });
    }
}

export function verificarPermissao(tiposPermitidos) {
    return (req, res, next) => {
        const { user } = req;

        if (!user || !user.tipo) {
            return res.status(403).json({ message: "Permissão negada. Tipo de usuário não identificado." });
        }

        if (!tiposPermitidos.includes(user.tipo)) {
            return res.status(403).json({ message: "Permissão negada. Você não tem acesso a este recurso." });
        }

        next();
    };
}
