'use client'
import YoutubePlayer from "./youtubePlayer"

interface ScreenPropsData{
    selectedVideo : string;
    playState : string;
    volume:number;
    loop:boolean;
    deck:string;
    seekTo:number;
}

interface ScreenProps{
    data : ScreenPropsData;
}

export default function Screen({data}:ScreenProps){

    return(
        <div className="w-full bg-black h-[65%] mt-2 rounded-lg overflow-hidden pointer-events-none screen-morph">
            <YoutubePlayer data={data} />
        </div>
    )
}