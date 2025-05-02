'use client';
import { useEffect, useRef, useState } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { AiOutlinePlus } from 'react-icons/ai';
import { chat } from '../../../backend/api.js';

export default function ChatInput({ onButtonClick, chats, setChats, input, setInput, typeWriter, isTyping, isLoading, setIsLoading }) {
  const textareaRef = useRef(null);
  const [error, setError] = useState(null);
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    if (!isTyping && !isLoading) {
      textareaRef.current?.focus();
    }
  }, [isTyping, isLoading]);

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`; // محدود کردن حداکثر ارتفاع
  }, [input]);

  const handleSend = async () => {
    if (!input.trim() || isTyping || isLoading) return;

    const userMessage = { sender: 'user', text: input };
    setChats((prev) => [...prev, userMessage]);
    setInput('');
    setError(null);
    setIsLoading(true);

    try {
      const response = await chat(1, input, conversationId);
      console.log(response)
      const aiText = response?.message?.text || 'پاسخ دریافت نشد';
      const newConversationId = response?.message?.conversation_id;

      if (newConversationId) {
        setConversationId(newConversationId);
      }

      setIsLoading(false);
      typeWriter(aiText, (fullText) => {
        setChats((prev) => {
          const updatedChats = prev.filter((chat) => chat.sender !== 'ai-typing');
          return [...updatedChats, { sender: 'ai', text: fullText }];
        });
      });
    } catch (error) {
      setIsLoading(false);
      let errorMessage = 'خطا در ارتباط با هوش مصنوعی. لطفاً دوباره تلاش کنید.';
      if (error.message.includes('input too long')) {
        errorMessage = 'ورودی شما بسیار طولانی است. لطفاً با پشتیبانی تماس بگیرید.';
      } else if (error.message.includes('network')) {
        errorMessage = 'مشکل ارتباط با سرور. لطفاً اتصال اینترنت خود را بررسی کنید.';
      }
      setError(errorMessage);
      setChats((prev) => [...prev, { sender: 'ai', text: errorMessage }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
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
            title="ارسال"
            className={`text-gray-300 hover:text-white ${isTyping || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleClick}
            disabled={isTyping || isLoading}
          >
            <IoSend className="w-5 h-5 hover:text-[var(--primary-color)]" />
          </button>
        </div>
        <textarea
          ref={textareaRef}
          title="هر چه دل تنگت میخواهد از هوشیار بپرس :)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="هر چه دل تنگت میخواهد از هوشیار بپرس :)"
          className={`flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-400 text-right resize-none ${
            isTyping || isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          dir="rtl"
          rows={1}
          disabled={isTyping || isLoading}
          style={{ minHeight: '40px', maxHeight: '200px', width: '100%' }}
        />
        <div className="flex items-center space-x-reverse mx-2">
          <button
            type="button"
            title="دستیار صوتی"
            className={`me-2 text-gray-300 hover:text-[var(--primary-color)] bg-gray-700 p-2 rounded-lg ${
              isTyping || isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isTyping || isLoading}
          >
            <FaMicrophone className="w-5 h-5" />
          </button>
          <button
            type="button"
            title="بارگذاری فایل"
            className={`text-gray-300 hover:text-[var(--primary-color)] bg-gray-700 p-2 rounded-lg ${
              isTyping || isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
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