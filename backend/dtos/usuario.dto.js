import { z } from 'zod';
import Comporta from '../models/comporta.model.js';

const usuariobase = z.object({
    nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.email("O email deve ser válido"),
    senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres")
})

const funcionarioDto = usuariobase.extend({
    tipo: z.literal('funcionario'),
})

const clienteDto = usuariobase.extend({
    tipo: z.literal('cliente'),
    codigo_cliente: z.number(),
    comporta: async (value) => {
        const comporta = await Comporta.findById(value);
        if (!comporta) {
            throw new Error("Comporta não encontrado");
        }
        return comporta;
    },
    endereco: z.object({
        rua: z.string().min(3, "A rua deve ter pelo menos 3 caracteres"),
        numero: z.number(),
        bairro: z.string().min(3, "O bairro deve ter pelo menos 3 caracteres"),
    }),
    status_cliente: z.enum(['ativo', 'inativo'], "O status deve ser ativo ou inativo")
})

const usuarioDto = z.discriminatedUnion('tipo', [funcionarioDto, clienteDto]);

export default usuarioDto;