import mongoose from "mongoose";

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
        required: true,
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
    },
    tipo: {
        type: String,
        enum: ['cliente', 'funcionario'],
        required: true,
        lowercase: true,
        trim: true,
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
        default: 'inativo',
        required: function() {
            return this.tipo === 'cliente';
        },
        lowercase: true,
        trim: true,
    },
},
{timestamps: true}
);

const Usuario = mongoose.model('Usuario', UsuarioSchema);

export default Usuario;