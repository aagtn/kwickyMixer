'use client'
import { PlayIcon, PauseIcon, ResumeIcon, LoopIcon, TrackNextIcon, TrackPreviousIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import React from 'react';
import { DeckId, MixTable } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { updatePlayerState, updateLoopState, playNextTrack, playPreviousTrack } from '../store/playerSlice';

export default function Controls({ deckId }: DeckId) {

    const [next, setNext] = useState<boolean>(false)
    const [prev, setPrev] = useState<boolean>(false)
    const [playerState, setPlayerState] = useState<string>("")
    const playState = useSelector((state: MixTable) => state.player[deckId].playState)
    const loop = useSelector((state: MixTable) => state.player[deckId].loop)
    const [prevPlayState, setPrevPlayState] = useState("")

    const dispatch = useDispatch()

    const handlePlayingState = (event: React.MouseEvent<HTMLDivElement>) => {
        const dataState = event.currentTarget.getAttribute('data-state');
        if (dataState) {
            dispatch(updatePlayerState({ deck: deckId, playState: dataState }))
            if (dataState === 'resume') {
                setTimeout(() => {
                    dispatch(updatePlayerState({ deck: deckId, playState: "playing" }))
                }, 1000)
            }
        }
    };


    const handleSetLoop = (event: React.MouseEvent<HTMLDivElement>) => {
        const dataState = event.currentTarget.getAttribute('data-state');
        if (dataState) {
            dispatch(updateLoopState({ deck: deckId }))
        }
    };

    const handleNextTrack = (event: React.MouseEvent<HTMLDivElement>) => {
        setNext(true)
        dispatch(playNextTrack({ deck: deckId }))
        setPrevPlayState(playState)
        dispatch(updatePlayerState({ deck: deckId, playState: "paused" }))       
  
    }

    const handlePreviousTrack = (event: React.MouseEvent<HTMLDivElement>) => {
        setPrev(true)
        dispatch(playPreviousTrack({ deck: deckId }))
        setPrevPlayState(playState)
        dispatch(updatePlayerState({ deck: deckId, playState: "paused" }))
    }

    useEffect(() => {
        setTimeout(() => {
            setNext(false)
            setPrev(false)
        }, 200)
    }, [next, prev])


    useEffect(() => {
        setPlayerState(playState)
    }, [playState])

    return (
        <div className={`w-full mt-8 flex `}>

            {/* Previous Button */}
            <div className='flex flex-col justify-center items-center mr-6'>
                <div
                    className='btn-morph p-4 cursor-pointer'
                    data-state={"resume"}
                    onClick={handlePreviousTrack}
                >
                    <TrackPreviousIcon className=' w-[20px] h-[20px] rgba(255,255,255,.6)' color={prev ? '#9db1ff' : "rgba(255,255,255,.6"} />
                </div>
                <div className='flex items-center justify-center mt-4'>
                    <div className={`absolute border border-black rounded-full z-20 ${prev ? "w-[2px] h-[2px] bg-blue-600 border-0" : ""}`}></div>
                    <div className={`w-[5px] h-[5px] rounded-full z-10 ${prev ? "bg-blue-600 blur-[2px] border-0" : ""}`}></div>
                    <div className='absolute w-[4px] h-[4px] bg-black rounded-full'></div>
                </div>
            </div>

            {/* Resume Button */}
            <div className='flex flex-col justify-center items-center mr-6'>
                <div
                    className='btn-morph p-4 cursor-pointer'
                    data-state={"resume"}
                    onClick={handlePlayingState}
                >
                    <ResumeIcon className=' w-[20px] h-[20px]' color={playerState === "resume" ? '#9db1ff' : "rgba(255,255,255,.6"} />
                </div>
                <div className='flex items-center justify-center mt-4'>
                    <div className={`absolute border border-black rounded-full z-20 ${playerState === "resume" ? ' w-[2px] h-[2px] bg-green-600 border-0 animate-ping' : "w-[4px] h-[4px] bg-black"}`}></div>
                    <div className={`w-[5px] h-[5px] rounded-full z-10 ${playerState === "resume" ? 'bg-green-600 blur-[2px] animate-ping' : ""}`}></div>
                    <div className='absolute w-[4px] h-[4px] bg-black rounded-full'></div>
                </div>
            </div>

            {/* Play / Pause Button */}

            <div className='flex flex-col justify-center items-center mr-6'>
                <div
                    className='btn-morph p-4 cursor-pointer'
                    data-state={playerState === "paused" ? "playing" : "paused"}
                    onClick={handlePlayingState}
                >
                    {playerState === "paused" ?
                        <PlayIcon className='w-[20px] h-[20px]' color='#9db1ff' />
                        :
                        <PauseIcon className='w-[20px] h-[20px]' color='rgb(202 138 4)' />
                    }
                </div>
                <div className='flex items-center justify-center mt-4'>
                    <div className={` absolute  border border-black rounded-full z-20 w-[2px] h-[2px] ${playerState === "paused" ? "bg-yellow-600 border-0 animate-ping" : "bg-blue-600 border-0"}`}></div>
                    <div className={`w-[5px] h-[5px] rounded-full z-10 ${playerState === "paused" ? 'bg-yellow-600 blur-[2px] animate-ping' : "bg-blue-600 blur-[2px]"}`}></div>
                    <div className='absolute w-[4px] h-[4px] bg-black rounded-full'></div>
                </div>
            </div>

            {/* Next Button */}
            <div className='flex flex-col justify-center items-center mr-6'>
                <div
                    className='btn-morph p-4 cursor-pointer'
                    data-state={"resume"}
                    onClick={handleNextTrack}
                >
                    <TrackNextIcon className='w-[20px] h-[20px] rgba(255,255,255,.6)' color={next ? '#9db1ff' : "rgba(255,255,255,.6"} />
                </div>
                <div className='flex items-center justify-center mt-4'>
                    <div className={`absolute border border-black rounded-full z-20 ${next ? "w-[2px] h-[2px] bg-blue-600 border-0" : ""}`}></div>
                    <div className={`w-[5px] h-[5px] rounded-full z-10 ${next ? "bg-blue-600 border-0 blur-[2px]" : ""}`}></div>
                    <div className='absolute w-[4px] h-[4px] bg-black rounded-full'></div>
                </div>
            </div>

            {/* Loop Button */}
            <div className='flex flex-col justify-center items-center mr-6'>
                <div
                    className='btn-morph p-4 cursor-pointer'
                    data-state={"loop"}
                    onClick={handleSetLoop}
                >
                    <LoopIcon className=' w-[20px] h-[20px]' color={loop ? 'rgb(34 197 94)' : "rgba(255,255,255,.6"} />
                </div>
                <div className='flex items-center justify-center mt-4'>
                    <div className={`absolute border border-black rounded-full z-20 ${loop ? 'w-[2px] h-[2px] bg-green-600 border-0 ' : "w-[4px] h-[4px] bg-black"}`}></div>
                    <div className={`w-[5px] h-[5px] rounded-full z-10 ${loop ? 'bg-green-600 blur-[2px] ' : ""}`}></div>
                    <div className='absolute w-[4px] h-[4px] bg-black rounded-full'></div>
                </div>
            </div>
        </div>
    )
}