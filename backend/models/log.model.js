import mongoose from "mongoose";

// Schemas
logComportaSchema = new mongoose.Schema({
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

logESP32Schema = new mongoose.Schema({
    dataHora: {
        type: Date,
        default: Date.now,
    },
    mensagem: {
        type: String,
        required: true,
    }
});

// Models

export const LogComporta = mongoose.model('LogComporta', logComportaSchema);

export const LogESP32 = mongoose.model('LogESP32', logESP32Schema);