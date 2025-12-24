import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import openapiSpecification from "./docs.router.js";

const router = Router();

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

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


export default router;