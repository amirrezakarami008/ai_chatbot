'use client';
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import ChatInput from "./components/ChatInput/ChatInput";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {/* md:static */}
      <div
        className={`
          fixed    top-0 ${isOpen ? 'right-0' : '-right-64'} h-full w-64 bg-gray-800 text-white transition-all duration-300 z-50
          md:left-0 md:right-auto md:translate-x-0
        `}
      >
        <div className="p-4 text-lg font-bold border-b border-gray-700 flex justify-between items-center">
          <span>گفتگو با هوش مصنوعی</span>
          <button 
            className="md:hidden text-white"
            onClick={toggleSidebar}
          >
            <X size={24} />
          </button>
        </div>
        
        <ul className="p-4 space-y-4">
          <li
            className="relative cursor-pointer flex justify-between items-center hover:text-gray-300"
            onClick={toggleDropdown}
          >
            <span>انتخاب هوش مصنوعی</span>
            {dropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </li>

          {dropdownOpen && (
            <ul className="mt-1 ml-4 space-y-2 bg-gray-700 rounded-md py-2 px-2 z-50">
              <li className="px-2 py-1 hover:bg-[var(--primary-color)] rounded">chatgpt</li>
              <li className="px-2 py-1 hover:bg-[var(--primary-color)] rounded">bing</li>
              <li className="px-2 py-1 hover:bg-[var(--primary-color)] rounded">gemini</li>
            </ul>
          )}

          <li className="hover:bg-[var(--primary-color)] p-1 rounded cursor-pointer">درباره ما</li>
          <li className="hover:bg-[var(--primary-color)] p-1 rounded cursor-pointer">تماس با ما</li>
          <li className="hover:bg-[var(--primary-color)] p-1 rounded cursor-pointer">بلاگ</li>
        </ul>
          <div className="border-t p-4 text-lg  border-gray-700 font-bold">تاریخچه</div>
          <div className="px-4 my-2 py-2 cursor-pointer rounded hover:bg-[var(--primary-color)] mx-3">
            <span className="">یه عکس سگ برام بساز</span>
          </div>
          <div className="px-4 my-2 py-2 cursor-pointer rounded hover:bg-[var(--primary-color)] mx-3">
            <span className="">آموزشی</span>
          </div>
          <div className="px-4 my-2 py-2 cursor-pointer rounded hover:bg-[var(--primary-color)] mx-3">
            <span className="">نحوه زندکی کردن درست</span>
          </div>
          <div className="px-4 my-2 py-2 cursor-pointer rounded hover:bg-[var(--primary-color)] mx-3">
            <span className="">چرا باید غذا بخوریم</span>
          </div>
          <div className="px-4 my-2 py-2 cursor-pointer rounded hover:bg-[var(--primary-color)] mx-3">
            <span className="">آموزش جاوا اسکریپت</span>
          </div>
          <div className="px-4 my-2 py-2 cursor-pointer rounded hover:bg-[var(--primary-color)] mx-3">
            <span className="">حقوق برنامه نویسی</span>
          </div>
          <div className="px-4 my-2 py-2 cursor-pointer rounded hover:bg-[var(--primary-color)] mx-3">
            <span className="">هوش مصنوعی چیست</span>
          </div>
      </div>
      {/* Main Content */}
        <div className="flex-1  bg-gray-900 text-center h-full">
          <div className="md:hidden p-4 shadow flex justify-between items-center">
            <button onClick={toggleSidebar}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="mt-[100px] md:mt-[250px]">
            <h1 className="text-2xl font-bold mb-4">در چه <span className="text-[var(--primary-color)]">زمینه</span> ای می توانم <span className="text-[var(--primary-color)]">کمک</span> کنم؟</h1>
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <ChatInput />
          </div>
          </div>
        </div>
    </div>
  );
}


