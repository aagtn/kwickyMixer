import { useEffect, useRef } from 'react';
import '../styles/standbyanim.css';


export default function StandByMode() {
    const eyeRef = useRef<HTMLDivElement | null>(null);
    let timer = 0

    useEffect(() => {
        if (eyeRef.current) {
            setInterval(() => {
                timer++
                if (timer > 3) {
                    addBlink()
                    timer = 0
                }
            }, 1000)

            const activeFollow = (e: MouseEvent) => {
                if (eyeRef.current) {
                    timer = 0
                    const windW = window.innerWidth;
                    const windH = window.innerHeight;
                    const deltaX = e.clientX - (windW / 2)
                    const deltaY = e.clientY - (windH / 2)
                    const smoothness = 30
                    eyeRef.current.style.transform = `translate(${deltaX / smoothness}px, ${deltaY / smoothness}px)`;
                }
            };

            const addBlink = () => {

                eyeRef.current?.classList.add("blink")
                setTimeout(() => {
                    eyeRef.current?.classList.remove("blink")
                }, 1000)
            }

            setTimeout(() => {
                eyeRef.current?.classList.remove("intro")
            }, 2000)

            window.addEventListener('mousemove', activeFollow)

            return () => {
                window.removeEventListener('mousemove', activeFollow);
            };
        }
    }, [eyeRef])

    return (
        <div className='w-full flex h-[80%] items-center justify-center mt-8 '>
            <div ref={eyeRef} className="eye-container intro gpu-acc">
                <div className="eye gpu-acc"></div>
                <div className="eye gpu-acc"></div>
            </div>
        </div>
    );
}
