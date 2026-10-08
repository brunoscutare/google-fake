import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { createApp } from '../server/app.js';

let server;
let baseUrl;

before(async () => {
  const app = createApp({
    answerService: async (question) => `Resposta para: ${question}`,
    env: { CLIENT_ORIGIN: 'http://localhost:5173', GEMINI_MODEL: 'modelo-teste' },
  });
  await new Promise((resolve) => { server = app.listen(0, resolve); });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(() => server.close());

test('GET /api/health informa o estado da API', async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'ok', geminiConfigured: false });
});

test('POST /api/ask valida e normaliza a pergunta', async () => {
  const response = await fetch(`${baseUrl}/api/ask`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: '  O que   é IA?  ' }),
  });
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.question, 'O que é IA?');
  assert.equal(body.answer, 'Resposta para: O que é IA?');
  assert.equal(body.model, 'modelo-teste');
});

test('POST /api/ask rejeita pergunta vazia', async () => {
  const response = await fetch(`${baseUrl}/api/ask`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: '  ' }),
  });
  assert.equal(response.status, 400);
  assert.match((await response.json()).error, /pelo menos 3/);
});
