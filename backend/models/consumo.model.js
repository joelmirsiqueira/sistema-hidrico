import mongoose from "mongoose";

const consumoSchema = new mongoose.Schema({
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
    consumo: {
        type: Number,
        required: true,
    },
});

const consumo = mongoose.model('Consumo', consumoSchema);

export default consumo;