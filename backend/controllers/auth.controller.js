// backend/controllers/auth.controller.js
import Usuario from "../models/usuario.model.js";
import jwt from "jsonwebtoken";

const login = async function(req, res) {
    try {
        const { email, senha } = req.body;

        // 1. Verificar se o usuário existe
        // Precisamos usar .select('+senha') porque definimos select: false no model
        const usuario = await Usuario.findOne({ email }).select('+senha');

        if (!usuario) {
            return res.status(401).json({ message: "Usuário ou senha inválidos." });
        }

        // 2. Verificar se a senha está correta
        const senhaValida = await usuario.compararSenha(senha);

        if (!senhaValida) {
            return res.status(401).json({ message: "Usuário ou senha inválidos." });
        }

        // 3. Gerar o Token JWT
        // O payload deve conter informações úteis, mas não sensíveis
        const payload = {
            id: usuario._id,
            nome: usuario.nome,
            tipo: usuario.tipo,
        };
        if (usuario.tipo === 'cliente') {
            payload.codigo = usuario.codigo;
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: parseInt(process.env.JWT_EXPIRES_IN)
        });

        // 4. Retornar dados (sem a senha)
        usuario.senha = undefined;

        res.status(200).json({
            message: "Login realizado com sucesso!",
            token,
            usuario
        });

    } catch (error) {
        console.error("Erro no login:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
};

export default login;