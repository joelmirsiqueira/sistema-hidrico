import mongoose from "mongoose";


const nivelSchema = new mongoose.Schema({
    dataHora: {
        type: Date,
        default: Date.now,
    },
    capacidade: {
        type: Number,
        required: true,
    },
});

const Nivel = mongoose.model('Nivel', nivelSchema);

export default Nivel;