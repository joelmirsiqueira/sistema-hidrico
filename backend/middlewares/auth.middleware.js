// backend/middlewares/auth.middleware.js
import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Verifica se o cabeçalho existe e segue o padrão "Bearer <token>"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verifica a validade do token usando a chave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Anexa os dados do usuário decodificados à requisição
        // Isso permite saber quem é o usuário nas próximas etapas (controllers)
        req.user = decoded;
        
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token inválido ou expirado." });
    }
};

// Middleware opcional para verificar permissões (Role Based Access Control)
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
