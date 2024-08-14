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

    // const updateVolume = useMutation({
    //     mutationFn: async (newVolume: number) => {
    //         return Promise.resolve(newVolume)
    //     },
    //     onSuccess: (data) => {
    //         const oppositeDeckId = deckId === "deckA" ? "deckB" : "deckA";

    //         queryClient.setQueryData([deckId], (oldData: any) => ({
    //             ...oldData,
    //             volume: data,
    //         }));

    //         queryClient.setQueryData([oppositeDeckId], (oldData: any) => ({
    //             ...oldData,
    //             volume: 100 - data,
    //         }));
    //     }
    // });


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
                style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '70%' }}
            >
                <Slider.Track
                    style={{
                        position: 'relative',
                        flexGrow: 1,
                        width: 4,                        
                        height: '100%',
                        borderRadius: 2,
                    }}
                    className='slider-inner-shadow'
                >
                    <Slider.Range
                        style={{
                            position: 'absolute',
                            background: 'blue',
                            width: '100%',
                            borderRadius: 'inherit',
                        }}
                    />
                </Slider.Track>
                {/* <Slider.Thumb
                    style={{
                        display: 'block',
                        width: 20,
                        height: 46,
                        //backgroundColor: "rgba(0,0,0,.8)",
                        borderRadius: '2px',
                        transform: "translateX(-8px)",
                        cursor: "pointer",
                    }}
                    className='slider-morph'
                /> */}
            </Slider.Root>
        </div>
    );
}
