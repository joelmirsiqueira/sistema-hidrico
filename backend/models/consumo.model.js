import mongoose from "mongoose";

const consumoSchema = new mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    dataHora: {
        type: Date,
        default: Date.now,
    },
    quantidade: {
        type: Number,
        required: true,
    },
});

const Consumo = mongoose.model('Consumo', consumoSchema);

export default Consumo;