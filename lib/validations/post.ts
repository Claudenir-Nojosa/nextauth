import { z } from "zod";

export const FormSchema = z.object({
  content: z
    .string({ required_error: "Insira o conteúdo" })
    .min(10, {
      message: "Conteúdo tem que ter no mínimo 10 caracteres.",
    })
    .max(160, {
      message: "Conteúdo tem que ter no máximo 160 caracteres.",
    }),
  title: z
    .string({ required_error: "Insira o título" })
    .min(2, { message: "Título muito curto." }),
  tagId: z.string({ required_error: "Selecione uma opção." }),
});
