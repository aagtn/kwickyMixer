import VerticalSlider from "./sliderV"

interface VideoObj {
    id: string;
    title: string;
}

interface DataObj {
    searchInput: string;
    videos: VideoObj[];
    volume: number;
    playState: string;
    selectedVideo: VideoObj;
}

interface DataDeck {
    deckA?: DataObj;
    deckB?: DataObj;
}


export default function ScreenMixer({deckA,deckB}:DataDeck){

    return(
        <div className='w-full h-full bg-black flex relative justify-center'>
        <VerticalSlider volume={deckA?.volume ?? 100} deckId={"deckA"} />
        <VerticalSlider volume={deckB?.volume ?? 0} deckId={"deckB"} />
        </div>
    )
}