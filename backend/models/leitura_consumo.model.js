import mongoose from "mongoose";


const LeituraComsumoSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    mes: {
        type: Number,
        required: true,
    },
    ano: {
        type: Number,
        required: true,
    },
    consumo: {
        type: Number,
        required: true,
    },
},
{timestamps: true}
);

const LeituraComsumo = mongoose.model('LeituraComsumo', LeituraComsumoSchema);

export default LeituraComsumo;