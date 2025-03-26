'use client';
import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [...messages, userMessage] }),
    });
    const data = await res.json();
    setMessages([...messages, userMessage, { role: 'assistant', content: data.reply }]);
    setLoading(false);
  };

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Meta-Agent Builder</h1>
      <div className="space-y-2 mb-4">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-blue-600' : 'text-green-700'}>
            <strong>{m.role}:</strong> {m.content}
          </div>
        ))}
        {loading && <div className="italic">Thinking...</div>}
      </div>
      <div className="flex gap-2">
        <input
          className="border p-2 flex-1 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe the business..."
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={sendMessage}>
          Send
        </button>
      </div>
    </main>
  );
}
