'use client';

import { useState, useEffect, useRef } from 'react';
import './globals.css';
import Link from 'next/link';
import {
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  UsersRound,
  Headset,
  LogOut,
  History,
  UserRound,
  Share,
  Pencil,
} from 'lucide-react';
import ChatInput from './components/ChatInput/ChatInput';
import { chat, get_conversations, get_messages } from '../backend/api.js';
import { encryption } from '../backend/encryption.js';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import Image from 'next/image';
import logo from '../public/images/logo.png';
import Avatar from './components/Avatar/Avatar.jsx';
import { toast } from 'react-toastify';

const Notification = ({ message, onClose }) => {
  return (
    <div className="fixed top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg shadow-lg flex items-center justify-between max-w-sm z-50 animate-slide-in">
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
        <X size={20} />
      </button>
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

const modelIcons = {
  1: (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
      <path d="M45.403,25.562c-0.506-1.89-1.518-3.553-2.906-4.862c1.134-2.665,0.963-5.724-0.487-8.237	c-1.391-2.408-3.636-4.131-6.322-4.851c-1.891-0.506-3.839-0.462-5.669,0.088C28.276,5.382,25.562,4,22.647,4	c-4.906,0-9.021,3.416-10.116,7.991c-0.01,0.001-0.019-0.003-0.029-0.002c-2.902,0.36-5.404,2.019-6.865,4.549	c-1.391,2.408-1.76,5.214-1.04,7.9c0.507,1.891,1.519,3.556,2.909,4.865c-1.134,2.666-0.97,5.714,0.484,8.234	c1.391,2.408,3.636,4.131,6.322,4.851c0.896,0.24,1.807,0.359,2.711,0.359c1.003,0,1.995-0.161,2.957-0.45	C21.722,44.619,24.425,46,27.353,46c4.911,0,9.028-3.422,10.12-8.003c2.88-0.35,5.431-2.006,6.891-4.535	C45.754,31.054,46.123,28.248,45.403,25.562z M35.17,9.543c2.171,0.581,3.984,1.974,5.107,3.919c1.049,1.817,1.243,4,0.569,5.967	c-0.099-0.062-0.193-0.131-0.294-0.19l-9.169-5.294c-0.312-0.179-0.698-0.177-1.01,0.006l-10.198,6.041l-0.052-4.607l8.663-5.001	C30.733,9.26,33,8.963,35.17,9.543z M29.737,22.195l0.062,5.504l-4.736,2.805l-4.799-2.699l-0.062-5.504l4.736-2.805L29.737,22.195z M14.235,14.412C14.235,9.773,18.009,6,22.647,6c2.109,0,4.092,0.916,5.458,2.488C28,8.544,27.891,8.591,27.787,8.651l-9.17,5.294	c-0.312,0.181-0.504,0.517-0.5,0.877l0.133,11.851l-4.015-2.258V14.412z M6.528,23.921c-0.581-2.17-0.282-4.438,0.841-6.383	c1.06-1.836,2.823-3.074,4.884-3.474c-0.004,0.116-0.018,0.23-0.018,0.348V25c0,0.361,0.195,0.694,0.51,0.872l10.329,5.81	L19.11,34.03l-8.662-5.002C8.502,27.905,7.11,26.092,6.528,23.921z M14.83,40.457c-2.171-0.581-3.984-1.974-5.107-3.919	c-1.053-1.824-1.249-4.001-0.573-5.97c0.101,0.063,0.196,0.133,0.299,0.193l9.169,5.294c0.154,0.089,0.327,0.134,0.5,0.134	c0.177,0,0.353-0.047,0.51-0.14l10.198-6.041l0.052,4.607l-8.663,5.001C19.269,40.741,17.001,41.04,14.83,40.457z M35.765,35.588	c0,4.639-3.773,8.412-8.412,8.412c-2.119,0-4.094-0.919-5.459-2.494c0.105-0.056,0.216-0.098,0.32-0.158l9.17-5.294	c0.312-0.181,0.504-0.517,0.5-0.877L31.75,23.327l4.015,2.258V35.588z M42.631,32.462c-1.056,1.83-2.84,3.086-4.884,3.483	c0.004-0.120,0.018-0.237,0.018-0.357V25c0-0.361-0.195-0.694-0.51-0.872l-10.329-5.81l3.964-2.348l8.662,5.002	c1.946,1.123,3.338,2.937,3.92,5.107C44.053,28.249,43.754,30.517,42.631,32.462z"></path>
    </svg>
  ),
  2: (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
      <path d="M45.403,25.562c-0.506-1.89-1.518-3.553-2.906-4.862c1.134-2.665,0.963-5.724-0.487-8.237	c-1.391-2.408-3.636-4.131-6.322-4.851c-1.891-0.506-3.839-0.462-5.669,0.088C28.276,5.382,25.562,4,22.647,4	c-4.906,0-9.021,3.416-10.116,7.991c-0.01,0.001-0.019-0.003-0.029-0.002c-2.902,0.36-5.404,2.019-6.865,4.549	c-1.391,2.408-1.76,5.214-1.04,7.9c0.507,1.891,1.519,3.556,2.909,4.865c-1.134,2.666-0.97,5.714,0.484,8.234	c1.391,2.408,3.636,4.131,6.322,4.851c0.896,0.24,1.807,0.359,2.711,0.359c1.003,0,1.995-0.161,2.957-0.45	C21.722,44.619,24.425,46,27.353,46c4.911,0,9.028-3.422,10.12-8.003c2.88-0.35,5.431-2.006,6.891-4.535	C45.754,31.054,46.123,28.248,45.403,25.562z M35.17,9.543c2.171,0.581,3.984,1.974,5.107,3.919c1.049,1.817,1.243,4,0.569,5.967	c-0.099-0.062-0.193-0.131-0.294-0.19l-9.169-5.294c-0.312-0.179-0.698-0.177-1.01,0.006l-10.198,6.041l-0.052-4.607l8.663-5.001	C30.733,9.26,33,8.963,35.17,9.543z M29.737,22.195l0.062,5.504l-4.736,2.805l-4.799-2.699l-0.062-5.504l4.736-2.805L29.737,22.195z M14.235,14.412C14.235,9.773,18.009,6,22.647,6c2.109,0,4.092,0.916,5.458,2.488C28,8.544,27.891,8.591,27.787,8.651l-9.17,5.294	c-0.312,0.181-0.504,0.517-0.5,0.877l0.133,11.851l-4.015-2.258V14.412z M6.528,23.921c-0.581-2.17-0.282-4.438,0.841-6.383	c1.06-1.836,2.823-3.074,4.884-3.474c-0.004,0.116-0.018,0.23-0.018,0.348V25c0,0.361,0.195,0.694,0.51,0.872l10.329,5.81	L19.11,34.03l-8.662-5.002C8.502,27.905,7.11,26.092,6.528,23.921z M14.83,40.457c-2.171-0.581-3.984-1.974-5.107-3.919	c-1.053-1.824-1.249-4.001-0.573-5.97c0.101,0.063,0.196,0.133,0.299,0.193l9.169,5.294c0.154,0.089,0.327,0.134,0.5,0.134	c0.177,0,0.353-0.047,0.51-0.14l10.198-6.041l0.052,4.607l-8.663,5.001C19.269,40.741,17.001,41.04,14.83,40.457z M35.765,35.588	c0,4.639-3.773,8.412-8.412,8.412c-2.119,0-4.094-0.919-5.459-2.494c0.105-0.056,0.216-0.098,0.32-0.158l9.17-5.294	c0.312-0.181,0.504-0.517,0.5-0.877L31.75,23.327l4.015,2.258V35.588z M42.631,32.462c-1.056,1.83-2.84,3.086-4.884,3.483	c0.004-0.120,0.018-0.237,0.018-0.357V25c0-0.361-0.195-0.694-0.51-0.872l-10.329-5.81l3.964-2.348l8.662,5.002	c1.946,1.123,3.338,2.937,3.92,5.107C44.053,28.249,43.754,30.517,42.631,32.462z"></path>
    </svg>
  ),
  3: (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
      <path d="M 10 4 C 13.148438 4.960938 16.300781 5.921875 19.445313 6.890625 C 19.441406 14.664063 19.453125 22.4375 19.441406 30.210938 C 16.382813 32.917969 13.339844 35.644531 10.289063 38.363281 C 17.746094 34.445313 25.199219 30.519531 32.65625 26.59375 C 30.585938 25.652344 28.515625 24.726563 26.445313 23.78125 C 25.054688 20.746094 23.652344 17.71875 22.257813 14.683594 C 29.171875 16.796875 36.085938 18.917969 43 21.039063 C 43 24.417969 43 27.796875 43 31.175781 C 35.132813 35.867188 27.257813 40.550781 19.390625 45.242188 C 16.261719 43.050781 13.132813 40.855469 10 38.664063 C 10 27.109375 10 15.554688 10 4 M 10 2 C 9.574219 2 9.15625 2.136719 8.808594 2.394531 C 8.300781 2.769531 8 3.367188 8 4 L 8 38.660156 C 8 39.316406 8.316406 39.925781 8.851563 40.300781 C 10.980469 41.789063 13.109375 43.28125 15.234375 44.773438 L 18.242188 46.882813 C 18.585938 47.121094 18.984375 47.242188 19.390625 47.242188 C 19.742188 47.242188 20.097656 47.148438 20.414063 46.960938 C 24.761719 44.367188 29.109375 41.777344 33.460938 39.1875 L 44.023438 32.894531 C 44.628906 32.535156 45 31.882813 45 31.175781 L 45 26.109375 L 44.996094 21.039063 C 44.996094 20.160156 44.425781 19.386719 43.585938 19.128906 L 39 Robbins003906 17.722656 C 33.617188 16.070313 28.226563 14.417969 22.839844 12.773438 C 22.644531 12.714844 22.449219 12.6875 22.253906 12.6875 C 21.972656 12.6875 21.699219 12.746094 21.445313 12.855469 C 21.445313 10.867188 21.445313 8.882813 21.445313 6.894531 C 21.445313 6.015625 20.875 5.242188 20.035156 4.980469 C 16.886719 4.011719 13.734375 3.046875 10.582031 2.089844 C 10.390625 2.027344 10.195313 2 10 2 Z M 21.441406 30.238281 C 21.441406 30.230469 21.441406 30.222656 21.441406 30.210938 C 21.445313 26.046875 21.445313 21.878906 21.445313 17.710938 C 21.695313 18.246094 21.941406 18.785156 22.191406 19.320313 C 23.003906 21.085938 23.816406 22.851563 24.628906 24.617188 C 24.828125 25.054688 25.179688 25.40625 25.617188 25.605469 C 26.445313 25.980469 27.273438 26.355469 28.101563 26.730469 L 26.457031 27.597656 C 24.785156 28.476563 23.113281 29.359375 21.441406 30.238281 Z"></path>
    </svg>
  ),
};

const modelNames = {
  1: 'هوشیار (عمومی)',
  2: 'هوشیار (برنامه‌نویسی)',
  3: 'هوشیار (تصویرسازی)',
};

const modelBackgrounds = {
  1: 'bg-gray-800',
  2: 'bg-blue-800',
  3: 'bg-purple-800',
};

const getTimeAgo = (timeString) => {
  const now = new Date();
  const past = new Date(timeString);
  const diffMs = now - past;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) return `${diffDays} روز پیش`;
  if (diffHours > 0) return `${diffHours} ساعت پیش`;
  if (diffMinutes > 0) return `${diffMinutes} دقیقه پیش`;
  return `${diffSeconds} ثانیه پیش`;
};

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [input, setInput] = useState('');
  const [chats, setChats] = useState([]);
  const [token, setToken] = useState(null);
  const [name, setName] = useState(null);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);
  const [selectedModel, setSelectedModel] = useState(1);
  const [conversationId, setConversationId] = useState(null);
  const messagesEndRef = useRef(null);

  const router = useRouter();

  const get_history = async () => {
    try {
      setIsLoading(true);
      const response = await get_conversations(20, 1);
      console.log('Raw History response:', response);

      if (response) {
        let conversations = [];
        if (Array.isArray(response)) {
          conversations = response;
        } else if (response.data && Array.isArray(response.data)) {
          conversations = response.data;
        } else {
          console.warn('Unexpected response format, treating as empty array:', response);
          conversations = [];
        }

        const validConversations = conversations.filter(
          (chat) => chat && (chat.id || chat.title || chat.time)
        );

        setHistory(validConversations);
      } else {
        throw new Error('هیچ پاسخی از API دریافت نشد');
      }
    } catch (error) {
      console.error('خطا در دریافت تاریخچه:', error);
      addNotification(`خطا در بارگذاری تاریخچه: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const get_messagess = async () => {
    if (selectedHistoryId) {
      const response = await get_messages(selectedHistoryId, 20, 1);
      return response;
    }
    return null;
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedHistoryId) {
        try {
          setIsLoading(true);
          const response = await get_messagess();
          console.log('Messages response:', response);

          if (response && Array.isArray(response)) {
            const formattedMessages = response.map((msg) => ({
              sender: msg.sender === 'me' ? 'user' : 'ai',
              text: msg.text || 'پیام خالی',
              image: msg.image,
              model: msg.model || selectedModel,
              time: convertTime(msg.time)
            }));
            setChats(formattedMessages);

            // به‌روزرسانی selectedModel بر اساس مدل اولین پیام AI (یا اولین پیام اگر هیچ پیام AI وجود نداشت)
            const firstAIMessage = formattedMessages.find((msg) => msg.sender === 'ai');
            const firstMessageWithModel = formattedMessages.find((msg) => msg.model);
            if (firstAIMessage && firstAIMessage.model) {
              setSelectedModel(firstAIMessage.model);
            } else if (firstMessageWithModel && firstMessageWithModel.model) {
              setSelectedModel(firstMessageWithModel.model);
            } else {
              setSelectedModel(1); // مدل پیش‌فرض در صورتی که مدل مشخص نشده باشد
            }

            // به‌روزرسانی conversationId
            setConversationId(selectedHistoryId);
          } else {
            throw new Error('فرمت داده‌های دریافتی نامعتبر است');
          }
        } catch (error) {
          console.error('خطا در لود پیام‌ها:', error);
          addNotification(`خطا در بارگذاری پیام‌ها: ${error.message}`);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchMessages();
  }, [selectedHistoryId]);

  const convertTime = (timeString) => {
    if (!timeString) return new Date().toISOString();
    if (typeof timeString === 'string' && !isNaN(timeString)) {
      const timestamp = parseInt(timeString);
      if (timestamp > 1000000000) {
        return new Date(timestamp * 1000).toISOString();
      } else {
        console.warn('Possible invalid timestamp:', timeString);
        return new Date().toISOString();
      }
    }
    return new Date(timeString).toISOString();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addNotification = (message) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 10000);
  };

  const handleCopy = () => {
    const text = "http://localhost:3000/";
    navigator.clipboard.writeText(text);
    toast.success("لینک کپی شد!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeButton: false,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedName = localStorage.getItem('name');
    if (!storedToken) {
      router.push('/login');
    } else {
      setToken(storedToken);
      setName(storedName);
      encryption.token = storedToken;
      get_history();
    }
  }, [router]);

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const typeWriter = (text, onComplete) => {
    let index = 0;
    setIsTyping(true);
    setTypingText('');

    const interval = setInterval(() => {
      if (index < text.length) {
        setTypingText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        onComplete(text);
      }
    }, 12);
  };

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

  const handleModelSelect = async (model) => {
    setSelectedModel(model);
    setChats([]); // پاک کردن چت‌های قبلی
    setSelectedHistoryId(null);
    setConversationId(null); // ریست کردن conversationId برای ایجاد چت جدید
    addNotification(`مدل به ${modelNames[model]} تغییر کرد`);

    // ایجاد چت جدید با مدل انتخاب‌شده و ارسال پیام پیش‌فرض
    try {
      const defaultMessage = `شروع چت جدید با مدل ${modelNames[model]}`; // پیام پیش‌فرض
      const response = await chat(model, defaultMessage, null); // فراخوانی API با پیام پیش‌فرض
      const newConversationId = response?.message?.conversation_id;
      if (newConversationId) {
        setConversationId(newConversationId);
        await get_history(); // به‌روزرسانی تاریخچه
      } else {
        throw new Error('شناسه چت جدید دریافت نشد');
      }
    } catch (error) {
      console.error('خطا در ایجاد چت جدید:', error);
      addNotification(`خطا در ایجاد چت جدید: ${error.message}`);
    }
  };

  return (
    <div className="flex">
      <nav className="hidden md:block fixed top-0 border-b border-gray-700 left-0 right-0 bg-gray-800 mdBetweenLg md:max-w-[82.5%] sm:max-w-[90%] shadow-md z-50">
        <ul className="flex justify-between items-center p-3">
          <div className="flex justify-between items-center">
            <h1>هوشیار: دیدگاهی برای توسعه!</h1>
          </div>
          <div className="flex justify-between items-center gap-x-2">
            <Link href="/" className="flex items-center gap-x-1" title="اشتراک گذاری" onClick={handleCopy}>
              <li className="rounded-lg p-2.5 border-2 border-gray-700 shadow-lg">
                <Share size="20px" color="#dddddd" />
              </li>
            </Link>
            <Link href="http://localhost:3000/" target="_blank" className="flex items-center gap-x-1" title="صفحه جدید">
              <li className="rounded-lg p-2.5 border-2 border-gray-700 shadow-lg">
                <Pencil size="20px" color="#dddddd" />
              </li>
            </Link>
            <Link href="/" className="rounded-lg p-1 border-2 border-gray-700 shadow-lg" title={`${name} بزرگوار، امیدوارم تجربه لذت بخشی در هوشیار داشته باشی :)`}>
              <li className="flex items-center gap-x-1">
                <Avatar name={name} />
                <span className="text-[12px]">{name}</span>
              </li>
            </Link>
          </div>
        </ul>
      </nav>

      <div
        className={`fixed top-0 ${isOpen ? 'right-0' : '-right-64'} border-r border-gray-700 sidebar h-full overflow-y-auto md:w-[30%] lg:w-[30%] xl:!w-[17.5%] w-64 bg-gray-800 text-white !lgBetweenXl_sidebar transition-all duration-300 z-50 md:left-0 md:right-auto md:translate-x-0`}
      >
        <div className="font-bold flex items-center justify-between p-4">
          <div className="flex flex-col items-center gap-x-2">
            <div className="md:hidden flex items-center gap-x-2">
              <Link href="/" className="flex items-center gap-x-1" title="اشتراک گذاری" onClick={handleCopy}>
                <span className="rounded-lg p-2.5 border-2 border-gray-700 shadow-lg">
                  <Share size="20px" color="#dddddd" />
                </span>
              </Link>
              <Link href="http://localhost:3000/" target="_blank" className="flex items-center gap-x-1" title="صفحه جدید">
                <span className="rounded-lg p-2.5 border-2 border-gray-700 shadow-lg">
                  <Pencil size="20px" color="#dddddd" />
                </span>
              </Link>
              <Link href="/" className="rounded-lg p-1 border-2 border-gray-700 shadow-lg" title={`${name} بزرگوار، امیدوارم تجربه لذت بخشی در هوشیار داشته باشی :)`}>
                <span className="flex items-center gap-x-1">
                  <Avatar name={name} />
                  <span className="text-[12px]">{name}</span>
                </span>
              </Link>
            </div>
            <button className="flex text-white text-lg" onClick={toggleSidebar}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
              <Image src={logo} alt="logo" />
            </button>
          </div>
        </div>
        <ul className="p-4 space-y-4">
          <li className="relative cursor-pointer flex justify-between items-center hover:text-gray-300" onClick={toggleDropdown}>
            <span>انتخاب هوش مصنوعی</span>
            {dropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </li>
          {dropdownOpen && (
            <ul className="mt-1 ml-4 space-y-2 bg-gray-500 rounded-md p-2 z-50">
              <li
                className="p-1 cursor-pointer hover:bg-[var(--primary-color)] flex gap-x-1 items-center rounded"
                onClick={() => handleModelSelect(1)}
              >
                {modelIcons[1]}
                هوشیار (عمومی)
              </li>
              <li
                className="p-1 cursor-pointer hover:bg-[var(--primary-color)] flex gap-x-1 items-center rounded"
                onClick={() => handleModelSelect(2)}
              >
                {modelIcons[2]}
                هوشیار (برنامه نویسی)
              </li>
              <li
                className="p-1 cursor-pointer hover:bg-[var(--primary-color)] flex gap-x-1 items-center rounded"
                onClick={() => handleModelSelect(3)}
              >
                {modelIcons[3]}
                هوشیار (تصویر سازی)
              </li>
            </ul>
          )}
          <Link href="/aboutUs">
            <li className="hover:bg-[var(--primary-color)] py-2 px-1 rounded cursor-pointer">
              <button className="flex cursor-pointer items-center gap-x-1">
                <UsersRound />
                درباره ما
              </button>
            </li>
          </Link>
          <Link href="/termsOfUse">
            <li className="hover:bg-[var(--primary-color)] py-2 px-1 rounded cursor-pointer">
              <button className="flex cursor-pointer items-center gap-x-1">
                <Headset />
                شرایط استفاده
              </button>
            </li>
          </Link>
          <Link href="/login">
            <li className="hover:bg-[var(--primary-color)] py-2 px-1 rounded cursor-pointer">
              <button
                className="flex cursor-pointer items-center gap-x-1"
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('name');
                }}
              >
                {token ? <LogOut /> : <UserRound />}
                {token ? 'خروج' : 'حساب کاربری'}
              </button>
            </li>
          </Link>
        </ul>
        <div className="pb-[100px]">
          <div className="border-t p-4 text-lg flex gap-x-1 items-center border-gray-700 font-bold">
            <History />
            تاریخچه
          </div>
          {history.length > 0 ? (
            history.map((item) => (
              <div
                key={item.id}
                className="px-4 my-2 py-2 cursor-pointer rounded hover:bg-[var(--primary-color)] mx-3"
                onClick={() => setSelectedHistoryId(item.id)}
              >
                <span>{item.title || 'بدون عنوان'}</span>
                <div className="text-xs text-gray-400">{getTimeAgo(convertTime(item.time))}</div>
              </div>
            ))
          ) : (
            <div className="px-4 my-2 py-2 text-gray-400">هیچ تاریخچه‌ای یافت نشد</div>
          )}
        </div>
      </div>

      <div className="flex-1 max-w-[1200px] m-auto text-center min-h-screen flex flex-col justify-between">
        <div>
          <div className="md:hidden p-4 shadow flex justify-end items-center">
            <button onClick={toggleSidebar}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <div className="mt-[100px] md:mt-[70px] px-4">
            <h1 className="text-2xl font-bold mt-[100px]">
              در چه <span className="text-[var(--primary-color)]">زمینه</span> ای می‌توانم{' '}
              <span className="text-[var(--primary-color)]">کمک</span> کنم؟
            </h1>
            <div className="chat-container overflow-y-auto p-[10px]">
              {chats
                .concat(
                  isTyping && selectedModel !== 3
                    ? [{ sender: 'ai-typing', text: typingText + (isTyping ? '|' : ''), model: selectedModel, time: new Date().toISOString() }]
                    : []
                )
                .filter((chat) => chat && (chat.text || chat.image) && (chat.text?.trim() !== '' || chat.image))
                .map((chat, index) => (
                  <div
                    key={index}
                    className={`message m-[10px] p-[10px] max-w-[70%] rounded-lg flex items-start gap-x-2 ${
                      chat.sender === 'user'
                        ? 'user-message bg-[#007bff] text-white ml-auto text-right'
                        : `ai-message ${modelBackgrounds[chat.model || selectedModel]} my-5 text-base/8 px-4 text-right text-white`
                    }`}
                    style={{ display: 'block', width: 'fit-content' }}
                  >
                    {chat.sender !== 'user' && (
                      <span className="mt-1">{modelIcons[chat.model || selectedModel]}</span>
                    )}
                    <div>
                      {chat.image && (
                        <Image
                          src={chat.image}
                          alt="Generated by هوشیار (تصویرسازی)"
                          width={500}
                          height={500}
                          className="max-w-full h-auto rounded-lg mb-2"
                        />
                      )}
                      {chat.text && chat.text.trim() !== '' && (
                        <ReactMarkdown
                          rehypePlugins={[rehypeRaw, rehypeHighlight]}
                          components={{
                            code({ node, inline, className, children, ...props }) {
                              return inline ? (
                                <code className={className} {...props}>
                                  {children}
                                </code>
                              ) : (
                                <pre
                                  className="text-white p-4 rounded-lg my-5 overflow-x-auto"
                                  style={{ backgroundColor: '#202020', color: 'white', textAlign: 'left', maxWidth: '100%' }}
                                >
                                  <code className={className} {...props}>
                                    {children}
                                  </code>
                                </pre>
                              );
                            },
                          }}
                        >
                          {chat.text}
                        </ReactMarkdown>
                      )}
                      <div className="text-xs text-gray-400 mt-1">{getTimeAgo(convertTime(chat.time))}</div>
                    </div>
                  </div>
                ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
        <div className="overflow-y-auto pb-24">
          <ChatInput
            chats={chats}
            setChats={setChats}
            input={input}
            setInput={setInput}
            typeWriter={typeWriter}
            isTyping={isTyping}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            selectedModel={selectedModel}
            conversationId={conversationId}
            setConversationId={setConversationId}
          />
        </div>
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            message={notification.message}
            onClose={() => setNotifications((prev) => prev.filter((n) => n.id !== notification.id))}
          />
        ))}
        <style jsx>{`
          .ai-message::after {
            content: '|';
            animation: blink 0.7s step-end infinite;
            display: ${isTyping && selectedModel !== 3 ? 'inline' : 'none'};
          }
          @keyframes blink {
            50% {
              opacity: 0;
            }
          }
        `}</style>
      </div>
    </div>
  );
}