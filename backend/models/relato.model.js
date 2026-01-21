import mongoose from "mongoose";

const RelatoSchema = new mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    codigoCliente: {
        type: Number,
        required: true,
    },
    dataHora: {
        type: Date,
        required: true,
    },
    mensagem: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['não lido', 'lido', 'respondido', 'resolvido'],
        default: 'não lido',
        required: true,
    },
});

const Relato = mongoose.model('Relato', RelatoSchema);

export default Relato;