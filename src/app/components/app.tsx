import { useQuery } from '@tanstack/react-query';
import {isDesktop} from 'react-device-detect';
import DesktopOnly from './desktopOnlyCpn';
import { Theme } from '@radix-ui/themes';
import { Box } from "@radix-ui/themes";
import DeckCpnt from './deck';
import MixerCpnt from './mixer';
import BgYoutubePlayer from './bgPlayer';
import '@radix-ui/themes/styles.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MixTable } from '../types';


export default function App() {

    const [bgOpacityA, setBgOpacityA] = useState<number>(1); 
    const [bgOpacityB, setBgOpacityB] = useState<number>(0); 
    const crossfaderPosition = useSelector((state:MixTable) => state.player.mixer.position)
    const [fullScreen,setFullScreen] = useState<boolean>(true)

    useEffect(() => {
        if (crossfaderPosition) {
            const crossfaderValue = crossfaderPosition;

            const opacityA = 1 - (crossfaderValue + 50) / 100; 
            const opacityB = (crossfaderValue + 50) / 100; 

            setBgOpacityA(opacityA);
            setBgOpacityB(opacityB);
        }
    }, [crossfaderPosition]);

    
    if(!isDesktop) return <DesktopOnly/>
    
    return (
        <Theme accentColor="indigo" appearance="dark">
          
            <div className="h-[100vh] max-h-[100vh] w-[100vw] flex">
                <div className={`flex z-10 w-full flex justify-center items-center ${!fullScreen ? "p-8" :"p-2"}`}>
                    <div className={`flex w-full h-full max-h-[900px] max-w-[1800px]  ${!fullScreen ? 'min-w-[1100px] h-[80%]':"h-[90%]"} rounded-3xl bg-[#101114] p-6 `}>
                        <div className="flex w-full rounded-xl p-4 main-bg">
                            <DeckCpnt deckId={"deckA"} />
                            <MixerCpnt />
                            <DeckCpnt deckId={"deckB"} />
                        </div>
                    </div>
                </div>


                <Box position={"absolute"} width={"100%"} height={"100%"} className="top-0 overflow-hidden">
                    <div
                        style={{
                            height: '100%',
                            opacity: bgOpacityA,
                        }}
                        className="w-full bg-slate-800 p-0 overflow-hidden"
                    >
                        <BgYoutubePlayer deckId={'deckA'} />
                    </div>
                    <div
                        style={{
                            height: '100%',
                            opacity: bgOpacityB,
                        }}
                        className="w-full p-0 overflow-hidden absolute top-0"
                    >
                        <BgYoutubePlayer deckId={'deckB'} />
                    </div>
                </Box>
            </div>
        </Theme>
    );
}
