import { z } from "zod";

const relatoDto = z.object({
    usuario: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    mensagem: z.string().min(15, "A mensagem deve ter pelo menos 15 caracteres"),
    status: z.enum(['lido', 'não lido'], "Status deve ser lido ou não lido").optional()
});

export default relatoDto;