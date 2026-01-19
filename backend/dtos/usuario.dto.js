import { z } from 'zod';

const usuarioDto = z.object({
    codigo: z.number().optional(),
    nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.email("O email deve ser válido"),
    senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    tipo: z.enum(['cliente', 'funcionario'], "O tipo é obrigatório e deve ser cliente ou funcionario"),
    statusAbastecimento: z.enum(['ativo', 'inativo'], "O status deve ser ativo ou inativo").optional(),
    endereco: z.object({
        rua: z.string().min(3, "A rua deve ter pelo menos 3 caracteres"),
        numero: z.number(),
        bairro: z.string().min(3, "O bairro deve ter pelo menos 3 caracteres"),
    }).optional()
}).superRefine((data, ctx) => {
    if (data.tipo === 'cliente') {
        if (data.codigo == null) {
            ctx.addIssue({
                message: "Código é obrigatório para o tipo 'cliente'",
                path: ['codigo'],
            });
        }
        if (data.endereco == null) {
            ctx.addIssue({
                message: "Endereço é obrigatório para o tipo 'cliente'",
                path: ['endereco'],
            });
        }
        if (data.statusAbastecimento == null) {
            ctx.addIssue({
                message: "Status de abastecimento é obrigatório para o tipo 'cliente'",
                path: ['statusAbastecimento'],
            });
        }
    }
});

export default usuarioDto;