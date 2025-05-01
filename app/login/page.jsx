"use client";
import { useState } from "react";
import Link from "next/link";
import { BotMessageSquare } from "lucide-react";
import { useRouter } from "next/navigation"; 
import { chat, get_conversations, get_messages, signup, signin } from '../../backend/api.js';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const login = async () => {
    if (!isValidEmail(email)) {
      alert("ایمیل معتبر نیست ❌");
      return;
    }
    if (password.length < 8) {
      alert("رمز عبور باید حداقل ۸ کاراکتر باشد ❗");
      return;
    }

    setIsLoading(true);
    try {
      const response = await (isLogin ? signin(email, password) : signup(name, email, password));
      console.log('پاسخ سرور:', response);
      alert('درخواست ارسال شد');
      if (response.token !== "") {
        setToken(response.token);
        localStorage.setItem("token", response.token);
        localStorage.setItem("name", response.user.name);
        router.push("/");
      } else {
        console.log("user pass doros ni");
      }
    } catch (error) {
      if (error.message === "USER_EXIST") {
        alert("ایمیل شما قبلا ثبت نام شده است، لطفا وارد شوید.");
      } else if (error.message === "INVALID_CREDENTIALS") {
        alert("رمز عبور یا ایمیل اشتباه است ❌");
      } else {
        alert("خطایی رخ داد، لطفا دوباره تلاش کنید.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--secondary-color)]">
      <div className="p-8 rounded-2xl shadow-2xl bg-[var(--secondary-color)] border border-[var(--primary-color)] w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "ورود به حساب" : "ایجاد حساب کاربری"}
        </h2>

        <form className="flex flex-col gap-4">
          {!isLogin && (
            <input
              type="text"
              minLength={1}
              maxLength={50}
              placeholder="نام مستعار"
              onChange={(e) => setName(e.target.value)}
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:var(--primary-color)"
            />
          )}
          <input
            type="email"
            placeholder="ایمیل"
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:var(--primary-color)"
          />
          <input
            type="password"
            placeholder="رمز عبور"
            onChange={(e) => setPassWord(e.target.value)}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:var(--primary-color)"
          />
          <button
            type="button"
            onClick={login}
            disabled={isLoading}
            className="bg-[var(--primary-color)] text-white rounded-lg p-3 cursor-pointer hover:bg-[var(--primary-color)] transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {isLogin ? "در حال ورود..." : "در حال ثبت نام..."}
              </>
            ) : (
              <>{isLogin ? "ورود" : "ثبت نام"}</>
            )}
          </button>
        </form>

        <div className="text-center flex flex-col gap-y-4 mt-4 text-gray-600">
          <div className="flex items-center gap-x-1 justify-center">
            {isLogin ? "حساب کاربری نداری؟" : "حساب داری؟"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 cursor-pointer font-semibold"
            >
              {isLogin ? "ثبت نام کن" : "وارد شو"}
            </button>
          </div>
          <Link href="/">
            <button
              className="flex items-center justify-center gap-x-2 w-full border border-[var(--primary-color)] cursor-pointer text-white rounded-lg p-3 hover:bg-[var(--primary-color)] transition-all"
            >
              <BotMessageSquare color="#fff" />
              گفتگو با هوش مصنوعی
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}