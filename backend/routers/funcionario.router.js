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
    listarComportas,
} from "../controllers/funcionario.controller.js";


const funcionarioRouter = Router();

// CRUD funcionario
funcionarioRouter.post('/criar/funcionario', validador(criarFuncionarioDto), criarFuncionario);

funcionarioRouter.get('/listar/funcionarios', listarFuncionarios);

funcionarioRouter.patch('/atualizar/funcionario/:id', atualizarFuncionario);

// funcionarioRouter.put('/atualizar/senha', atualizarSenha); // TO DO

// CRUD cliente
funcionarioRouter.post('/criar/cliente', validador(criarClienteDto), criarCliente);

funcionarioRouter.get('/listar/clientes', listarClientes);

funcionarioRouter.patch('/atualizar/cliente/:id', atualizarCliente);

// funcionarioRouter.patch('/consultar/cliente/:id', consultarCliente); // TO DO

// Funcionalidades
funcionarioRouter.get('/resetar/senha/:id', resetarSenha);

funcionarioRouter.get('/listar/comportas', listarComportas)

funcionarioRouter.get('/consultar/nivel', obterNivelReservatorio);

// funcionarioRouter.get('/listar/comportas', listarComportas); // TO DO

funcionarioRouter.post('/acionar/comporta', acionarComporta);

funcionarioRouter.get('/listar/relatos', listarRelatos);

// funcionarioRouter.get('/consultar/consumo/:id', obterConsumo); // TO DO

export default funcionarioRouter;