import ScreenMixer from './mixer-screen';
import HorizontalSlider from "./sliderH"
import AutoMixParams from './autoMixParams';
import AutoMixBtn from './automixBtn';


export default function MixerCpnt() {


    return (

        <div className="w-[20%] p-3 h-[100%] max-h-[90%] min-w-[250px] flex items-center justify-center">
            <div className="mixer-morph rounded-xl w-full h-[70%] flex flex-col items-center ">
                <div className="h-[70%] w-[95%] flex items-center justify-center  ">
                    <div className='w-full h-[80%] rounded-lg input-morph'>
                        <ScreenMixer />
                    </div>
                </div>
                <div className="h-[10%] w-full flex">
                    <HorizontalSlider />
                </div>
                <div className="w-full h-[20%] flex items-center justify-center">
                    <AutoMixBtn />
                </div>
                <div className='h-[15%]'>
                    <AutoMixParams />
                </div>
            </div>
        </div>
    )
}