import { z } from 'zod';

const usuarioDto = z.object({
    nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.email("Formato de email inválido"),
    senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    tipo: z.enum(['cliente', 'funcionario'], "Tipo deve ser cliente ou funcionario").optional()
});

export default usuarioDto;