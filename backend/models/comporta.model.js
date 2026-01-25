import mongoose from "mongoose";

const comportaSchema = new mongoose.Schema({
    numero: {
        type: Number,
        unique: true,
        required: true,
    },
    status: {
        type: String,
        enum: ['on', 'off'],
        required: true,
    },
}, { timestamps: true });

const Comporta = mongoose.model('Comporta', comportaSchema);

export default Comporta;