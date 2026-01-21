import { Router } from "express";
import { getComportaStatus, setComporta } from "../controllers/mqtt.controller.js";
import { verificarPermissao, verificarToken } from "../middlewares/auth.middleware.js";
import validador from "../middlewares/validador.middleware.js";
import { mqttDto } from "../dtos/mqtt.dto.js";

const mqttRouter = Router();

mqttRouter.get('/comporta/:comporta', getComportaStatus)

mqttRouter.post('/comporta/:comporta', verificarToken, verificarPermissao(['funcionario']), validador(mqttDto), setComporta);

export default mqttRouter;