import '../styles/sliders.css';
import * as Slider from '@radix-ui/react-slider';
import Mixer from '../utils/mixer';
import { useMutations } from '../hooks/mutations';
import { useEffect, useState } from 'react';

interface CrossFader {
    position: number;
    autoMixStartAt: number;
    autoMixDuration: number;
    transitionInProcess: boolean;
}

interface HorizontalSliderProps {
    crossfader: CrossFader;
    deckA?: string;
    deckB?: string;
}

export default function HorizontalSlider({ crossfader, deckA, deckB }: HorizontalSliderProps) {

    const { updateVolume, updateCrossFader, updatePlayerState, updateTransitionInProcess } = useMutations();
    

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
                updateTransitionInProcess.mutate({ newValue: false });
            } else {
                current += stepSize;
                setTimeout(update, interval);
            }
        }

        update();
    }



    useEffect(() => {
        if (crossfader.transitionInProcess) {
            if (crossfader.position < 0) {
                startTransition(crossfader.position, 50, crossfader.autoMixDuration)
                if (deckB === "paused") {
                    updatePlayerState.mutate({ state: 'playing', deck: "deckB" })
                }

                if (deckB === "playing") {
                    updatePlayerState.mutate({ state: 'resume', deck: "deckB" })
                }
            }
            if (crossfader.position > 0) {
                startTransition(crossfader.position, -50, crossfader.autoMixDuration)
                if (deckA === "paused") {
                    updatePlayerState.mutate({ state: 'playing', deck: "deckA" })
                }

                if (deckA === "playing") {
                    updatePlayerState.mutate({ state: 'resume', deck: "deckA" })
                }
            }
        }
    }, [crossfader.transitionInProcess]);


    const setVolume = (value: number[]) => {
        const crossfaderVal = value[0];

        updateCrossFader.mutate(crossfaderVal);

        const dataVolA = { vol: Mixer(crossfaderVal).volumeA, deckId: 'deckA' };
        updateVolume.mutate(dataVolA);

        const dataVolB = { vol: Mixer(crossfaderVal).volumeB, deckId: 'deckB' };
        updateVolume.mutate(dataVolB);
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
