import React, { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';
import './App.css';

interface SearchResult {
  title: string;
  url: string;
  content: string;
  score?: number;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  results?: SearchResult[];
  loading?: boolean;
}

const HeroSection: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
  const phase1 = Math.min(scrollProgress / 0.25, 1);
  const phase2 = Math.min((scrollProgress - 0.2) / 0.3, 1);
  const phase3 = Math.min((scrollProgress - 0.45) / 0.35, 1);

  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: (i * 137.5) % 100,
    y: (i * 73.1) % 100,
    size: 1 + (i % 3),
    delay: (i * 0.1) % 3,
    opacity: 0.2 + (i % 5) * 0.1,
  }));

  return (
    <div className="hero-section">
      <div className="starfield" style={{ opacity: Math.max(0, 1 - scrollProgress * 2) }}>
        {stars.map(star => (
          <div key={star.id} className="star" style={{
            left: `${star.x}%`, top: `${star.y}%`,
            width: `${star.size}px`, height: `${star.size}px`,
            opacity: star.opacity, animationDelay: `${star.delay}s`,
          }} />
        ))}
      </div>
      <div className="nebula" style={{ opacity: phase1 * 0.6, transform: `scale(${0.8 + phase1 * 0.4})` }} />
      <div className="hero-content">
        <div className="hero-tag" style={{ opacity: Math.max(0.8 - scrollProgress * 2, 0) }}>
          {'// Exploring the universe of knowledge'}
        </div>
        <div className="phase-1" style={{ opacity: Math.min(phase1 * 2, 1), transform: `translateY(${(1 - phase1) * 40}px)` }}>
          <h1 className="hero-title">
            <span style={{ opacity: phase1, transform: `translateX(${(1 - phase1) * -60}px)`, display: 'block' }}>Search</span>
            <span style={{ opacity: phase1, transform: `translateX(${(1 - phase1) * 60}px)`, display: 'block' }}>Beyond</span>
            <span className="title-accent" style={{ opacity: phase1, transform: `translateY(${(1 - phase1) * 30}px)`, display: 'block' }}>Limits</span>
          </h1>
        </div>
        <div className="phase-2" style={{ opacity: phase2, transform: `scale(${0.5 + phase2 * 0.5})` }}>
          <div className="orbit-system">
            <div className="planet-core" style={{ transform: `rotate(${scrollProgress * 360}deg)` }}>
              <div className="planet-surface" />
              <div className="planet-ring" />
            </div>
            {[0, 1, 2].map((i) => (
              <div key={i} className="orbit-ring" style={{
                animationDuration: `${4 + i * 2}s`, animationDelay: `${i * 0.5}s`,
                width: `${120 + i * 60}px`, height: `${120 + i * 60}px`, opacity: phase2,
              }}>
                <div className="moon" style={{ background: ['#63B3ED', '#76E4F7', '#F6E05E'][i] }} />
              </div>
            ))}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <div key={i} className="data-stream" style={{
                transform: `rotate(${angle + scrollProgress * 180}deg)`,
                opacity: phase2 * 0.7, animationDelay: `${i * 0.2}s`,
              }} />
            ))}
          </div>
        </div>
        <div className="phase-3" style={{ opacity: phase3, transform: `translateY(${(1 - phase3) * 50}px)` }}>
          <div className="transition-text">
            <span className="mono">Ready to explore?</span>
            <div className="scroll-hint">
              <div className="scroll-arrow" />
              <span>Scroll to search</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-fade" style={{ opacity: Math.min((scrollProgress - 0.6) * 3, 1) }} />
    </div>
  );
};

const ChatSection: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([{
    id: '0', role: 'assistant',
    content: "Hello! I'm Zapli — your AI-powered search companion. Ask me anything and I'll search the web for real-time answers.",
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messages.length > 1) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const query = input.trim();
    setInput('');
    setIsLoading(true);
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: query };
    const loadingMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: '', loading: true };
    setMessages(prev => [...prev, userMsg, loadingMsg]);
    try {
      const response = await axios.post('https://api.tavily.com/search', {
        api_key: process.env.REACT_APP_TAVILY_API_KEY,
        query, search_depth: 'basic', max_results: 5, include_answer: true,
      }, { headers: { 'Content-Type': 'application/json' } });
      const data = response.data;
      setMessages(prev => [...prev.filter(m => !m.loading), {
        id: (Date.now() + 2).toString(), role: 'assistant',
        content: data.answer || 'Here are the results I found:',
        results: data.results || [],
      }]);
    } catch (error: any) {
      setMessages(prev => [...prev.filter(m => !m.loading), {
        id: (Date.now() + 3).toString(), role: 'assistant',
        content: `Search error: ${error.response?.data?.message || error.message}. Please check your API key.`,
      }]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="chat-section">
      <div className="chat-header">
        <div className="chat-logo"><div className="logo-orb" /><span className="logo-text">Zapli</span></div>
        <span className="chat-subtitle">AI-Powered Web Search</span>
      </div>
      <div className="messages-container">
        {messages.map((msg) => (
          <div key={msg.id} className={`message message-${msg.role}`}>
            {msg.role === 'assistant' && <div className="assistant-avatar"><div className="avatar-orb" /></div>}
            <div className="message-content">
              {msg.loading ? (
                <div className="loading-dots"><span /><span /><span /></div>
              ) : (
                <>
                  <p className="message-text">{msg.content}</p>
                  {msg.results && msg.results.length > 0 && (
                    <div className="search-results">
                      <div className="results-label"><span className="mono">{'// '}{msg.results.length} sources found</span></div>
                      {msg.results.map((result, i) => (
                        <a key={i} href={result.url} target="_blank" rel="noopener noreferrer" className="result-card">
                          <div className="result-num">{i + 1}</div>
                          <div className="result-body">
                            <div className="result-title">{result.title}</div>
                            <div className="result-url">{(() => { try { return new URL(result.url).hostname; } catch { return result.url; } })()}</div>
                            <div className="result-snippet">{result.content.slice(0, 150)}...</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="chat-input-form">
        <div className="input-wrapper">
          <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)}
            placeholder="Search anything..." className="chat-input" disabled={isLoading} />
          <button type="submit" className={`send-button ${isLoading ? 'loading' : ''}`} disabled={isLoading || !input.trim()}>
            {isLoading ? <div className="spinner" /> : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>
        <p className="input-hint">Powered by Tavily Search API · Real-time web results</p>
      </form>
    </div>
  );
};

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;
    const progress = Math.min(window.scrollY / heroEl.offsetHeight, 1);
    setScrollProgress(progress);
    setShowChat(progress > 0.85);
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="app">
      <div ref={heroRef} className="hero-wrapper">
        <div className="hero-sticky"><HeroSection scrollProgress={scrollProgress} /></div>
      </div>
      <div className={`chat-wrapper ${showChat ? 'visible' : ''}`}><ChatSection /></div>
    </div>
  );
}

export default App;
