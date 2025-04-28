import { useState } from 'react';

export default function Accordion({title , text}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-[90%] mx-auto">
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {/* Title Section */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center px-4 py-3 bg-gray-700 hover:bg-gray-600 cursor-pointer transition"
        >
          <span className="text-gray-200 font-medium">
            {title}
          </span>
          <svg
            className={`w-5 h-5 transform transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Content Section */}
        {isOpen && (
          <div className="px-4 py-3 text-gray-200 bg-gray-700">
            {text}
          </div>
        )}
      </div>
    </div>
  );
}
