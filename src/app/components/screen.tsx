'use client'
import { DeckId, MixTable } from "../types";
import YoutubePlayer from "./youtubePlayer"
import Image from "next/image";
import { useSelector } from "react-redux";
import { Spinner } from "@radix-ui/themes";
import { useEffect,useState } from "react";


export default function Screen({deckId}:DeckId){
    const playState = useSelector((state:MixTable) => state.player[deckId].playState)
    const selectedVideoImg = useSelector((state:MixTable) => state.player[deckId].selectedVideo?.image)
    const isLoading = useSelector((state:MixTable) => state.player[deckId].isLoading)


    return(
        <div className="w-full bg-black h-[65%] mt-2 rounded-lg overflow-hidden pointer-events-none screen-morph relative">
           {isLoading && <div className="absolute w-full h-full bg-black text-white flex items-center justify-center"><Spinner size="3"/></div>}
            {playState === "paused"
             && <Image src={ selectedVideoImg || "" } width={400} height={350} alt={"cover"} className="object-cover w-full h-full"/>}
           
           <YoutubePlayer deckId={deckId} />
        </div>
    )
}