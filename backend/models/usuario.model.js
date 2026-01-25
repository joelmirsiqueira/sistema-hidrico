import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';

const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        minLength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    senha: {
        type: String,
        required: true,
        select: false,
    },
}, {
    discriminatorKey: 'tipo',
    timestamps: true,
});

usuarioSchema.pre('save', async function() {
    if (!this.isModified('senha')) {
        return;
    }
    const salt = await bcryptjs.genSalt(10);
    this.senha = await bcryptjs.hash(this.senha, salt);
});

usuarioSchema.methods.compararSenha = async function(senha) {
    return await bcryptjs.compare(senha, this.senha);
}

export const Usuario = mongoose.model('Usuario', usuarioSchema);

export const Funcionario = Usuario.discriminator('funcionario', new mongoose.Schema({}));

export const Cliente = Usuario.discriminator('cliente', new mongoose.Schema({
    codigoCliente: {
        type: Number,
        unique: true,
        sparse: true,
    },
    comporta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comporta',
        required: true,
    },
    endereco: {
        rua: {
            type: String,
            required: true,
        },
        numero: {
            type: Number,
            required: true,
        },
        bairro: {
            type: String,
            required: true,
        }
    },
    status: {
        type: String,
        enum: ['ativo', 'inativo'],
        default: 'ativo',
        required: true,
    }
}));