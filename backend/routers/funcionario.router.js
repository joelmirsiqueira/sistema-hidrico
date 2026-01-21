import { Router } from "express";
import validador from "../middlewares/validador.middleware.js";
import { funcionarioDto, clienteDto } from "../dtos/usuario.dto.js";
import { adicionarUsuario, listarFuncionarios, listarClientes, listarRelatos, atualizarCliente, atualizarFuncionario, resetarSenha, obterNivelReservatorio} from "../controllers/funcionario.controller.js";
import {validador} from "../middlewares/auth.middleware.js";


const funcionarioRouter = Router();

funcionarioRouter.post('/funcionario', validador(funcionarioDto), adicionarUsuario);

funcionarioRouter.post('/cliente', validador(clienteDto), adicionarUsuario)

funcionarioRouter.get('/funcionarios', listarFuncionarios)

funcionarioRouter.get('/clientes', listarClientes);

funcionarioRouter.get('/relatos', listarRelatos);

funcionarioRouter.get('/consumo/:id', obterConsumo);

funcionarioRouter.patch('/cliente/:id', atualizarCliente);

funcionarioRouter.patch('funcionario/:id', atualizarFuncionario);

funcionarioRouter.patch('/resetar-senha/:id', resetarSenha);

funcionarioRouter.get('/nivel', obterNivelReservatorio)

export default funcionarioRouter