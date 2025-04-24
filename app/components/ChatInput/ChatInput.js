"use client";

import { useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
export default function ChatInput() {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      console.log("پیام ارسال شد:", input);
      setInput("");
    }
  };

  return (
    <div className="fixed bottom-4 w-full max-w-3xl mx-auto px-4">
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-gray-800 text-white rounded-xl p-3 shadow-lg border border-gray-700"
      >
        <div className="flex items-center space-x-3 me-3 space-x-reverse">
          <button type="submit" className="text-gray-300 cursor-pointer  hover:text-white">
            <IoSend className="w-5 h-5 hover:text-[var(--primary-color)]" />
          </button>
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="بابا کرم چطور میتونه به شما کمک کنه؟"
          className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-400 text-right"
          dir="rtl"
        />
        <div className="flex items-center space-x-2 space-x-reverse mx-2">
          <button
            type="button"
            className="text-gray-300 cursor-pointer hover:text-[var(--primary-color)] bg-gray-700 p-2 rounded-lg"
          >
            <FaMicrophone className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="text-gray-300 ms-2 cursor-pointer hover:text-[var(--primary-color)] bg-gray-700 p-2 rounded-lg"
          >
            <AiOutlinePlus className="w-5 h-5" />
          </button>
        </div>

        
      </form>
    </div>
  );
}