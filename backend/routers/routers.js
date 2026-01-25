import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import documentacao from "./docs.router.js";
import login from "../controllers/auth.controller.js";
import loginDto from "../dtos/login.dto.js";
import validador from "../middlewares/validador.middleware.js";
import { verificarToken, verificarPermissao } from "../middlewares/auth.middleware.js";
import clienteRouter from "./cliente.router.js";
import funcionarioRouter from "./funcionario.router.js";


const router = Router();

/**
 * @swagger
 * /api-docs:
 *   get:
 *     summary: Mostra a documentação da API.
 *     description: Mostra toda a documentação da API.
 *     tags: [Documentação]
 *     responses:
 *       200:
 *          description: Retorna a página de documentação da API.
 */
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(documentacao));

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza o login do usuário
 *     description: Autentica um usuário e retorna um token JWT.
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               senha:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login realizado com sucesso!
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     nome:
 *                       type: string
 *                     email:
 *                       type: string
 *                     tipo:
 *                       type: string
 *                       enum: [cliente, funcionario]
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/login', validador(loginDto), login);

router.use('/cliente', verificarToken, verificarPermissao(['cliente']), clienteRouter)

router.use('/funcionario', funcionarioRouter)

export default router;