import { isDesktop } from 'react-device-detect';
import DesktopOnly from './desktopOnlyCpn';
import { Theme } from '@radix-ui/themes';
import DeckCpnt from './deck';
import MixerCpnt from './mixer';
import BgYoutubePlayer from './bgPlayer';
import '@radix-ui/themes/styles.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MixTable, DeckSize } from '../types';
import LoadingMain from './loadingMain';
import getRatio from '../utils/getRatio';

export default function App() {

    const [bgOpacityA, setBgOpacityA] = useState<number>(1);
    const [bgOpacityB, setBgOpacityB] = useState<number>(0);
    const crossfaderPosition = useSelector((state: MixTable) => state.player.mixer.position)
    const [tableSize, setTableSize] = useState<DeckSize>({ w: 0, h: 0 })

    useEffect(() => {

        const setSize = () => {            
            const ratio = getRatio({ arw: 16, arh: 9 })
            setTableSize(ratio);
        }

        window.addEventListener('resize', () => {
            setSize()
        })
        
        setSize()

        return () => {
            window.removeEventListener('resize', setSize);
        };
    }, [])

    useEffect(() => {
        if (crossfaderPosition) {
            const crossfaderValue = crossfaderPosition;

            const opacityA = 1 - (crossfaderValue + 50) / 100;
            const opacityB = (crossfaderValue + 50) / 100;

            setBgOpacityA(opacityA);
            setBgOpacityB(opacityB);
        }
    }, [crossfaderPosition]);


    if (!isDesktop) return <DesktopOnly />
    if (tableSize.w === 0) return <LoadingMain />

    return (
        <Theme accentColor="indigo" appearance="dark">

            <div className="h-[100vh] max-h-[100vh] w-[100vw] flex">
                <div className={`flex z-10 w-full flex  items-center ${tableSize.h >= 600 ? "justify-center " : ""} p-6`}>
                    <div className={`relative min-w-[100%] min-h-[600px] flex rounded-3xl bg-[#101114] p-6 overflow-hidden`}
                        style={{ width: tableSize.w, height: tableSize.h }}>
                        <div className="flex w-full rounded-xl p-4 main-bg">
                            <DeckCpnt deckId={"deckA"} />
                            <MixerCpnt />
                            <DeckCpnt deckId={"deckB"} />
                        </div>
                    </div>
                </div>


                <div className="w-full h-full absolute top-0 overflow-hidden min-w-[985px] min-h-[600px]">
                    <div style={{ opacity: bgOpacityA }} className="w-full h-full bg-slate-800 p-0 overflow-hidden">
                        <BgYoutubePlayer deckId={'deckA'} />
                    </div>
                    <div style={{ opacity: bgOpacityB }} className="w-full h-full p-0 overflow-hidden absolute top-0">
                        <BgYoutubePlayer deckId={'deckB'} />
                    </div>
                </div>
            </div>
        </Theme>
    );
}
