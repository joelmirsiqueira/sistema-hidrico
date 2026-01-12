import { Router } from "express";
import usuarioDto from "../dtos/usuario.dto.js";
import relatoDto from "../dtos/relato.dto.js";
import validador from "../middlewares/validador.middleware.js";
import { adicionarUsuario, listarFuncionarios, listarClientes, listarRelatos} from "../controllers/funcionario.controller.js";
import { CriarRelato } from "../controllers/cliente.controller.js";


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

usuarioRouters.post('/relato', validador(relatoDto), CriarRelato);

usuarioRouters.get('/relatos', listarRelatos);

export default usuarioRouters;