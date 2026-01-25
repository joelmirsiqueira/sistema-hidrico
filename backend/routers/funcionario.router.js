import { Router } from "express";
import validador from "../middlewares/validador.middleware.js";
import { criarFuncionarioDto, criarClienteDto } from "../dtos/usuario.dto.js";
import {
    criarCliente,
    criarFuncionario,
    listarFuncionarios,
    listarClientes,
    listarRelatos,
    atualizarCliente,
    atualizarFuncionario,
    resetarSenha,
    obterNivelReservatorio,
    acionarComporta,
} from "../controllers/funcionario.controller.js";


const funcionarioRouter = Router();

funcionarioRouter.post('/criar/funcionario', validador(criarFuncionarioDto), criarFuncionario);

funcionarioRouter.post('/criar/cliente', validador(criarClienteDto), criarCliente);

funcionarioRouter.patch('/atualizar/cliente/:id', atualizarCliente);

funcionarioRouter.patch('/atualizar/funcionario/:id', atualizarFuncionario);

funcionarioRouter.get('/resetar/senha/:id', resetarSenha);

funcionarioRouter.get('/listar/funcionarios', listarFuncionarios);

funcionarioRouter.get('/listar/clientes', listarClientes);

funcionarioRouter.get('/listar/relatos', listarRelatos);

funcionarioRouter.get('/consultar/nivel', obterNivelReservatorio);

funcionarioRouter.post('/acionar/comporta/:numero', acionarComporta);

// funcionarioRouter.get('/consultar/consumo/:id', obterConsumo);

export default funcionarioRouter;