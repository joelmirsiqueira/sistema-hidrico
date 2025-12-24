import dotenv from 'dotenv';
import express from 'express';
import router from './routers/routers.js';
import mqttConnectAsync from './mqtt/connect.mqtt.js';
import mongooseConnectAsync from './database/connect.database.js';

dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(router)

await mongooseConnectAsync();
// await mqttConnectAsync();

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});