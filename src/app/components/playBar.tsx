import * as Slider from '@radix-ui/react-slider';
import { useEffect, useState } from 'react';
import { GetTimeless } from '../utils/timeFunc';
import { usePlayerMutations } from '../hooks/mutations';

interface ProgressBarParams {
    time: number;
    duration: number;
    deck: string;
    seekTo: number;
}

interface ProgressBarProps {
    data: ProgressBarParams;
}

export default function ProgressBar({ data }: ProgressBarProps) {
    const [progress, setProgress] = useState<number>(0);
    const [remainingTime, setRemainingTime] = useState<string>();
    const [hoverPercent, setHoverPercent] = useState<number | null>(null);
    const [hoverTime, setHoverTime] = useState<string | null>(null);
    const { updateSeekTo } = usePlayerMutations()


    useEffect(() => {
        if (data.duration > 0) {
            const progressPercent = (data.time / data.duration) * 100;
            const timeR = data.duration - data.time;
            const lessTime = GetTimeless(timeR);
            setRemainingTime(lessTime);
            setProgress(progressPercent);
        }
    }, [data.time, data.duration]);


    const setPlayProgress = (value: number[]) => {
        updateSeekTo.mutate({currentTime:value[0],deck:data.deck,trackDuration:data.duration})
        setProgress(value[0]);
        
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        const sliderWidth = event.currentTarget.clientWidth;
        const offsetX = event.nativeEvent.offsetX;
        const hoverPercentValue = (offsetX / sliderWidth) * 100;
        setHoverPercent(hoverPercentValue);

        const hoverTimeInSec = (hoverPercentValue / 100) * data.duration;
        const formattedHoverTime = GetTimeless(hoverTimeInSec);
        setHoverTime(formattedHoverTime);
    };

    const handleMouseLeave = () => {
        setHoverPercent(null); 
        setHoverTime(null);  
    };

    return (
        <div className='w-[100%] flex h-[20px] mt-6 items-center '>
            <Slider.Root
                orientation="horizontal"
                value={[progress]}
                max={100}
                min={0}
                step={1}
                onValueChange={setPlayProgress}
                aria-label="Volume"
                style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    width: '80%',
                    cursor: 'pointer',
                    borderRadius: "8px",
                }}
                className='btn-morph play-bar'
                onMouseMove={handleMouseMove}  
                onMouseLeave={handleMouseLeave} 
            >
                <Slider.Track
                    style={{
                        backgroundColor: 'transparent',
                        position: 'relative',
                        display: 'flex',
                        alignItems: "center",
                        flexGrow: 1,
                        width: '100%',
                        height: '80%',
                        borderRadius: '9px',
                    }}
                >
                    {/* Progress Bar */}
                    <Slider.Range
                        style={{
                            position: 'absolute',
                            height: '80%',
                            borderRadius: 'inherit',
                            width: `${progress}%`,
                            filter: 'blur(2px)',
                        }}
                        className='slider-h-gradient-playBar'
                    />
                    {/* Progress Hover Bar */}
                    {hoverPercent !== null && (
                        <div
                            style={{
                                position: 'absolute',
                                height: '100%',
                                borderRadius: '2px',
                                width: `${hoverPercent}%`,
                                backgroundColor: 'rgba(0, 0, 0, 0.3)', 
                                
                            }}
                        />
                    )}
                </Slider.Track>
                
                {hoverTime && (
                    <div style={{
                        position: 'absolute',
                        top: '-25px',
                        left: `${hoverPercent}%`,
                        transform: 'translateX(-50%)',
                        color: 'white',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        padding: '2px 5px',
                        borderRadius: '4px',
                        fontSize: '12px',
                    }}>
                        {hoverTime}
                    </div>
                )}
            </Slider.Root>
            {remainingTime && <div style={{ color: 'rgba(255,255,255,.6)' }} className='text-sm ml-4 blur-[.3px]'>{remainingTime}</div>}
        </div>
    );
}
