import Image from "next/image"


interface VinylProps{
    data:string
}

export default function Vynil({data}:VinylProps){

    return(
        <div className="w-[300px] h-[300px] rounded bg-black my-8 overflow-hidden flex items-center justify-center object-cover shadow-lg hidden">
            <Image src={data} width={500} height={500} alt="cover" className="object-cover"/>
        </div>
    )
}