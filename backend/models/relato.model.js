import mongoose from "mongoose";

const RelatoSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    mensagem: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['lido', 'não lido'],
        default: 'não lido',
        required: true,
    },
},
{timestamps: true}
);

const Relato = mongoose.model('Relato', RelatoSchema);

export default Relato;