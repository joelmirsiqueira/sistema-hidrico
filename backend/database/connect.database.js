import mongoose from 'mongoose';

async function dbConnectAsync() {
    const url = process.env.MONGODB_URL;
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(url);
        console.log('Conectado ao MongoDB');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        throw error;
    }
}

export default dbConnectAsync;