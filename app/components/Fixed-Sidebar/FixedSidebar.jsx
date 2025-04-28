import Link from "next/link";
import { Blocks, UsersRound, BotMessageSquare } from "lucide-react";

export default function FixedSidebar() {
  return (
    <div className="fixed top-1/2 right-2 -translate-y-1/2 w-12 border-2 border-[var(--primary-color)] flex justify-center items-center h-48 p-5 bg-gray-700 shadow-lg rounded-lg">
      <ul className="flex flex-col">
        <li className="cursor-pointer p-4" title="گفتگو با هوش مصنوعی">
          <Link href="/">
            <span>
              <BotMessageSquare />
            </span>
          </Link>
        </li>
        <li className="cursor-pointer p-4" title="درباره ما">
          <Link href="/aboutUs">
            <span>
              <UsersRound />
            </span>
          </Link>
        </li>
        <li className="cursor-pointer p-4" title="شرایط استفاده">
          <Link href="/TermsOfUse">
            <span>
              <Blocks />
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
