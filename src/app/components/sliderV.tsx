'use client'
import '../styles/sliders.css'
import * as Slider from '@radix-ui/react-slider';
import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { usePlayerMutations } from '../hooks/mutations';

interface VerticalSliderProps {
    volume: number;
    deckId: string;
}

export default function VerticalSlider({ volume, deckId }: VerticalSliderProps) {
    //const queryClient = useQueryClient();
    const {updateVolume} = usePlayerMutations()

    const [volumeState, setVolumeState] = useState<number>(volume);

    const setVolume = (value: number[]) => {
        const newVolume = value[0];
        setVolumeState(newVolume);
        updateVolume.mutate(newVolume)
    };

    return (
        <div className='w-[50%] flex h-[80%] items-center justify-center mt-8'>
            <Slider.Root
                orientation="vertical"
                max={100}
                step={1}
                value={[volume]}
                onValueChange={setVolume}
                aria-label="Volume"
                style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '70%',cursor:'unset' }}
            >
                <Slider.Track
                    style={{
                        position: 'relative',
                        flexGrow: 1,
                        width: 10,                        
                        height: '100%',
                        borderRadius: 2,
                    }}
                    className='slider-vol-morph flex justify-center'
                >
                    <Slider.Range
                        style={{
                            position: 'absolute',
                            background: 'blue',
                            width: '60%',
                            borderRadius: 'inherit',
                            filter:"blur(2px)",
                        }}
                    />
                </Slider.Track>
            </Slider.Root>
        </div>
    );
}
