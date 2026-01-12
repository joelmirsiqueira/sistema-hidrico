import mongoose from "mongoose";

const enderecoSchema = new mongoose.Schema({
    rua: {
        type: String,
        required: true,
    },
    numero: {
        type: Number,
        required: true,
    },
    bairro: {
        type: String,
        required: true,
    },
})

const endereco = mongoose.model('Endereco', enderecoSchema);

export default endereco;