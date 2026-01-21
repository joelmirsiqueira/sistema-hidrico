import mongoose from "mongoose";

const comportaSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    status: {
        enum: ['aberto', 'fechado'],
        required: true,
    },
    data_hora: {
        type: Date,
        default: Date.now,
    },
});



const Comporta = mongoose.model('Comporta', comportaSchema);

export default Comporta;