import { z } from "zod";

export const criarRelatoDto = z.object({
    mensagem: z.string().min(15, "A mensagem deve ter pelo menos 15 caracteres"),
    status: z.enum([
        'lido',
        'não lido',
        'respondido',
        'resolvido'], "Status deve ser um valor válido").optional()
}).strict();

export const atualizarRelatoDto = criarRelatoDto.partial();

export const respostaRelatoDto = z.object({
    id: z.string(),
    cliente: z.string(),
    dataHora: z.date(),
    mensagem: z.string(),
    status: z.string(),
});