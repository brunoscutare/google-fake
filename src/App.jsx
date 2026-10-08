import { useEffect, useRef, useState } from 'react';
import { Clock3, Grid3X3, RotateCcw, Search, Sparkles, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const SUGGESTIONS = ['Explique inteligência artificial de forma simples', 'Por que o céu é azul?', 'Como criar uma rotina de estudos?'];

function Logo({ compact = false }) {
  return <div className={`logo ${compact ? 'logo--compact' : ''}`} aria-label="Google Fake">
    <span className="blue">G</span><span className="red">o</span><span className="yellow">o</span><span className="blue">g</span><span className="green">l</span><span className="red">e</span><span className="fake">fake</span>
  </div>;
}

export default function App() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === '/' && document.activeElement?.tagName !== 'INPUT') { event.preventDefault(); inputRef.current?.focus(); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  async function ask(question = query) {
    const normalized = question.trim();
    if (!normalized || loading) return;
    setQuery(normalized); setLoading(true); setError(''); setResult(null);
    try {
      const response = await fetch('/api/ask', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: normalized }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Não foi possível obter uma resposta.');
      setResult(data);
    } catch (requestError) {
      setError(requestError.message === 'Failed to fetch' ? 'Não foi possível conectar à API. Confira se o backend está rodando.' : requestError.message);
    } finally { setLoading(false); }
  }

  function reset() {
    setQuery(''); setResult(null); setError('');
    window.requestAnimationFrame(() => inputRef.current?.focus());
  }

  const hasResponseState = result || loading || error;
  return <div className={`app-shell ${hasResponseState ? 'app-shell--results' : ''}`}>
    <header className="topbar">
      {hasResponseState ? <button className="brand-button" onClick={reset} aria-label="Voltar ao início"><Logo compact /></button> : <div />}
      <nav className="top-links" aria-label="Links principais">
        <a href="https://gemini.google.com" target="_blank" rel="noreferrer">Gemini</a>
        <a href="https://aistudio.google.com" target="_blank" rel="noreferrer">AI Studio</a>
        <button className="icon-button" aria-label="Aplicativos"><Grid3X3 size={19} /></button><span className="avatar">GF</span>
      </nav>
    </header>

    <main className={hasResponseState ? 'main main--result' : 'main'}>
      {!hasResponseState && <section className="hero"><Logo /><p>Seu buscador inteligente com Gemini</p></section>}
      <section className="search-area" aria-label="Busca inteligente">
        <form className="search-box" onSubmit={(event) => { event.preventDefault(); ask(); }}>
          <Search className="search-icon" size={20} />
          <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Pesquise qualquer coisa" maxLength={1000} aria-label="Sua pesquisa" autoFocus />
          {query && !loading && <button type="button" className="clear-button" onClick={() => setQuery('')} aria-label="Limpar"><X size={20} /></button>}
          <span className="search-divider" /><button className="gemini-button" disabled={!query.trim() || loading} aria-label="Pesquisar com Gemini"><Sparkles size={19} /></button>
        </form>
        {!hasResponseState && <div className="search-actions">
          <button disabled={!query.trim()} onClick={() => ask()}>Pesquisa Google Fake</button>
          <button onClick={() => ask(SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)])}>Estou com sorte</button>
        </div>}
      </section>

      {!hasResponseState && <section className="suggestions"><span>Experimente:</span>{SUGGESTIONS.map((suggestion) => <button key={suggestion} onClick={() => ask(suggestion)}>{suggestion}</button>)}</section>}

      {loading && <section className="results-panel" aria-live="polite"><div className="result-meta">Pesquisando com inteligência artificial...</div><div className="ai-overview loading-card"><div className="answer-heading"><span className="answer-icon"><Sparkles size={18} /></span><strong>Visão geral criada por IA</strong></div><div className="skeleton skeleton--wide" /><div className="skeleton" /><div className="skeleton skeleton--short" /></div></section>}
      {error && <section className="results-panel" role="alert"><div className="ai-overview error-card"><div><strong>Não foi possível concluir esta pesquisa</strong><p>{error}</p></div><button onClick={() => ask()}><RotateCcw size={16} /> Tentar novamente</button></div></section>}
      {result && <section className="results-panel" aria-live="polite">
        <div className="result-meta">Resposta encontrada em {result.processingTimeMs} ms</div>
        <article className="ai-overview"><div className="answer-heading"><span className="answer-icon"><Sparkles size={18} /></span><div><strong>Visão geral criada por IA</strong><small>Resposta gerada pelo Gemini</small></div></div><div className="markdown"><ReactMarkdown>{result.answer}</ReactMarkdown></div><footer className="answer-footer"><span><Clock3 size={14} /> Google Fake pode cometer erros</span><button onClick={reset}><RotateCcw size={15} /> Nova pesquisa</button></footer></article>
      </section>}
    </main>
    {!hasResponseState && <footer className="page-footer"><span>Brasil</span><div><a href="#sobre">Sobre</a><a href="#privacidade">Privacidade</a><a href="#termos">Termos</a></div></footer>}
  </div>;
}
