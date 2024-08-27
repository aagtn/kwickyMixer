import '../styles/sliders.css';
import * as Slider from '@radix-ui/react-slider';
import Mixer from '../utils/mixer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MixTable } from '../types';
import { updateCrossFader, updatePlayerState, updateTransitionInProcess, updateVolume } from '../store/playerSlice';


export default function HorizontalSlider() {

    
    const transitionInProcess = useSelector((state:MixTable)=> state.player.mixer.transitionInProcess)
    const position = useSelector((state:MixTable)=> state.player.mixer.position)
    const autoMixDuration = useSelector((state:MixTable)=> state.player.mixer.autoMixDuration)
    const deckAplayState = useSelector((state:MixTable)=> state.player.deckA.playState)
    const deckBplayState = useSelector((state:MixTable)=> state.player.deckB.playState)
    const dispatch = useDispatch()

    function startTransition(start: number, end: number, durationInSeconds: number) {
        let startT = start;
        let endT = end;
        let current = startT;
        let steps = 100;
        let stepSize = (endT - startT) / steps;
        let interval = (durationInSeconds * 1000) / steps;

        function update() {

            setVolume([current]);

            let reachedEnd = (stepSize > 0) ? current >= endT : current <= endT;

            if (reachedEnd) {
                setVolume([endT]);
                dispatch(updateTransitionInProcess(false))
            } else {
                current += stepSize;
                setTimeout(update, interval);
            }
        }

        update();
    }



    useEffect(() => {
        if (transitionInProcess) {
            if (position < 0) {
                startTransition(position, 50, autoMixDuration)
                
                if (deckBplayState === "paused") {
                    dispatch(updatePlayerState({deck:"deckB",playState:"playing"}))
                }

                if (deckBplayState === "playing") {
                    dispatch(updatePlayerState({deck:"deckB",playState:"resume"}))
                }
            }
            if (position > 0) {
                startTransition(position, -50, autoMixDuration)
                
                if (deckAplayState === "paused") {
                    dispatch(updatePlayerState({deck:"deckA",playState:"playing"}))
                }

                if (deckAplayState === "playing") {
                    dispatch(updatePlayerState({deck:"deckA",playState:"resume"}))
                }
            }
        }
    }, [transitionInProcess]);


    const setVolume = (value: number[]) => {
        const crossfaderVal = value[0];

        dispatch(updateCrossFader(crossfaderVal))

        dispatch(updateVolume({deck:"deckA",volume:Mixer(crossfaderVal).volumeA}))

        dispatch(updateVolume({deck:"deckB",volume:Mixer(crossfaderVal).volumeB}))

    };

    return (
        <div className='w-[100%] flex h-[70%] items-center justify-center'>
            <Slider.Root
                orientation="horizontal"
                value={[position]}
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
