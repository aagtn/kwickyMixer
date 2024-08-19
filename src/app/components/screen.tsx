'use client'
import { useEffect } from "react";
import YoutubePlayer from "./youtubePlayer"
import Image from "next/image";

interface VideoObj {
    id: string;
    title: string;
    image: string;
}


interface ScreenPropsData{
    selectedVideo : VideoObj;
    playState : string;
    volume:number;
    loop:boolean;
    deck:string;
    seekTo:number;    
    playlist:VideoObj[];
    
}

interface ScreenProps{
    data : ScreenPropsData;
}

export default function Screen({data}:ScreenProps){

    return(
        <div className="w-full bg-black h-[65%] mt-2 rounded-lg overflow-hidden pointer-events-none screen-morph">
           
            {data.playState === "paused"
             && <Image src={ data.selectedVideo.image } width={400} height={350} alt={"cover"} className="object-cover w-full h-full"/>}
           
           <YoutubePlayer data={data} />
        </div>
    )
}