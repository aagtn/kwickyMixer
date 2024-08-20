import { useQuery } from '@tanstack/react-query';
import {isDesktop} from 'react-device-detect';
import DesktopOnly from './desktopOnlyCpn';
import { Theme } from '@radix-ui/themes';
import { Box } from "@radix-ui/themes";
import DeckCpnt from './deck';
import MixerCpnt from './mixer';
import BgYoutubePlayer from './bgPlayer';
import { deckA, deckB, crossFader } from "../data/decksParams";
import '@radix-ui/themes/styles.css';
import { useEffect, useState } from 'react';
import LoadingMain from './loadingMain';
import ErrorMain from './errorMain';

export default function App() {

    const [bgOpacityA, setBgOpacityA] = useState<number>(1); 
    const [bgOpacityB, setBgOpacityB] = useState<number>(0); 

    const { data: dataA, isLoading: isLoadingA, error: errorA } = useQuery({
        queryKey: ['deckA'],
        queryFn: () => Promise.resolve(deckA),
    });

    const { data: dataB, isLoading: isLoadingB, error: errorB } = useQuery({
        queryKey: ['deckB'],
        queryFn: () => Promise.resolve(deckB),
    });

    const { data: dataCrossFader, isLoading: isLoadingC, error: errorC } = useQuery({
        queryKey: ['mixer'],
        queryFn: () => Promise.resolve(crossFader),
    });

    useEffect(() => {
        if (dataCrossFader) {
            const crossfaderValue = dataCrossFader.position;

            const opacityA = 1 - (crossfaderValue + 50) / 100; 
            const opacityB = (crossfaderValue + 50) / 100; 

            setBgOpacityA(opacityA);
            setBgOpacityB(opacityB);
        }
    }, [dataCrossFader?.position]);



    if (isLoadingA || isLoadingB || isLoadingC) return <LoadingMain/>
    if (errorA || errorB || errorC) return <ErrorMain error={errorA || errorB || errorC}/>
    
    if(!isDesktop) return <DesktopOnly/>
    
    return (
        <Theme accentColor="indigo" appearance="dark">
          
            <div className="h-[100vh] max-h-[100vh] w-[100vw] flex">
                <div className="flex z-10 w-full flex justify-center items-center p-8">
                    <div className="flex w-full min-w-[1100px] max-w-[1400px] max-h-[700px] h-[80%] bg-[#101114] p-6 rounded-3xl">
                        <div className="flex w-full rounded-xl p-4 main-bg">
                            <DeckCpnt deckId={"deckA"} data={dataA} crossfader={dataCrossFader}/>
                            <MixerCpnt data={{ deckA: dataA, deckB: dataB, crossfader: dataCrossFader }} />
                            <DeckCpnt deckId={"deckB"} data={dataB} crossfader={dataCrossFader}/>
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
                        {dataA && <BgYoutubePlayer data={dataA} deckId={'deckA'}/>}
                    </div>
                    <div
                        style={{
                            height: '100%',
                            opacity: bgOpacityB,
                        }}
                        className="w-full p-0 overflow-hidden absolute top-0"
                    >
                        {dataB && <BgYoutubePlayer data={dataB} deckId={'deckB'} />}
                    </div>
                </Box>
            </div>
        </Theme>
    );
}
