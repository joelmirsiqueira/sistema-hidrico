import { Router } from "express";
import { CriarRelato, obterConsumo, atualizarSenha, listarConsumos, obterComportaStatus, obterStatusRacionamento } from "../controllers/cliente.controller.js";
import validador from "../middlewares/validador.middleware.js";
import { criarRelatoDto } from "../dtos/relato.dto.js";
import { atualizarSenhaDto } from "../dtos/usuario.dto.js";



const clienteRouter = Router();

clienteRouter.post('/criar/relato', validador(criarRelatoDto), CriarRelato);

clienteRouter.get('/consultar/consumo', obterConsumo);

clienteRouter.put('/atualizar/senha', validador(atualizarSenhaDto), atualizarSenha);

clienteRouter.get('/listar/consumos', listarConsumos);

clienteRouter.get('/consultar/comporta/:id', obterComportaStatus);

clienteRouter.get('/consultar/racionamento', obterStatusRacionamento);

export default clienteRouter;