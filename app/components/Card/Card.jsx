import Image from 'next/image'

export default function Card({name , image , text , position}){
    return(
        <div className="flex-1 flex-col shadow-3xl flex items-center justify-center text-white">
          <div className="image">
          <Image 
              src={image}
              alt="توضیح تصویر" 
              width={400} 
              height={200}
              className="rounded-2xl shadow-xl border border-[var(--primary-color)]"
            />
          </div>
          <div className="details flex flex-col gap-y-2 mt-3 !p-6">
            <h2 className="text-2xl text-center">{name}</h2>
            <h4 className="text-md text-center opacity-50">{position}</h4>
            <p>{text}</p>
          </div>
        </div>
    )
}