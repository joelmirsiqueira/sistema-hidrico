import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token inválido ou expirado." });
    }
};

export const verificarPermissao = (papeisPermitidos) => {
    return (req, res, next) => {
        if (!req.user || !papeisPermitidos.includes(req.user.tipo)) {
            return res.status(403).json({ 
                message: "Acesso proibido. Você não tem permissão para realizar esta ação." 
            });
        }
        next();
    };
};
