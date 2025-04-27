'use client';
import { useEffect, useRef, useState } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { AiOutlinePlus } from 'react-icons/ai';
import { chat } from '../../../backend/api.js';

export default function ChatInput({ onButtonClick, chats, setChats, input, setInput }) {
  const inputRef = useRef(null);
  const [error, setError] = useState(null);
  const [conversationId, setConversationId] = useState(null); // مدیریت conversation_id با state

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // درخواست به API
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setChats((prev) => [...prev, userMessage]); // اضافه کردن پیام کاربر به chats
    setInput('');
    setError(null);

    try {
      console.log('ارسال درخواست به API با ورودی:', { input, conversationId }); // لاگ برای دیباگ
      const response = await chat(1, input, conversationId); // فراخوانی API
      console.log('پاسخ API:', response); // لاگ پاسخ برای دیباگ

      // بررسی ساختار پاسخ API
      const aiText = response?.message?.text || 'پاسخ دریافت نشد';
      const newConversationId = response?.message?.conversation_id;

      if (newConversationId) {
        setConversationId(newConversationId); // ذخیره conversation_id برای درخواست‌های بعدی
        console.log('Conversation ID جدید:', newConversationId);
      } else {
        console.warn('Conversation ID در پاسخ API یافت نشد.');
      }

      const aiMessage = { sender: 'ai', text: aiText };
      setChats((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('خطا در دریافت پاسخ:', error);
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
        className="flex items-center bg-gray-800 text-white rounded-xl p-3 shadow-lg border border-gray-700 max-w-3xl mx-auto"
      >
        <div className="flex items-center space-x-3 me-3 space-x-reverse">
          <button
            type="submit"
            className="text-gray-300 hover:text-white"
            onClick={handleClick}
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
          className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-400 text-right"
          dir="rtl"
        />
        <div className="flex items-center space-x-reverse mx-2">
          <button
            type="button"
            className="me-2 text-gray-300 hover:text-[var(--primary-color)] bg-gray-700 p-2 rounded-lg"
          >
            <FaMicrophone className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="text-gray-300 hover:text-[var(--primary-color)] bg-gray-700 p-2 rounded-lg"
          >
            <AiOutlinePlus className="w-5 h-5" />
          </button>
        </div>
      </form>
      {error && (
        <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
      )}
    </div>
  );
}