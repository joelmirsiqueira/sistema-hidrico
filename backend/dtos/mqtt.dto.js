import { z } from "zod";
import mongoose from "mongoose";
import Comporta from "../models/comporta.model.js";

export const acionarComportaDto = z.object({
    comporta: z.string()
        .regex(/^[0-9a-fA-F]{24}$/, "ID da comporta inválido")
        .refine(async (value) => {
            if (!mongoose.isValidObjectId(value)) return true;
            return !!await Comporta.findById(value);
        }, "Comporta não encontrada"),
    comando: z.enum(['on', 'off'], "O comando deve ser on ou off"),
}).strict();

export const respostaComportaDto = z.object({
    id: z.string(),
    numero: z.number(),
    status: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const respostaNivelDto = z.object({
    id: z.string(),
    dataHora: z.date(),
    capacidade: z.number(),
    racionamento: z.boolean(),
});