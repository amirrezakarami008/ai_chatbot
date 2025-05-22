import Link from "next/link";
import { Blocks, UsersRound, BotMessageSquare , House } from "lucide-react";
export default function FixedSidebar() {
  return (
    <div className="fixed top-1/2 right-1 -translate-y-1/2 w-13 border-2 border-[var(--primary-color)] flex justify-center items-center h-48 bg-gray-700 shadow-lg rounded-lg">
      <ul className="flex flex-col">
        <li className="cursor-pointer p-2 my-0.5 bg-gray-300 rounded-l-full" title="صفحه اصلی">
          <Link href="/">
            <span>
              <House color="#007bff" />
            </span>
          </Link>
        </li>
        <li className="cursor-pointer p-2 my-0.5 bg-gray-300 rounded-l-full" title="گفتگو با هوش مصنوعی">
          <Link href="/chat">
            <span>
              <BotMessageSquare color="#007bff" />
            </span>
          </Link>
        </li>
        <li className="cursor-pointer p-2 my-0.5 bg-gray-300 rounded-l-full" title="درباره ما">
          <Link href="/aboutUs">
            <span>
              <UsersRound color="#007bff" />
            </span>
          </Link>
        </li>
        <li className="cursor-pointer p-2 my-0.5 bg-gray-300 rounded-l-full" title="شرایط استفاده">
          <Link href="/TermsOfUse">
            <span>
              <Blocks color="#007bff" />
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
