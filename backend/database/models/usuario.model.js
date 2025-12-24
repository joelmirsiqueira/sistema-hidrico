import mongoose from "mongoose";


const UsuarioSchema = new mongooseSchema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    senha: {
        type: String,
        required: true,
    },
},
{timestamps: true}
);

const Usuario = mongoose.model('Usuario', UsuarioSchema);

export default Usuario;