'use client'
import { useEffect } from "react";
import YoutubePlayer from "./youtubePlayer"
import Image from "next/image";

interface ScreenPropsData{
    selectedVideo : string;
    playState : string;
    volume:number;
    loop:boolean;
    deck:string;
    seekTo:number;
    image:string;
}

interface ScreenProps{
    data : ScreenPropsData;
}

export default function Screen({data}:ScreenProps){

    return(
        <div className="w-full bg-black h-[65%] mt-2 rounded-lg overflow-hidden  screen-morph">
           {/* {data.playState === "paused" &&
           <Image src={data.image} width={300} height={250} alt='cover' className='w-full h-full object-cover'/>
            } */}
           <YoutubePlayer data={data} />
        </div>
    )
}