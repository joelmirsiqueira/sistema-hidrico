import mongoose from "mongoose";

const abastecimentoSchema = new mongoose.Schema({
    dataHora: {
        type: Date,
        required: true,
    },
    comporta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comporta',
        required: true,
    },
    duracao: {
        type: Number,
        required: true,
    },
}, { timestamps: true })

const abastecimento = mongoose.model('Abastecimento', abastecimentoSchema);

export default abastecimento;