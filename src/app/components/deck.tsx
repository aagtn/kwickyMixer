'use client'
import InputSearch from './inputSearch';
import ScreenResult from './screenResult';
import Screen from './screen';
import Controls from './controls';
import ProgressBar from './playBar';

interface VideoObj {
    id: string;
    title: string;
    image: string;
}

interface DataObj {
    searchInput: string;
    videos: VideoObj[];
    volume: number;
    playState: string;
    selectedVideo: string;
    image: string;
    loop: boolean;
    currentTime: number;
    trackDuration: number;
    seekTo: number;
    playlist:VideoObj[];
    playlistActive?:boolean;
}

interface CrossFader {
    position: number;
    autoMixStartAt: number;
    autoMixDuration: number;
    transitionInProcess:boolean;
    autoMix:boolean;
}

interface DeckCpnProps {
    deckId: string;
    data?: DataObj;
    crossfader?: CrossFader
}


export default function DeckCpnt({ deckId, data, crossfader }: DeckCpnProps) {
    if (!data ) {
        return <div>Loading...</div>;
    }

    return (

        <div className="w-[40%] flex flex-col items-center p-5 ">
            <InputSearch data={data.searchInput} deckId={deckId} />
            <ScreenResult data={data} deckId={deckId} />
            <Screen
                data={{
                    selectedVideo: data.selectedVideo,
                    playState: data.playState,
                    volume: data.volume,
                    loop: data.loop,
                    deck: deckId,
                    seekTo: data.seekTo,
                    image: data.image,
                    playlist:data.playlist
                }} />
            <ProgressBar
                data={{
                    time: data.currentTime,
                    duration: data.trackDuration,
                    deck: deckId,
                    seekTo: data.seekTo,
                    crossFader: crossfader,
                    volume:data.volume,
                    loop:data.loop,
                }} />
            <Controls data={{ playState: data.playState, loop: data.loop }} deckId={deckId} />
        </div>
    )

}