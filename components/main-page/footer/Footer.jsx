import { Copyright } from "lucide-react"
import logo from "../../../public/images/logo.png"
import Image from "next/image"

export default function Footer(){
    return(
        <div className="flex items-center flex-col gap-y-2 border-t border-t-gray-700 bg-[#137df621] py-5 justify-start">
            <div className="logo flex justify-start">
                <Image
                    src={logo}
                    width={200}
                    height={200}
                    alt="logo"
                />
            </div>
            <span className="font-bold">توسعه یافته توسط: علی گنجی زاده - امیررضا کرمی - امیرحسین شرفی</span>
            <span className="flex items-center gap-x-2 direction font-bold">
                <Copyright /> 2025 Hoshyar Ai. <br />
            </span>
        </div>
    )
}