"use client";
import { useState } from "react";
import Link from "next/link";
import { BotMessageSquare } from "lucide-react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
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
              placeholder="نام مستعار"
              onChange={(e) => setNickName(e.target.value)}
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
            type="submit"
            className="bg-[var(--primary-color)] text-white rounded-lg p-3 cursor-pointer hover:bg-[var(--primary-color)] transition-all"
          >
            {isLogin ? "ورود" : "ثبت نام"}
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
              type="submit"
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
