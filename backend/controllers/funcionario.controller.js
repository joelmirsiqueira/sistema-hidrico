
import Usuario from '../models/usuario.model.js';


export async function adicionarUsuario(req, res) {
    const { nome, email, senha, tipo } = req.body;
    try {
        const usuario = await Usuario.create({ nome, email, senha, tipo });
        console.log(tipo);
        
        res.status(201).json(usuario);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }
        res.status(500).json({ error: error.message });
    }
}