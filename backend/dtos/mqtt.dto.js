import { z } from "zod";
import mongoose from "mongoose";
import Comporta from "../models/comporta.model.js";

export const acionarComportaDto = z.object({
    comporta: z.string().min(1, "O ID da comporta deve ser preenchido")
        .refine((value) => mongoose.isValidObjectId(value), {
            message: "ID da comporta inválido",
        })
        .refine(async (value) => !!await Comporta.findById(value), {
            message: "Comporta não encontrada",
        }),
    comando: z.enum(['on', 'off'], "O comando deve ser \'on\' ou \'off\'")
}).strict();

export const respostaComportaDto = z.object({
    _id: z.any().transform((v) => v.toString()),
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