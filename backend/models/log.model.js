import mongoose from "mongoose";

const logComportaSchema = new mongoose.Schema({
    comporta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comporta',
        required: true,
    },
    dataHora: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['on', 'off'],
        required: true,
    },
});

const logESP32Schema = new mongoose.Schema({
    dataHora: {
        type: Date,
        default: Date.now,
    },
    mensagem: {
        type: String,
        required: true,
    }
});

export const LogComporta = mongoose.model('LogComporta', logComportaSchema);

export const LogESP32 = mongoose.model('LogESP32', logESP32Schema);