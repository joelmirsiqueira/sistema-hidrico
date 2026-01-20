import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';

const enderecoSchema = new mongoose.Schema({
    rua: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    numero: {
        type: Number,
        required: true,
    },
    bairro: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    }
}, { _id: false });

const UsuarioSchema = new mongoose.Schema({
    codigo: {
        type: Number,
        unique: true,
        sparse: true,
        required: function() {
            return this.tipo === 'cliente';
        },
    },
    nome: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    senha: {
        type: String,
        required: true,
        select: false,
    },
    tipo: {
        type: String,
        enum: ['cliente', 'funcionario'],
        required: true,
    },
    endereco: {
        type: enderecoSchema,
        required: function() {
            return this.tipo === 'cliente';
        }
    },
    statusAbastecimento: {
        type: String,
        enum: ['ativo', 'inativo'],
        required: function() {
            return this.tipo === 'cliente';
        },
        lowercase: true,
        trim: true,
    },
},
{timestamps: true}
);

UsuarioSchema.pre('save', async function() {
    if (!this.isModified('senha')) {
        return;
    }
    const salt = await bcryptjs.genSalt(10);
    this.senha = await bcryptjs.hash(this.senha, salt);
});

UsuarioSchema.methods.compararSenha = async function(senha) {
    return await bcryptjs.compare(senha, this.senha);
}

const Usuario = mongoose.model('Usuario', UsuarioSchema);

export default Usuario;