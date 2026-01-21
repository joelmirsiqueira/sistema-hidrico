import mongoose from "mongoose";

const consumoSchema = new mongoose.Schema({
    cliente_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    data_hora: {
        type: Date,
        default: Date.now,
    },
    consumo: {
        type: Number,
        required: true,
    },
});

const consumo = mongoose.model('Consumo', consumoSchema);

export default consumo;