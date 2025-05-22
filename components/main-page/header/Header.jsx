import Link from "next/link";
import logo from "../../../public/images/logo.png"
import Image from 'next/image';

export default function Header(){
    return(
        <div className="flex items-center border-b border-b-gray-700 bg-[#137df621] px-8 py-5 justify-between">
            <div className="logo flex justify-start">
                <Image
                    src={logo}
                    width={200}
                    height={200}
                    alt="logo"
                />
            </div>
            <div className="login-btn">
                <Link href={"/login"} className="cursor-pointer transition-all delay-75 px-5 py-3 border-2 border-gray-400 hover:bg-[#137df621] rounded-xl">
                    <button className="cursor-pointer">
                        ورود / ثبت نام
                    </button>
                </Link>
            </div>
        </div>
    )
}