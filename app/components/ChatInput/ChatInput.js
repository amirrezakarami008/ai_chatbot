'use client';
import { useEffect, useRef, useState } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { AiOutlinePlus } from 'react-icons/ai';
import { chat } from '../../../backend/api.js';

export default function ChatInput({ onButtonClick, chats, setChats, input, setInput, typeWriter, isTyping, isLoading, setIsLoading }) {
  const inputRef = useRef(null);
  const [error, setError] = useState(null);
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    if (!isTyping && !isLoading) {
      inputRef.current?.focus();
    }
  }, [isTyping, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isTyping || isLoading) return;

    const userMessage = { sender: 'user', text: input };
    setChats((prev) => [...prev, userMessage]);
    setInput('');
    setError(null);
    setIsLoading(true);

    try {
      const response = await chat(1, input, conversationId);
      const aiText = response?.message?.text || 'پاسخ دریافت نشد';
      const newConversationId = response?.message?.conversation_id;

      if (newConversationId) {
        setConversationId(newConversationId);
      }

      setIsLoading(false);
      typeWriter(aiText, (fullText) => {
        setChats((prev) => {
          const updatedChats = prev.filter((chat) => chat.sender !== "ai-typing");
          return [...updatedChats, { sender: 'ai', text: fullText }];
        });
      });
    } catch (error) {
      setIsLoading(false);
      setError('خطا در ارتباط با هوش مصنوعی. لطفاً دوباره تلاش کنید.');
      const errorMessage = { sender: 'ai', text: 'خطا در دریافت پاسخ از هوش مصنوعی' };
      setChats((prev) => [...prev, errorMessage]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  const handleClick = () => {
    onButtonClick();
    handleSend();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-2 bg-gray-900 border-t border-gray-700">
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-gray-800 text-white rounded-xl p-3 shadow-lg border border-gray-700 max-w-3xl mx-auto relative"
      >
        <div className="flex items-center space-x-3 me-3 space-x-reverse">
          <button
            type="submit"
            className={`text-gray-300 hover:text-white ${isTyping || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleClick}
            disabled={isTyping || isLoading}
          >
            <IoSend className="w-5 h-5 hover:text-[var(--primary-color)]" />
          </button>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="کرم چطور به شما کمک کنه؟"
          className={`flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-400 text-right ${isTyping || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          dir="rtl"
          disabled={isTyping || isLoading}
        />
        <div className="flex items-center space-x-reverse mx-2">
          <button
            type="button"
            className={`me-2 text-gray-300 hover:text-[var(--primary-color)] bg-gray-700 p-2 rounded-lg ${isTyping || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isTyping || isLoading}
          >
            <FaMicrophone className="w-5 h-5" />
          </button>
          <button
            type="button"
            className={`text-gray-300 hover:text-[var(--primary-color)] bg-gray-700 p-2 rounded-lg ${isTyping || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isTyping || isLoading}
          >
            <AiOutlinePlus className="w-5 h-5" />
          </button>
        </div>
        {isLoading && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <div className="loader border-t-2 border-b-2 border-[var(--primary-color)] w-5 h-5 rounded-full animate-spin"></div>
          </div>
        )}
      </form>
      {error && (
        <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
      )}
      <style jsx>{`
        .loader {
          border-right: 2px solid transparent;
          border-left: 2px solid transparent;
        }
      `}</style>
    </div>
  );
}