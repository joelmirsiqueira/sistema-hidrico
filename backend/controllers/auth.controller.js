import { respostaUsuarioDto } from "../dtos/usuario.dto.js";
import { Usuario } from "../models/usuario.model.js";
import jwt from "jsonwebtoken";

export const login = async function(req, res) {
    try {
        const { email, senha } = req.body;

        const consulta = await Usuario.findOne({ email }).select('+senha');

        if (!consulta) {
            return res.status(401).json({ message: "Usuário ou senha inválidos." });
        }

        const senhaValida = await consulta.compararSenha(senha);

        if (!senhaValida) {
            return res.status(401).json({ message: "Usuário ou senha inválidos." });
        }

        const payload = {
            id: consulta._id,
            nome: consulta.nome,
            tipo: consulta.tipo,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: parseInt(process.env.JWT_EXPIRES_IN)
        });

        res.status(200).json({
            message: "Login realizado com sucesso!",
            token,
        });

    } catch (error) {
        console.error("Erro no login:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
};

export async function logout(req, res) {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(400).json({ message: "Token não fornecido." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decoded) {
            return res.status(401).json({ message: "Token inválido." });
        }
        
        req.blackList[token] = true;
        setTimeout(() => {
            delete req.blackList[token];
        }, parseInt(decoded.exp * 1000 - Date.now()));

        res.status(200).json({ message: "Logout realizado com sucesso." });
    } catch (error) {
        console.error("Erro no logout");
        console.error("Erro no logout:", error);
        res.status(500).json({ message: "Erro interno do servidor ao fazer logout." });
    }
}