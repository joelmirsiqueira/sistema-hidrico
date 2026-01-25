import { respostaUsuarioDto } from "../dtos/usuario.dto.js";
import { Usuario } from "../models/usuario.model.js";
import jwt from "jsonwebtoken";

const login = async function(req, res) {
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

        const usuario = respostaUsuarioDto.parse(consulta);

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