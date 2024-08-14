import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Box } from "@radix-ui/themes"
import VerticalSlider from "./sliderV"
import HorizontalSlider from "./sliderH"
import { useState } from "react";
import AutoMixParams from './autoMixParams';
import Image from "next/image";

interface VideoObj {
    id: string;
    title: string;
}

interface DataObj {
    searchInput: string;
    videos: VideoObj[];
    volume: number;
    playState: string;
    selectedVideo: string;
}

interface Data {
    deckA?: DataObj;
    deckB?: DataObj;
    crossfader?: number;
}

interface MixerProps {
    data: Data;
}

export default function MixerCpnt({ data }: MixerProps) {
    const [autoTransition, setAutoTransition] = useState<boolean>(true)

    const handleAutoTrans = () => {
        setAutoTransition((prev)=> !prev)
    }

    return (

        <Box className="w-[20%] p-3 h-[100%]">
            <div className="h-[15%] w-full flex items-center justify-center">
                <div className="w-[50%] h-[50%]">
                    <Image src="/kwick.gif" width={70} height={70} alt={"kwicky"} className="opacity-[1] w-full h-full object-contain" />
                </div>
            </div>

            <div className="mixer-morph rounded-xl w-full h-[70%] flex flex-col items-center ">
                <div className="h-[70%] w-[60%] flex p-2">
                    <VerticalSlider volume={data.deckA?.volume ?? 100} deckId={"deckA"} />
                    <VerticalSlider volume={data.deckB?.volume ?? 0} deckId={"deckB"} />
                </div>
                <div className="h-[10%] w-full flex">
                    <HorizontalSlider crossfader={data.crossfader ?? - 50} />
                </div>
                <div className="w-full h-[20%] flex items-center justify-center">
                    <div className="w-[40%] btn-morph flex justify-evenly" onClick={handleAutoTrans}>
                        < DoubleArrowRightIcon color={autoTransition ? "#9db1ff" : "rgba(255,255,255,.6"} />
                        <div className='flex items-center justify-center '>
                            <div className={`absolute border border-black rounded-full z-20 ${autoTransition ? ' w-[2px] h-[2px] bg-blue-600 border-0 ' : "w-[4px] h-[4px] bg-black"}`}></div>
                            <div className={`w-[5px] h-[5px] rounded-full z-10 ${autoTransition ? 'bg-blue-600 blur-[2px] ' : ""}`}></div>
                            <div className='absolute w-[4px] h-[4px] bg-black rounded-full'></div>
                        </div>
                        < DoubleArrowLeftIcon color={autoTransition ? "#9db1ff" : "rgba(255,255,255,.6"} />
                    </div>
                </div>
                <div className='h-[15%]'>
                <AutoMixParams/>
                </div>
            </div>
        </Box>
    )
}