import pptxgen from 'pptxgenjs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'Projeto Google Fake';
pptx.subject = 'Produto web integrado à API Gemini';
pptx.title = 'Google Fake — Busca inteligente com Gemini';
pptx.company = 'Projeto acadêmico';
pptx.lang = 'pt-BR';
pptx.theme = {
  headFontFace: 'Aptos Display', bodyFontFace: 'Aptos', lang: 'pt-BR',
};
pptx.defineSlideMaster({
  title: 'MASTER',
  background: { color: 'F7F8FC' },
  objects: [
    { line: { x: 0.55, y: 7.08, w: 12.23, h: 0, line: { color: 'E2E6EE', width: 1 } } },
    { text: { text: 'GOOGLE FAKE  •  BUSCA INTELIGENTE', options: { x: 0.58, y: 7.15, w: 4.2, h: 0.18, fontFace: 'Aptos', fontSize: 7.5, color: '8994A6', bold: true, charSpacing: 1.3, margin: 0 } } },
    { text: { text: 'API GEMINI + REACT + NODE.JS', options: { x: 9.2, y: 7.15, w: 3.55, h: 0.18, fontFace: 'Aptos', fontSize: 7.5, color: '8994A6', align: 'right', margin: 0 } } },
  ],
  slideNumber: { x: 12.82, y: 7.13, color: 'A1A9B6', fontSize: 8 },
});

const C = { navy: '17243A', text: '46566D', muted: '7E8A9C', purple: '6859E7', blue: '5885EE', white: 'FFFFFF', line: 'E1E5ED', pale: 'F0EEFF', green: '25B983', red: 'D95F70' };

function addTitle(slide, kicker, title, subtitle) {
  slide.addText(kicker.toUpperCase(), { x: .65, y: .48, w: 4.5, h: .24, fontSize: 9, bold: true, color: C.purple, charSpacing: 1.7, margin: 0 });
  slide.addText(title, { x: .65, y: .83, w: 11.9, h: .55, fontSize: 28, bold: true, color: C.navy, margin: 0, breakLine: false });
  if (subtitle) slide.addText(subtitle, { x: .67, y: 1.43, w: 11.2, h: .36, fontSize: 12, color: C.muted, margin: 0 });
}

function pill(slide, text, x, y, color = C.purple) {
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w: 1.75, h: .34, rectRadius: .1, fill: { color: 'FFFFFF', transparency: 7 }, line: { color: 'DBDFF0' } });
  slide.addText(text, { x: x + .08, y: y + .085, w: 1.59, h: .12, fontSize: 8, bold: true, color, align: 'center', margin: 0 });
}

function card(slide, { x, y, w, h, number, title, body, accent = C.purple }) {
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w, h, rectRadius: .08, fill: { color: C.white }, line: { color: C.line, width: 1 }, shadow: { type: 'outer', color: '8290A6', blur: 2, angle: 45, distance: 1, opacity: .1 } });
  slide.addShape(pptx.ShapeType.roundRect, { x: x + .25, y: y + .25, w: .43, h: .43, rectRadius: .08, fill: { color: accent }, line: { color: accent } });
  slide.addText(String(number), { x: x + .25, y: y + .35, w: .43, h: .12, align: 'center', fontSize: 9, bold: true, color: C.white, margin: 0 });
  slide.addText(title, { x: x + .82, y: y + .27, w: w - 1.08, h: .28, fontSize: 14, bold: true, color: C.navy, margin: 0 });
  slide.addText(body, { x: x + .25, y: y + .88, w: w - .5, h: h - 1.05, fontSize: 10.5, color: C.text, breakLine: false, valign: 'top', margin: 0, paraSpaceAfterPt: 8, bullet: body.includes('\n') ? { type: 'bullet' } : undefined });
}

// 1 — Capa
{
  const s = pptx.addSlide('MASTER');
  s.background = { color: 'F7F8FC' };
  s.addShape(pptx.ShapeType.ellipse, { x: 8.4, y: -.85, w: 5.8, h: 5.8, fill: { color: 'EFEDFF', transparency: 10 }, line: { transparency: 100 } });
  s.addShape(pptx.ShapeType.ellipse, { x: 9.55, y: .25, w: 3.45, h: 3.45, fill: { color: C.purple }, line: { transparency: 100 }, shadow: { type: 'outer', color: '6657D5', blur: 12, angle: 45, distance: 5, opacity: .22 } });
  s.addText('✦', { x: 10.36, y: 1.03, w: 1.85, h: 1.45, fontSize: 65, color: C.white, align: 'center', margin: 0, valign: 'mid' });
  pill(s, 'PRODUTO COM IA', .72, .72);
  s.addText('Google Fake', { x: .72, y: 1.45, w: 6.8, h: .85, fontSize: 44, bold: true, color: C.navy, margin: 0, charSpacing: -1.1 });
  s.addText('Busca simples. Respostas inteligentes.', { x: .75, y: 2.42, w: 6.9, h: .52, fontSize: 24, bold: true, color: C.purple, margin: 0 });
  s.addText('Uma experiência web de perguntas e respostas construída com React, Node.js e a API Gemini.', { x: .75, y: 3.15, w: 6.6, h: .75, fontSize: 15, color: C.text, margin: 0, breakLine: false });
  ['React', 'Node.js', 'Gemini API'].forEach((t, i) => pill(s, t, .75 + i * 1.95, 4.35, i === 2 ? C.blue : C.purple));
  s.addText('Apresentação do projeto  •  2026', { x: .75, y: 5.55, w: 4.3, h: .25, fontSize: 10, color: C.muted, margin: 0 });
}

// 2 — Conceito
{
  const s = pptx.addSlide('MASTER');
  addTitle(s, '01  •  Conceito', 'Um “Google simples” que conversa com você', 'O Google Fake reduz a distância entre uma dúvida e uma explicação útil.');
  card(s, { x: .65, y: 2.1, w: 3.85, h: 3.75, number: 1, title: 'Pergunte', body: 'O usuário escreve qualquer dúvida em linguagem natural — sem comandos especiais.', accent: C.purple });
  card(s, { x: 4.73, y: 2.1, w: 3.85, h: 3.75, number: 2, title: 'Processe', body: 'A API valida os dados, protege a chave e envia um prompt orientado ao Gemini.', accent: C.blue });
  card(s, { x: 8.81, y: 2.1, w: 3.85, h: 3.75, number: 3, title: 'Entenda', body: 'A resposta volta organizada em Markdown, pronta para leitura em qualquer tela.', accent: C.green });
  s.addText('Público: estudantes, curiosos e qualquer pessoa que precise compreender um tema rapidamente.', { x: 1.35, y: 6.18, w: 10.6, h: .38, fontSize: 12, color: C.text, italic: true, align: 'center', margin: 0 });
}

// 3 — Arquitetura
{
  const s = pptx.addSlide('MASTER');
  addTitle(s, '02  •  Arquitetura', 'Frontend e backend com responsabilidades claras', 'A chave da API permanece privada no servidor.');
  const nodes = [
    { x: .65, label: 'USUÁRIO', sub: 'Navegador', color: C.navy },
    { x: 3.2, label: 'REACT', sub: 'Interface + estados', color: C.purple },
    { x: 5.75, label: 'NODE.JS', sub: 'Express + regras', color: C.blue },
    { x: 8.3, label: 'SDK GENAI', sub: 'Cliente oficial', color: '498CC4' },
    { x: 10.85, label: 'GEMINI', sub: 'Geração de texto', color: C.green },
  ];
  nodes.forEach((n, i) => {
    s.addShape(pptx.ShapeType.roundRect, { x: n.x, y: 2.55, w: 1.8, h: 1.25, rectRadius: .07, fill: { color: C.white }, line: { color: n.color, width: 1.5 } });
    s.addShape(pptx.ShapeType.ellipse, { x: n.x + .68, y: 2.3, w: .44, h: .44, fill: { color: n.color }, line: { color: n.color } });
    s.addText(n.label, { x: n.x + .12, y: 2.84, w: 1.56, h: .2, fontSize: 11, bold: true, align: 'center', color: C.navy, margin: 0 });
    s.addText(n.sub, { x: n.x + .12, y: 3.22, w: 1.56, h: .18, fontSize: 8.5, align: 'center', color: C.muted, margin: 0 });
    if (i < nodes.length - 1) s.addShape(pptx.ShapeType.chevron, { x: n.x + 1.93, y: 2.92, w: .4, h: .45, fill: { color: 'CDD3DE' }, line: { transparency: 100 } });
  });
  const callouts = [
    ['POST /api/ask', 'Contrato JSON simples'], ['Zod', 'Validação de 3 a 1.000 caracteres'], ['Rate limit', '10 requisições por minuto'], ['Helmet + CORS', 'Camadas básicas de segurança'],
  ];
  callouts.forEach(([a,b], i) => {
    const x = .7 + i * 3.08;
    s.addShape(pptx.ShapeType.roundRect, { x, y: 4.65, w: 2.75, h: 1.1, rectRadius: .06, fill: { color: i % 2 ? 'F2F6FC' : 'F2F0FF' }, line: { transparency: 100 } });
    s.addText(a, { x: x + .18, y: 4.88, w: 2.39, h: .2, fontSize: 11, bold: true, color: i % 2 ? C.blue : C.purple, margin: 0 });
    s.addText(b, { x: x + .18, y: 5.22, w: 2.39, h: .25, fontSize: 9, color: C.text, margin: 0 });
  });
}

// 4 — Integração
{
  const s = pptx.addSlide('MASTER');
  addTitle(s, '03  •  Integração Gemini', 'Do texto digitado à resposta gerada', 'O SDK oficial @google/genai conecta o backend ao modelo.');
  const steps = [
    ['1', 'Receber', 'Express recebe a pergunta em JSON.'],
    ['2', 'Validar', 'Zod remove espaços e verifica o tamanho.'],
    ['3', 'Orientar', 'Uma instrução de sistema define clareza e idioma.'],
    ['4', 'Gerar', 'gemini-3.8-flash produz a resposta.'],
    ['5', 'Entregar', 'A API retorna texto, modelo e tempo.'],
  ];
  steps.forEach(([n,t,b], i) => {
    const y = 1.95 + i * .88;
    s.addShape(pptx.ShapeType.ellipse, { x: .78, y, w: .47, h: .47, fill: { color: i === 3 ? C.green : C.purple }, line: { transparency: 100 } });
    s.addText(n, { x: .78, y: y + .12, w: .47, h: .12, fontSize: 9, bold: true, color: C.white, align: 'center', margin: 0 });
    if (i < 4) s.addShape(pptx.ShapeType.line, { x: 1.015, y: y + .47, w: 0, h: .42, line: { color: 'D4D9E3', width: 1.3 } });
    s.addText(t, { x: 1.48, y: y + .01, w: 1.25, h: .2, fontSize: 12, bold: true, color: C.navy, margin: 0 });
    s.addText(b, { x: 2.75, y: y + .01, w: 3.18, h: .34, fontSize: 9.5, color: C.text, margin: 0 });
  });
  s.addShape(pptx.ShapeType.roundRect, { x: 6.6, y: 1.92, w: 5.9, h: 4.5, rectRadius: .08, fill: { color: '17243A' }, line: { color: '24334B' } });
  s.addText('server/gemini.js', { x: 6.9, y: 2.2, w: 2.2, h: .2, fontSize: 9, bold: true, color: '95A4BA', margin: 0 });
  const code = `const client = new GoogleGenAI({ apiKey });\n\nconst response = await client.models\n+  .generateContent({\n+    model: "gemini-3.8-flash",\n+    contents: question,\n+    config: {\n+      systemInstruction,\n+      temperature: 0.4\n+    }\n+  });\n\nreturn response.text;`;
  s.addText(code, { x: 6.9, y: 2.68, w: 5.15, h: 3.35, fontFace: 'Consolas', fontSize: 12.2, color: 'DDE6F4', breakLine: false, margin: 0, paraSpaceAfterPt: 3 });
}

// 5 — Demonstração
{
  const s = pptx.addSlide('MASTER');
  addTitle(s, '04  •  Demonstração', 'Uma interação simples em três momentos', 'A interface comunica claramente o que está acontecendo.');
  const titles = ['Entrada', 'Processamento', 'Resultado'];
  titles.forEach((title, i) => {
    const x = .65 + i * 4.15;
    s.addShape(pptx.ShapeType.roundRect, { x, y: 1.93, w: 3.8, h: 4.3, rectRadius: .08, fill: { color: C.white }, line: { color: C.line }, shadow: { type: 'outer', color: '8290A6', blur: 2, angle: 45, distance: 1, opacity: .1 } });
    s.addText(`0${i + 1}`, { x: x + .25, y: 2.18, w: .35, h: .2, fontSize: 9, bold: true, color: C.purple, margin: 0 });
    s.addText(title, { x: x + .72, y: 2.14, w: 2.6, h: .26, fontSize: 15, bold: true, color: C.navy, margin: 0 });
    s.addShape(pptx.ShapeType.line, { x: x + .25, y: 2.63, w: 3.3, h: 0, line: { color: 'E8EBF1' } });
    if (i === 0) {
      s.addText('O que é inteligência artificial?', { x: x + .4, y: 3.15, w: 3, h: .7, fontSize: 13, color: C.text, bold: true, align: 'center', margin: 0 });
      s.addShape(pptx.ShapeType.roundRect, { x: x + .55, y: 4.35, w: 2.7, h: .6, rectRadius: .08, fill: { color: C.purple }, line: { transparency: 100 } });
      s.addText('Pesquisar  ↑', { x: x + .8, y: 4.55, w: 2.2, h: .18, fontSize: 11, bold: true, color: C.white, align: 'center', margin: 0 });
    } else if (i === 1) {
      [0,1,2].forEach((n) => s.addShape(pptx.ShapeType.roundRect, { x: x + .5, y: 3.2 + n * .48, w: n === 2 ? 2 : 2.8, h: .16, rectRadius: .07, fill: { color: n === 1 ? 'E4E1FA' : 'EAEDF3' }, line: { transparency: 100 } }));
      s.addText('Gemini está preparando a resposta…', { x: x + .45, y: 4.95, w: 2.9, h: .4, fontSize: 10, color: C.muted, align: 'center', margin: 0 });
    } else {
      s.addText('Inteligência artificial é a área da computação que cria sistemas capazes de executar tarefas associadas à inteligência humana…', { x: x + .38, y: 3.02, w: 3.05, h: 1.5, fontSize: 11.5, color: C.text, breakLine: false, margin: 0 });
      s.addShape(pptx.ShapeType.line, { x: x + .38, y: 4.8, w: 3.05, h: 0, line: { color: 'E8EBF1' } });
      s.addText('✓ Resposta recebida com sucesso', { x: x + .38, y: 5.13, w: 3.05, h: .24, fontSize: 9, bold: true, color: C.green, margin: 0 });
    }
  });
}

// 6 — Qualidade e conclusão
{
  const s = pptx.addSlide('MASTER');
  addTitle(s, '05  •  Resultado', 'Produto funcional, seguro e fácil de evoluir', 'A entrega contempla aplicação, testes, documentação e apresentação.');
  const items = [
    ['✓', 'Experiência responsiva', 'Funciona em desktop e celular.'],
    ['✓', 'Regras de negócio', 'Validação, normalização e limite de uso.'],
    ['✓', 'Falhas tratadas', 'Mensagens para conexão, chave e provedor.'],
    ['✓', 'Testes automatizados', 'Rotas principais verificadas sem custo de API.'],
    ['✓', 'Chave protegida', 'Credencial somente no ambiente do servidor.'],
    ['→', 'Próximos passos', 'Histórico, fontes, login e busca na web.'],
  ];
  items.forEach(([icon,title,body], i) => {
    const col = i % 2, row = Math.floor(i / 2), x = .7 + col * 6.18, y = 1.95 + row * 1.35;
    s.addShape(pptx.ShapeType.roundRect, { x, y, w: 5.75, h: 1.05, rectRadius: .06, fill: { color: C.white }, line: { color: C.line } });
    s.addShape(pptx.ShapeType.ellipse, { x: x + .24, y: y + .27, w: .46, h: .46, fill: { color: i === 5 ? C.purple : C.green }, line: { transparency: 100 } });
    s.addText(icon, { x: x + .24, y: y + .385, w: .46, h: .12, fontSize: 9, bold: true, color: C.white, align: 'center', margin: 0 });
    s.addText(title, { x: x + .88, y: y + .22, w: 2.7, h: .2, fontSize: 12, bold: true, color: C.navy, margin: 0 });
    s.addText(body, { x: x + .88, y: y + .56, w: 4.45, h: .19, fontSize: 9, color: C.text, margin: 0 });
  });
  s.addShape(pptx.ShapeType.roundRect, { x: .7, y: 6.18, w: 11.93, h: .54, rectRadius: .08, fill: { color: C.purple }, line: { transparency: 100 } });
  s.addText('Google Fake transforma uma pergunta simples em conhecimento acessível.', { x: 1, y: 6.35, w: 11.3, h: .18, fontSize: 13, bold: true, color: C.white, align: 'center', margin: 0 });
}

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const output = path.resolve(currentDir, '../docs/Apresentacao-Google-Fake.pptx');
await pptx.writeFile({ fileName: output });
console.log(`Apresentação criada em: ${output}`);
