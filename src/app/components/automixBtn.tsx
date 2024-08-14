import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { useState } from "react";
export default function AutoMixBtn() {
    const [autoTransition, setAutoTransition] = useState<boolean>(true)
    const handleAutoTrans = () => {
        setAutoTransition((prev)=> !prev)
    }

    return (
        <div className="w-[40%] btn-morph flex justify-evenly" onClick={handleAutoTrans}>
            <DoubleArrowRightIcon color={autoTransition ? "#9db1ff" : "rgba(255,255,255,.6"} />
            <div className='flex items-center justify-center '>
                <div className={`absolute border border-black rounded-full z-20 ${autoTransition ? ' w-[2px] h-[2px] bg-blue-600 border-0 ' : "w-[4px] h-[4px] bg-black"}`}></div>
                <div className={`w-[5px] h-[5px] rounded-full z-10 ${autoTransition ? 'bg-blue-600 blur-[2px] ' : ""}`}></div>
                <div className='absolute w-[4px] h-[4px] bg-black rounded-full'></div>
            </div>
            < DoubleArrowLeftIcon color={autoTransition ? "#9db1ff" : "rgba(255,255,255,.6"} />
        </div>
    )
}