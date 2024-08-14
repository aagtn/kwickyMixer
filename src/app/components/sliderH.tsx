import '../styles/sliders.css';
import * as Slider from '@radix-ui/react-slider';
import Mixer from '../utils/mixer';
import { usePlayerMutations } from '../hooks/mutations';

interface CrossFader {
    position:number;
    autoMixStartAt:number;
    autoMixDuration:number;
}

interface HorizontalSliderProps {
    crossfader: CrossFader
}

export default function HorizontalSlider({ crossfader }: HorizontalSliderProps) {
    
    const {updateVolume,updateCrossFader} = usePlayerMutations()


    const setVolume = (value: number[]) => {
        const crossfaderVal = value[0];

        updateCrossFader.mutate(crossfaderVal);

        const dataVolA = { vol: Mixer(crossfaderVal).volumeA, deckId: 'deckA' };
        updateVolume.mutate(dataVolA);

        const dataVolB = { vol: Mixer(crossfaderVal).volumeB, deckId: 'deckB' };
        updateVolume.mutate(dataVolB);
    };

    const autoTransitionCrossfader = (
        startValue: number, 
        endValue: number,   
        duration: number    
    ) => {
        const stepTime = 10; 
        const totalSteps = duration / stepTime;
        const valueStep = (endValue - startValue) / totalSteps;

        let currentStep = 0;
        let currentValue = startValue;

        const intervalId = setInterval(() => {
            currentStep += 1;
            currentValue = startValue + valueStep * currentStep;

            setVolume([currentValue]);

            if (currentStep >= totalSteps) {
                clearInterval(intervalId); 
            }
        }, stepTime);
    };

    

    return (
        <div className='w-[100%] flex h-[70%] items-center justify-center'>
            <Slider.Root
                orientation="horizontal"
                value={[crossfader.position]} 
                max={50}
                min={-50}
                step={1}
                onValueChange={setVolume}
                aria-label="Volume"
                style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    width: '35%',
                }}
            >
                <Slider.Track
                    style={{
                        backgroundColor: 'black',
                        position: 'relative',
                        flexGrow: 1,
                        width: '100%',
                        border: '0px solid black',
                        height: '4px',
                        borderRadius: 2,
                    }}
                    className='slider-h-gradient'
                >
                    <Slider.Range
                        style={{
                            position: 'absolute',
                            background: 'transparent',
                            width: '100%',
                            borderRadius: 'inherit',
                        }}
                    />
                </Slider.Track>
                <Slider.Thumb
                    style={{
                        display: 'block',
                        width: 20,
                        height: 46,
                        backgroundColor: 'rgba(0,0,0,.8)',
                        borderRadius: '2px',
                        cursor: 'pointer',
                    }}
                    className='slider-morph'
                />
            </Slider.Root>
        </div>
    );
}
