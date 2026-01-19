import mongoose from "mongoose";
import { number } from "zod";

const comportaSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    status: {
        enum: ['aberto', 'fechado'],
        default: 'fechado',
        required: true,
    },
}, { _id: false });

const reservatorioSchema = new mongoose.Schema({
    nivel: {
        type: Number,
        required: true,
    },
    comporta: {
        type: comportaSchema,
        required: true,
    },
});

const reservatorio = mongoose.model('Reservatorio', reservatorioSchema);

export default reservatorio;