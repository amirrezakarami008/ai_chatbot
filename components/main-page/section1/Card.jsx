export default function Card({title , desc , icon}){
    return(
        <div className="w-full sm:w-full md:w-1/2 lg:w-1/3 p-3">
            <div className="card flex flex-col gap-y-4 border-2 hover:scale-95 transition-all delay-75 border-gray-400 p-7 rounded-xl">
                <span className="icon">{icon}</span>
                <span className="title font-bold">{title}</span>
                <span className="text text-justify opacity-80">{desc}</span>
            </div>
        </div>
    )
}