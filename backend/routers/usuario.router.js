import { Router } from "express";
import usuarioDto from "../dtos/usuario.dto.js";
import relatoDto from "../dtos/relato.dto.js";
import validador from "../middlewares/validador.middleware.js";
import { adicionarUsuario, listarFuncionarios, listarClientes, listarRelatos} from "../controllers/funcionario.controller.js";
import { CriarRelato } from "../controllers/cliente.controller.js";
import { verificarToken, verificarPermissao } from "../middlewares/auth.middleware.js";


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

// Rotas Protegidas (Exigem Token)
usuarioRouters.get('/funcionario', verificarToken, verificarPermissao(['funcionario']), listarFuncionarios);

usuarioRouters.get('/cliente', verificarToken, verificarPermissao(['funcionario']), listarClientes);

// Cliente precisa estar logado para criar relato
usuarioRouters.post('/relato', verificarToken, validador(relatoDto), CriarRelato);

// Apenas funcionários/admins podem ver a lista de relatos
usuarioRouters.get('/relatos', verificarToken, verificarPermissao(['funcionario']), listarRelatos);

export default usuarioRouters;