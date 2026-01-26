import { z } from 'zod';

export const loginDto = z.object({
    email: z.email("Email deve ser válido"),
    senha: z.string().min(1, "Senha é obrigatória")
});
