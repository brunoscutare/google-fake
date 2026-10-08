import { z } from 'zod';

export const questionSchema = z.object({
  question: z
    .string({ required_error: 'A pergunta é obrigatória.' })
    .trim()
    .min(3, 'A pergunta deve ter pelo menos 3 caracteres.')
    .max(1000, 'A pergunta pode ter no máximo 1000 caracteres.'),
}).strict('Envie apenas o campo question.');

export function parseQuestion(body) {
  const result = questionSchema.safeParse(body);
  if (!result.success) {
    const error = new Error(result.error.issues[0]?.message || 'Dados inválidos.');
    error.status = 400;
    throw error;
  }
  return result.data.question.replace(/\s+/g, ' ');
}
