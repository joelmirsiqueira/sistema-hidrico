import mongoose from "mongoose";


const UsuarioSchema = new mongoose.Schema({
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
        default: 'cliente',
        enum: ['cliente', 'funcionario'],
        required: true,
        lowercase: true,
        trim: true,
    },
},
{timestamps: true}
);

const Usuario = mongoose.model('Usuario', UsuarioSchema);

export default Usuario;