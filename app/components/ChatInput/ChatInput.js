"use client";

import { useEffect, useRef } from "react";
import { FaMicrophone } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";

export default function ChatInput({ onButtonClick, input, setInput, messages, setMessages }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      console.log("پیام ارسال شد:", input);
      setMessages([...messages, input]);
      setInput("");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-2 bg-gray-900 border-t border-gray-700">
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-gray-800 text-white rounded-xl p-3 shadow-lg border border-gray-700 max-w-3xl mx-auto"
      >
        <div className="flex items-center space-x-3 me-3 space-x-reverse">
          <button onClick={onButtonClick} type="submit" className="text-gray-300 hover:text-white">
            <IoSend className="w-5 h-5 hover:text-[var(--primary-color)]" />
          </button>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder=" کرم چطور به شما کمک کنه؟"
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
    </div>
  );
}
