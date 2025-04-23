"use client";

import { useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FaLightbulb } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";

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
        {/* ورودی متنی */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="چطور می‌تونه Grok کمک کنه؟"
          className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-400 text-right"
          dir="rtl"
        />

        {/* دکمه‌ها */}
        <div className="flex items-center space-x-2 space-x-reverse mx-2">
          {/* دکمه DeepSearch */}
          <button
            type="button"
            className="flex items-center space-x-1 space-x-reverse text-gray-300 hover:text-white bg-gray-700 px-2 py-1 rounded-lg"
          >
            <IoIosSearch className="w-5 h-5" />
            <span className="text-sm">DeepSearch</span>
          </button>

          {/* دکمه Think */}
          <button
            type="button"
            className="text-gray-300 hover:text-white bg-gray-700 p-2 rounded-lg"
          >
            <FaLightbulb className="w-5 h-5" />
          </button>

          {/* دکمه میکروفون */}
          <button
            type="button"
            className="text-gray-300 hover:text-white bg-gray-700 p-2 rounded-lg"
          >
            <FaMicrophone className="w-5 h-5" />
          </button>
        </div>

        {/* برچسب Grok 3 و دکمه ارسال */}
        <div className="flex items-center space-x-1 space-x-reverse">
          <button type="submit" className="text-gray-300 hover:text-white">
            <IoIosArrowUp className="w-5 h-5" />
          </button>
          <span className="text-gray-400 text-sm">Grok 3</span>
        </div>
      </form>
    </div>
  );
}