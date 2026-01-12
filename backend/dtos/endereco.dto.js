import { z } from "zod";

const enderecoDto = z.object({
    rua: z.string().min(3, "O nome deve ter pelo menos 5 caracteres"),
    numero: z.number(),
    bairro: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
});

export default enderecoDto;