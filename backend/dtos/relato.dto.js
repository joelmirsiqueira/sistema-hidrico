import { z } from "zod";

export const criarRelatoDto = z.object({
    mensagem: z.string().min(15, "A mensagem deve ter pelo menos 15 caracteres"),
}).strict();

export const atualizarRelatoDto = criarRelatoDto.partial();

export const respostaRelatoDto = z.object({
    id: z.string(),
    cliente: z.string(),
    mensagem: z.string(),
    status: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});