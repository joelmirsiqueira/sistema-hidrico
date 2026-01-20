import { z } from 'zod';

const loginDto = z.object({
    email: z.email("Email deve ser válido"),
    senha: z.string().min(1, "Senha é obrigatória")
});

export default loginDto;