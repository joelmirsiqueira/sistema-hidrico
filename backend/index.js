import dotenv from 'dotenv';
import express from 'express';
import router from './routers/routers.js';
import mqttConnectAsync from './mqtt/connect.mqtt.js';
import dbConnectAsync from './database/connect.database.js';

dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

await dbConnectAsync();
const clientMqtt = await mqttConnectAsync();

// Middleware para disponibilizar o cliente MQTT em todas as requisições
app.use((req, res, next) => {
    req.mqttClient = clientMqtt;
    next();
});

app.use(router);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});