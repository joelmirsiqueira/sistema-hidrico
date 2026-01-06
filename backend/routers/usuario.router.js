import { Router } from "express";
import usuarioDto from "../dtos/usuario.dto.js";
import validador from "../dtos/validador.middleware.js";
import { adicionarUsuario, listarFuncionarios, listarClientes } from "../controllers/funcionario.controller.js";


const usuarioRouters = Router();

/**
 * @swagger
 * /usuario:
 *      post:
 *          description: Rota de adicionar usuario no banco de dados.
 *          responses:
 *              201: usuário criado com sucesso.
*/
usuarioRouters.post('/usuario', validador(usuarioDto), adicionarUsuario);

usuarioRouters.get('/funcionario', listarFuncionarios);

usuarioRouters.get('/cliente', listarClientes);

export default usuarioRouters;