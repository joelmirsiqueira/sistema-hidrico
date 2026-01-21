import mongoose from "mongoose";

const RelatoSchema = new mongoose.Schema({
    cliente_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    codigo_cliente: {
        type: Number,
        required: true,
    },
    data_hora: {
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