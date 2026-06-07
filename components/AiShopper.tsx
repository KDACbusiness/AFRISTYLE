
import React, { useState, useEffect, useRef } from 'react';
import { getShoppingAdvice } from '../geminiService';
import { Product } from '../types';

interface AiShopperProps {
  products: Product[];
}

const AiShopper: React.FC<AiShopperProps> = ({ products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: 'Bonjour ! Je suis votre assistant personnel AfriStyle. Que recherchez-vous aujourd\'hui ?' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!query.trim()) return;
    
    const userMsg = query;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setQuery('');
    setIsLoading(true);

    const advice = await getShoppingAdvice(userMsg, products);
    
    setMessages(prev => [...prev, { role: 'ai', text: advice || 'Je n\'ai pas trouvé de réponse.' }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen ? (
        <div className="bg-white w-80 sm:w-96 rounded-2xl shadow-2xl border flex flex-col overflow-hidden animate-scale-in">
          <div className="bg-orange-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-white rounded-full p-1 text-orange-600">
                <i className="fa-solid fa-robot"></i>
              </div>
              <span className="font-bold">Assistant Personnel</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-orange-700 p-1 rounded">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-orange-500 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 shadow-sm border rounded-bl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm border flex gap-1">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t bg-white flex gap-2">
            <input 
              type="text" 
              placeholder="Ex: Je cherche une robe pour un mariage..."
              className="flex-grow text-sm border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 transition disabled:opacity-50"
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-orange-600 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform relative group"
        >
          <i className="fa-solid fa-robot text-2xl"></i>
          <span className="absolute -top-12 right-0 bg-white text-gray-800 text-xs font-bold py-1 px-3 rounded shadow border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Besoin d'un conseil ?
          </span>
        </button>
      )}
      <style>{`
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AiShopper;
