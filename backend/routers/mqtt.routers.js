import { Router } from "express";
import { acionarComporta } from "../controllers/mqtt.controller.js";

const mqttRouter = Router();

mqttRouter.post('/acionar/:comporta', acionarComporta);

export default mqttRouter;