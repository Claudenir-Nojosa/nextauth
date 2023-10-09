import { z } from "zod";

export const TagSchema = z.object({
  name: z
    .string({ required_error: "Insira a Tag" })
    .min(2, {
      message: "Tag tem que ter no mínimo 2 caracteres.",
    })
    .max(12, {
      message: "Conteúdo tem que ter no máximo 12 caracteres.",
    }),
});
