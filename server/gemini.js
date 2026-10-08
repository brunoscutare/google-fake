import { GoogleGenAI } from '@google/genai';

const SYSTEM_INSTRUCTION = `Você é o Google Fake, um assistente de busca claro, cordial e confiável.
Responda sempre no idioma da pergunta. Comece com a resposta direta e use Markdown simples para organizar.
Não invente fatos ou fontes. Quando houver incerteza ou informação que possa estar desatualizada, deixe isso explícito.
Não diga que pesquisou na internet: você responde com base no seu conhecimento. Seja conciso, mas útil.`;

export async function generateAnswer(question, env = process.env) {
  if (!env.GEMINI_API_KEY || env.GEMINI_API_KEY === 'sua_chave_aqui') {
    const error = new Error('A chave do Gemini ainda não foi configurada no servidor.');
    error.status = 503;
    error.code = 'API_KEY_MISSING';
    throw error;
  }

  const client = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
  const response = await client.models.generateContent({
    model: env.GEMINI_MODEL || 'gemini-3.8-flash',
    contents: question,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.4,
      maxOutputTokens: 1200,
    },
  });

  const answer = response.text?.trim();
  if (!answer) {
    const error = new Error('O Gemini não retornou conteúdo para esta pergunta. Tente reformular.');
    error.status = 502;
    throw error;
  }
  return answer;
}
