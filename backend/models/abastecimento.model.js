import mongoose from "mongoose";

const abastecimentoSchema = new mongoose.Schema({
    data: {
        type: Date,
        required: true,
    },
    bairro: {
        type: String,
        required: true,
    },
    duracao: {
        type: Number,
        required: true,
    },
}, { timestamps: true })

const abastecimento = mongoose.model('Abastecimento', abastecimentoSchema);

export default abastecimento;