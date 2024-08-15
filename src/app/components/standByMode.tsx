import * as Slider from '@radix-ui/react-slider';
import { useState, useEffect, useRef } from 'react';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function StandByMode() {
    const [eyeStyle, setEyeStyle] = useState({
        height: 100,
        translateX: 0,
        translateY: 0,
        transition: 0.4,
        followMouse: false,
        curve: "ease-in-out"
    });

    const eyeStyleRef = useRef(eyeStyle);
    eyeStyleRef.current = eyeStyle; 

    const [mouseTimer, setMouseTimer] = useState<NodeJS.Timeout | null>(null);

    const setEyesSize = async (size: number) => {
        setEyeStyle(prev => ({ ...prev, height: size }));
    };

    const moveEyeX = async (x: number) => {
        setEyeStyle(prev => ({ ...prev, translateX: x }));
        await delay(500);
    };

    const blink1 = async () => {
        await setEyesSize(0);
        await delay(200);
        await setEyesSize(10);
        await delay(150);
    };

    const blink2 = async () => {
        await setEyesSize(0);
        await delay(200);
        await setEyesSize(10);
        await delay(150);
        await setEyesSize(0);
        await delay(150);
        await setEyesSize(10);
    };

    const randomDelay = (min:number,max:number) => {
        return Math.random() * (max - min) + min
    }
    
    let inProcess = false
    
    const handleMouseStop = async () => {
        if(inProcess) return
        inProcess = true
        await delay(3000);  
        blink1()
        inProcess = false
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (!eyeStyleRef.current.followMouse) return;

        
        
        if (mouseTimer) {
            clearTimeout(mouseTimer);
        }

        const { clientX, clientY } = event;
        const eyeContainer = document.querySelector('.eye-container');
        if (eyeContainer) {
            const rect = eyeContainer.getBoundingClientRect();
            const eyeCenterX = rect.left + rect.width / 2;
            const eyeCenterY = rect.top + rect.height / 2;

            const deltaX = (clientX - eyeCenterX) / 30;
            const deltaY = (clientY - eyeCenterY) / 15;

            setEyeStyle(prev => ({
                ...prev,
                translateX: deltaX,
                translateY: deltaY,
                transition: 0.1,
                curve: "linear"
            }));
        }

        setMouseTimer(setTimeout(handleMouseStop, 1000));
    };

    useEffect(() => {
        const animate = async () => {
            await delay(1000);
            await setEyesSize(10);
            await delay(500);
            await moveEyeX(-10);
            await moveEyeX(10);
            await moveEyeX(0);
            await delay(500);
            await blink2();
            await delay(500);
            setEyeStyle(prev => ({ ...prev, followMouse: true }));
        };

        animate();

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (mouseTimer) clearTimeout(mouseTimer);
        };
    }, []);

    return (
        <div className='w-[50%] flex h-[80%] items-center justify-center mt-8 eye-container'>
            <Slider.Root
                orientation="vertical"
                max={100}
                step={1}
                value={[100]}
                aria-label="Volume"
                style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '70%', cursor: 'unset' }}
            >
                <Slider.Track
                    style={{
                        position: 'relative',
                        flexGrow: 1,
                        width: 10,
                        height: eyeStyle.height,
                        transform: `translate(${eyeStyle.translateX}px, ${eyeStyle.translateY}px)`,
                        borderRadius: 2,
                        transition: `${eyeStyle.transition}s ${eyeStyle.curve}`,
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
