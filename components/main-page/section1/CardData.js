import { Bot, GlobeLock, Zap , Lock , code, Code, History } from "lucide-react";

const CardData= [
        {
            id:1,
            title: "چند مدل هوش مصنوعی",
            desc: "دسترسی به آخرین مدل های هوش مصنوعی هایی مثل chatGPT, Gemini, Bard",
            icon : <Bot className="bg-indigo-900 size-12 p-2 rounded-xl border-2 shadow-2xl border-gray-400" />
        },
        {
            id:2,
            title: "سرعت همانند برق و باد",
            desc: "با زیرساخت بهینه و اتصالات مستقیم API ما، در عرض چند ثانیه پاسخ دریافت کنید",
            icon : <Zap className="bg-indigo-900 size-12 p-2 rounded-xl border-2 shadow-2xl border-gray-400" />
        },
        {
            id:3,
            title: "امن و خصوصی",
            desc: "مکالمات شما رمزگذاری شده و هرگز با اشخاص ثالث به اشتراک گذاشته نمی شود",
            icon : <Lock className="bg-indigo-900 size-12 p-2 rounded-xl border-2 shadow-2xl border-gray-400" />
        },
        {
            id:4,
            title: "دستیار برنامه نویسان",
            desc: "با مدلهای تخصصی کدنویسی، به زبان های مختلف برنامه نویسی کمک بگیرید",
            icon : <Code className="bg-indigo-900 size-12 p-2 rounded-xl border-2 shadow-2xl border-gray-400" />
        },
        {
            id:5,
            title: "استفاده بدون فیلترشکن",
            desc: "شما میتوانید از مدل های هوش مصنوعی هوشیار بدون فیلترشکن استفاده کنید",
            icon : <GlobeLock className="bg-indigo-900 size-12 p-2 rounded-xl border-2 shadow-2xl border-gray-400" />
        },
        {
            id:6,
            title: "تاریخچه مکالمه",
            desc: "تاریخچه چت شما به طور خودکار ذخیره می شود تا بعدا بتوانید مکالمه را ادامه دهید",
            icon : <History className="bg-indigo-900 size-12 p-2 rounded-xl border-2 shadow-2xl border-gray-400" />
        }
]
export default CardData