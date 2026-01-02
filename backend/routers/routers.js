import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import documentacao from "./docs.router.js";
import usuarioRouters from "./usuario.router.js";
import mqttRouter from "./mqtt.routers.js";

const router = Router();

/**
 * @swagger
 * /api-docs:
 *   get:
 *     description: Rota de documentação da API.
 *     responses:
 *       200:
 *          description: Retorna a página de documentação da API.
 */
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(documentacao));

/**
 * @swagger
 * /:
 *   get:
 *     description: Rota de teste
 *     responses:
 *       200:
 *          description: Retorna uma string.
 */
router.get('/', (req, res) => {
    res.send('Rota funcionando!');
});

/**
 * @swagger
 * /usuario:
 *   post:
 *     description: Rota de gerenciamento de usuários.
 */
router.use('/', usuarioRouters)

/**
 * @swagger
 * /mqtt:
 *   all:
 *     description: Rota de gerenciamento do MQTT.
 */
router.use('/mqtt', mqttRouter)

export default router;