"use client";

import { useEffect, useRef , useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { chat, get_conversations, get_messages, signup } from '../../../backend/api.js';

export default function ChatInput({ onButtonClick, chats , setChats , input, setInput, messages, setMessages }) {
  const inputRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    inputRef.current?.focus();
  }, []);

  if (!isClient) return null; // هیچ چیزی قبل از لود کامل کلاینت رندر نکن

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      console.log("پیام ارسال شد:", input);
      setMessages([...messages, input]);
      setInput("");
    }
  };
  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { sender: 'user', text: input };
    
    try {
      const response = await chat(1 , input);
      const aiMessage = { sender: 'ai', text: response.text };
      
      setChats(prev => [...prev, userMessage, aiMessage]);
      setInput("");
    } catch (error) {
      console.error("خطا در دریافت پاسخ:", error);
    }
  };

  const handleClick = () => {
    onButtonClick("");
    handleSend();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-2 bg-gray-900 border-t border-gray-700">
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-gray-800 text-white rounded-xl p-3 shadow-lg border border-gray-700 max-w-3xl mx-auto"
      >
        <div className="flex items-center space-x-3 me-3 space-x-reverse">
          <button title="ارسال" onClick={handleClick} type="submit" className="cursor-pointer text-gray-300 hover:text-white">
            <IoSend className="w-5 h-5 text-[var(--primary-color)]" />
          </button>
        </div>
        <input
          ref={inputRef}
          title="هر چه دل تنگت میخواهد از هوشیار بپرس :)"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="هر چه دل تنگت میخواهد از هوشیار بپرس :)"
          className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-400 text-right"
          dir="rtl"
        />
        <div className="flex items-center space-x-reverse mx-2">
          <button
            type="button"
            title="دستیار صوتی"
            className="me-2 text-gray-300 border cursor-pointer border-[var(--primary-color)] bg-gray-700 p-2 rounded-lg"
          >
            <FaMicrophone className="w-5 h-5" />
          </button>
          <button
            type="button"
            title="بارگذاری فایل"
            className="text-gray-300 border cursor-pointer border-[var(--primary-color)] bg-gray-700 p-2 rounded-lg"
          >
            <AiOutlinePlus className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
