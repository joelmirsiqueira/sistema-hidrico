import mongoose from "mongoose";


const leituraNivelSchema = new mongoose.Schema({
    capacidade: {
        type: Number,
        required: true,
    },
},
{timestamps: true}
);

const LeituraNivel = mongoose.model('LeituraNivel', leituraNivelSchema);

export default LeituraNivel;