'use client';
import { useEffect, useRef, useState } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { IoSend, IoClose } from 'react-icons/io5';
import { AiOutlinePlus } from 'react-icons/ai';
import { chat } from '../../../backend/api.js';
import Image from 'next/image';

export default function ChatInput({
  chats,
  setChats,
  input,
  setInput,
  typeWriter,
  isTyping,
  stopTyping,
  isLoading,
  setIsLoading,
  selectedModel,
  conversationId,
  setConversationId,
}) {
  const textareaRef = useRef(null);
  const [error, setError] = useState(null);
  const [isStopMode, setIsStopMode] = useState(false);

  useEffect(() => {
    if (!isTyping && !isLoading) {
      textareaRef.current?.focus();
      setIsStopMode(false);
    }
  }, [isTyping, isLoading]);

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
  }, [input]);

  const handleSend = async () => {
    if (!input.trim() || isTyping || isLoading) return;

    const userMessage = { sender: 'user', text: input, model: selectedModel, time: new Date().toISOString() };
    setChats((prev) => [...prev, userMessage]);
    setInput('');
    setError(null);
    setIsLoading(true);
    setIsStopMode(true);

    try {
      const response = await chat(selectedModel, input, conversationId);
      console.log('Raw response from chat API:', JSON.stringify(response, null, 2));
      if (response === 'CONTENT_POLICY') {
        alert('کص نگو');
      }
      if (response?.error) {
        throw new Error(response.error || 'خطای ناشناخته از سرور');
      }

      if (!response?.message) {
        throw new Error('پاسخ سرور ناقص است: message وجود ندارد');
      }

      const newConversationId = response?.message?.conversation_id;
      if (newConversationId && newConversationId !== conversationId) {
        setConversationId(newConversationId);
      }

      setIsLoading(false);

      let responseTime = response?.message?.time;
      if (responseTime && typeof responseTime === 'string' && !isNaN(responseTime)) {
        responseTime = new Date(parseInt(responseTime) * 1000).toISOString();
      } else if (responseTime) {
        console.warn('Unexpected time format from backend:', responseTime);
        responseTime = new Date().toISOString();
      } else {
        responseTime = new Date().toISOString();
      }

      if (selectedModel === 3) {
        const imageUrl = response?.message?.image;
        const responseText = response?.message?.text || null;
        const errorMessage = responseText || null;
        console.log('Image URL:', imageUrl, 'Response Text:', responseText, 'Error Message:', errorMessage);

        if (!imageUrl) {
          const displayError = errorMessage || 'لینک تصویر دریافت نشد';
          throw new Error(displayError);
        }

        setChats((prev) => {
          const updatedChats = prev.filter((chat) => chat.sender !== 'ai-typing');
          return [
            ...updatedChats,
            { sender: 'ai', image: imageUrl, text: responseText || errorMessage, model: selectedModel, time: responseTime },
          ];
        });
      } else {
        const aiText = response?.message?.text || 'پاسخ دریافت نشد';
        typeWriter(aiText, (fullText) => {
          setChats((prev) => {
            const updatedChats = prev.filter((chat) => chat.sender !== 'ai-typing');
            return [...updatedChats, { sender: 'ai', text: fullText, model: selectedModel, time: responseTime }];
          });
        });
      }
    } catch (error) {
      setIsLoading(false);
      setIsStopMode(false);
      if (error.message === 'CONTENT_POLICY') {
        alert('پیام شما نامناسب هست');
      } else if (error.message.includes('network')) {
        setError('مشکل ارتباط با سرور. لطفاً اتصال اینترنت خود را بررسی کنید.');
      } else {
        setError(error.message);
        setChats((prev) => [
          ...prev,
          { sender: 'ai', text: error.message, model: selectedModel, time: new Date().toISOString() },
        ]);
      }
    }
  };

  const handleStop = () => {
    stopTyping();
    setIsStopMode(false);
    setChats((prev) => prev.filter((chat) => chat.sender !== 'ai-typing'));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isStopMode) {
      handleStop();
    } else {
      handleSend();
    }
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
            title={isStopMode ? 'توقف' : 'ارسال'}
            className={`text-gray-300 hover:text-white ${isTyping || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={isStopMode ? handleStop : handleSend}
            disabled={isLoading}
          >
            {isStopMode ? (
              <IoClose size={'20px'} className="w-5 h-5 text-black hover:text-[var(--primary-color)] bg-white rounded-full" />
            ) : (
              <IoSend className="w-5 h-5 hover:text-[var(--primary-color)]" />
            )}
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
          {/* دکمه‌های غیرفعال‌شده */}
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