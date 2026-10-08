# Google Fake — busca inteligente com Gemini

Produto web que recebe uma pergunta em linguagem natural e devolve uma resposta clara gerada pela API Gemini. O frontend foi feito em React para web e o backend em Node.js/Express.

## Executar localmente

Requisitos: Node.js 20 ou superior e uma chave da API Gemini.

1. Instale as dependências: `npm install`
2. Copie `.env.example` para `.env`
3. Crie uma chave no [Google AI Studio](https://aistudio.google.com/app/apikey) e preencha `GEMINI_API_KEY`
4. Inicie frontend e backend: `npm run dev`
5. Acesse `http://localhost:5173`

Nunca coloque a chave em variáveis que começam com `VITE_`: elas ficam visíveis no navegador.

## Comandos

- `npm run dev`: frontend e API com recarga automática
- `npm test`: testes da API sem consumir o Gemini
- `npm run build`: build de produção do frontend
- `npm run presentation`: recria `docs/Apresentacao-Google-Fake.pptx`
- `npm start`: inicia somente a API

## API

- `GET /api/health`: verifica disponibilidade e configuração
- `POST /api/ask`: recebe `{ "question": "..." }`

Consulte [docs/ARQUITETURA.md](docs/ARQUITETURA.md) para o fluxo completo, decisões e exemplos.

## Roteiro rápido da demonstração

1. Abrir a tela inicial e escolher uma sugestão ou escrever uma pergunta.
2. Mostrar o estado de carregamento e a resposta formatada.
3. Fazer uma pergunta curta/inválida para demonstrar a validação.
4. Mostrar que a chave está no `.env` do servidor, não no frontend.
