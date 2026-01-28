import { z } from 'zod';
import mongoose from 'mongoose';
import Comporta from '../models/comporta.model.js';

export const criarFuncionarioDto = z.object({
    nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.email("O email deve ser válido"),
    senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres")
}).strict();

export const criarClienteDto = criarFuncionarioDto.extend({
    codigoCliente: z.number(),
    comporta: z.string()
        .refine((value) => mongoose.isValidObjectId(value), {
            message: "ID da comporta inválido",
        })
        .refine(async (value) => !!await Comporta.findById(value), {
            message: "Comporta não encontrada",
        }),
    endereco: z.object({
        rua: z.string().min(3, "A rua deve ter pelo menos 3 caracteres"),
        numero: z.number("O número deve ser preenchido com um número válido").min(1, "O número deve ser maior que 0"),
        bairro: z.string().min(3, "O bairro deve ter pelo menos 3 caracteres"),
    }),
}).strict();

export const atualizarFuncionarioDto = criarFuncionarioDto.omit({ senha: true }).partial();

export const atualizarClienteDto = criarClienteDto.omit({ id: true, senha: true, codigoCliente: true, tipo: true }).partial();

export const respostaUsuarioDto = z.object({
    nome: z.string(),
    email: z.string(),
    tipo: z.string(),
    codigoCliente: z.number().optional(),
    comporta: z.any().transform((v) => v.toString()).optional(),
    endereco: z.object({
        rua: z.string(),
        numero: z.number(),
        bairro: z.string(),
    }).optional(),
    status: z.string().optional(),
    comportaStatus: z.string().optional(),
    historicoConsumo: z.any().optional(),
});

export const atualizarSenhaDto = z.object({
    senhaAtual: z.string().min(1, "A senha atual deve ser preenchida"),
    novaSenha: z.string().min(6, "A nova senha deve ter pelo menos 6 caracteres"),
})