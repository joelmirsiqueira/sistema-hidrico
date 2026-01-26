import jwt from "jsonwebtoken";

export function verificarToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Acesso negado. Nenhum token fornecido." });
    }

    if (req.blackList.includes(token)) {
        return res.status(401).json({ message: "Token inválido ou expirado (logout)." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expirado." });
        }
        return res.status(401).json({ message: "Token inválido." });
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
