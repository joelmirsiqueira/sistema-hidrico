import mongoose from "mongoose";

const consumoSchema = new mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    data: {
        type: Date,
        required: true,
    },
    consumo: {
        type: Number,
        required: true,
    },
});

const consumo = mongoose.model('Consumo', consumoSchema);

export default consumo;