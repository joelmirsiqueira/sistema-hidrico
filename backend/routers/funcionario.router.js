import { Router } from "express";
import validador from "../middlewares/validador.middleware.js";
import { criarFuncionarioDto, criarClienteDto, atualizarFuncionarioDto, atualizarClienteDto, atualizarSenhaDto } from "../dtos/usuario.dto.js";
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
    listarComportas,
    consultarCliente,
} from "../controllers/funcionario.controller.js";
import { atualizarSenha } from "../controllers/cliente.controller.js";


const funcionarioRouter = Router();

// CRUD funcionario
funcionarioRouter.post('/criar/funcionario', validador(criarFuncionarioDto), criarFuncionario);

funcionarioRouter.get('/listar/funcionarios', listarFuncionarios);

funcionarioRouter.patch('/atualizar/funcionario/:id', validador(atualizarFuncionarioDto), atualizarFuncionario);

funcionarioRouter.put('/atualizar/senha', validador(atualizarSenhaDto), atualizarSenha);

// CRUD cliente
funcionarioRouter.post('/criar/cliente', validador(criarClienteDto), criarCliente);

funcionarioRouter.get('/listar/clientes', listarClientes);

funcionarioRouter.patch('/atualizar/cliente/:id', validador(atualizarClienteDto), atualizarCliente);

funcionarioRouter.get('/consultar/cliente/:id', consultarCliente);

// Funcionalidades
funcionarioRouter.get('/resetar/senha/:id', resetarSenha);

funcionarioRouter.get('/listar/comportas', listarComportas)

funcionarioRouter.get('/consultar/nivel', obterNivelReservatorio);

funcionarioRouter.post('/acionar/comporta', acionarComporta);

funcionarioRouter.get('/listar/relatos', listarRelatos);

export default funcionarioRouter;