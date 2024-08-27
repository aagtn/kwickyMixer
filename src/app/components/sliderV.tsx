'use client'
import '../styles/sliders.css'
import * as Slider from '@radix-ui/react-slider';
import { useState } from 'react';
import StandByMode from './standByMode';

export default function VerticalSlider({ volume, deckId }: any) {
    
    const [standby, setStandBy] = useState(true)

    if (standby) {
        return (
            <StandByMode />
        )
    }

    return (
        <div className='w-[50%] flex h-[80%] items-center justify-center mt-8'>
            <Slider.Root
                orientation="vertical"
                max={100}
                step={1}
                value={[volume]}
                aria-label="Volume"
                style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '70%', cursor: 'unset' }}
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
                            filter: "blur(2px)",
                        }}
                    />
                </Slider.Track>
            </Slider.Root>
        </div>
    );
}
