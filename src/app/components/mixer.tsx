import ScreenMixer from './mixer-screen';
import HorizontalSlider from "./sliderH"
import AutoMixParams from './autoMixParams';
import AutoMixBtn from './automixBtn';

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

interface CrossFader {
    position: number;
    autoMixStartAt: number;
    autoMixDuration: number;
    transitionInProcess:boolean;
}

interface Data {
    deckA?: DataObj;
    deckB?: DataObj;
    crossfader?: CrossFader;
}

interface MixerProps {
    data: Data;
}

export default function MixerCpnt({ data }: MixerProps) {

    if (!data.crossfader) {
        return <div>Error: Crossfader data is missing</div>;
    }

    return (

        <div className="w-[20%] p-3 h-[100%] min-w-[250px] flex items-center justify-center">
            <div className="mixer-morph rounded-xl w-full h-[70%] flex flex-col items-center ">
                <div className="h-[70%] w-[95%] flex items-center justify-center  ">
                    <div className='w-full h-[80%] rounded-lg input-morph'>
                        <ScreenMixer deckA={data.deckA} deckB={data.deckB} />
                    </div>
                </div>
                <div className="h-[10%] w-full flex">
                    <HorizontalSlider crossfader={data.crossfader} deckA={data.deckA?.playState} deckB={data.deckB?.playState}/>
                </div>
                <div className="w-full h-[20%] flex items-center justify-center">
                    <AutoMixBtn />
                </div>
                <div className='h-[15%]'>
                    <AutoMixParams data={data.crossfader} />
                </div>
            </div>
        </div>
    )
}