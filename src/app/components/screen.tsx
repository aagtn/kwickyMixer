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
    selectedVideo : string;
    playState : string;
    volume:number;
    loop:boolean;
    deck:string;
    seekTo:number;
    image:string;
    playlist:VideoObj[];
    
}

interface ScreenProps{
    data : ScreenPropsData;
}

export default function Screen({data}:ScreenProps){

    return(
        <div className="w-full bg-black h-[65%] mt-2 rounded-lg overflow-hidden  screen-morph">
           <YoutubePlayer data={data} />
        </div>
    )
}