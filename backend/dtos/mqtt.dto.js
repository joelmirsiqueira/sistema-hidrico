import { z } from "zod";

export const mqttDto = z.object({
    comporta: z.number("O identificador da comporta deve ser um número").min(1, "O identificador da comporta deve ser maior que 0"),
    comando: z.enum(['on', 'off'], "O comando deve ser on ou off"),
});