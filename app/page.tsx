'use client';
import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();
      const reply = data.reply || '⚠️ No response received from the agent.';

      setMessages([...updatedMessages, { role: 'assistant', content: reply }]);
    } catch (error) {
      console.error('❌ Error talking to API:', error);
      setMessages([...updatedMessages, {
        role: 'assistant',
        content: '❌ Something went wrong. Please try again later.',
      }]);
    }

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
        {loading && <div className="italic text-gray-500">Thinking...</div>}
      </div>

      <div className="flex gap-2">
        <input
          className="border p-2 flex-1 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe the business..."
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </main>
  );
}
