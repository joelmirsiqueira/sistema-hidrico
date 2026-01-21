import Usuario from '../models/usuario.model.js';
import Relato from '../models/relato.model.js';
import Nivel from '../models/nivel.model.js';

export async function adicionarUsuario(req, res) {
    const { nome, email, senha, tipo } = req.body;

    try {
        let usuario;

        if (tipo === 'cliente') {
            const {codigo, endereco, statusAbastecimento } = req.body;
            usuario = await Usuario.create({codigo,nome, email, senha, tipo, endereco, statusAbastecimento });
        } else {
            usuario = await Usuario.create({nome, email, senha, tipo });
        }
        res.status(201).json(usuario);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ error: 'Email já cadastrado' });
        }
        res.status(500).json({ error: error.message });
    }
}

export async function atualizarCliente(req, res) {
    const { id } = req.params;
    const { nome, email, endereco, statusCliente } = req.body;

    try {
        const cliente = await Usuario.findByIdAndUpdate(id, { nome, email, endereco, statusCliente }, { new: true });

        if (!cliente) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function atualizarFuncionario(req, res) {
    const { id } = req.params;
    const { nome, email } = req.body;

    try {
        const funcionario = await Usuario.findByIdAndUpdate(id, { nome, email }, { new: true });

        if (!funcionario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.status(200).json(funcionario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function resetarSenha(req, res) {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        usuario.senha = usuario.email;
        await usuario.save();

        res.status(200).json({ message: 'Senha resetada com sucesso' });
    } catch {
        res.status(500).json({ error: error.message });
    }
}

export async function listarFuncionarios(req, res) {
    try {
        const funcionarios = await Usuario.find({ tipo: 'funcionario' })

        if (!funcionarios) {
            return res.status(404).json({ error: 'Nenhum funcionário encontrado' });
        }

        res.status(200).json(funcionarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function listarClientes(req, res) {
    try {
        const clientes = await Usuario.find({ tipo: 'cliente' })

        if (!clientes) {
            return res.status(404).json({ error: 'Nenhum cliente encontrado' });
        }

        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function listarRelatos(req, res) {
    try {
        const relatos = await Relato.find()

        if (!relatos) {
            return res.status(404).json({ error: 'Nenhum relato encontrado' });
        }

        res.status(200).json(relatos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function obterNivelReservatorio(req, res) {
    try {
        const nivelReservatorio = await Nivel.findOne().sort({ createdAt: -1 });

        if (!nivelReservatorio) {
            return res.status(404).json({ error: 'Nenhum nível de reservatório encontrado' });
        }

        res.status(200).json(nivelReservatorio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}