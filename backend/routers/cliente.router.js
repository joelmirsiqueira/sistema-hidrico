import { Router } from "express";
import { CriarRelato, obterConsumo, atualizarSenha } from "../controllers/cliente.controller.js";
import validador from "../middlewares/validador.middleware.js";
import { criarRelatoDto } from "../dtos/relato.dto.js";


const clienteRouter = Router();

clienteRouter.post('/criar/relato', validador(criarRelatoDto), CriarRelato);

clienteRouter.get('/obter/consumo', obterConsumo);

clienteRouter.put('/atualizar/senha', atualizarSenha);

export default clienteRouter;