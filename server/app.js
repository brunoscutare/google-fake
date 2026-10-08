import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { generateAnswer } from './gemini.js';
import { parseQuestion } from './validation.js';

export function createApp({ answerService = generateAnswer, env = process.env } = {}) {
  const app = express();
  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors({ origin: env.CLIENT_ORIGIN || 'http://localhost:5173' }));
  app.use(express.json({ limit: '10kb' }));

  app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok', geminiConfigured: Boolean(env.GEMINI_API_KEY) });
  });

  app.post('/api/ask', rateLimit({
    windowMs: 60_000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { error: 'Muitas perguntas em pouco tempo. Aguarde um minuto e tente novamente.', code: 'RATE_LIMITED' },
  }), async (request, response, next) => {
    try {
      const question = parseQuestion(request.body);
      const startedAt = performance.now();
      const answer = await answerService(question, env);
      response.json({
        question,
        answer,
        model: env.GEMINI_MODEL || 'gemini-3.8-flash',
        processingTimeMs: Math.round(performance.now() - startedAt),
      });
    } catch (error) {
      next(error);
    }
  });

  app.use('/api', (_request, response) => response.status(404).json({ error: 'Rota não encontrada.', code: 'NOT_FOUND' }));

  app.use((error, _request, response, _next) => {
    if (error instanceof SyntaxError && 'body' in error) {
      return response.status(400).json({ error: 'O corpo da requisição contém JSON inválido.', code: 'INVALID_JSON' });
    }
    const status = error.status || (error.statusCode >= 400 ? error.statusCode : 500);
    let message = error.message || 'Erro interno do servidor.';
    if (status >= 500 && !error.code && env.NODE_ENV === 'production') message = 'Não foi possível gerar a resposta agora.';
    return response.status(status).json({ error: message, code: error.code || 'REQUEST_FAILED' });
  });

  return app;
}
