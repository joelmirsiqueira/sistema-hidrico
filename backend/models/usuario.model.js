import mongoose from "mongoose";


const UsuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    senha: {
        type: String,
        required: true,
    },
    tipo: {
        type: String,
        default: 'cliente',
        enum: ['cliente', 'funcionario', 'admin'],
    },
},
{timestamps: true}
);

const Usuario = mongoose.model('Usuario', UsuarioSchema);

export default Usuario;