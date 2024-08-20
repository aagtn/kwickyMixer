'use client'
import { useRef, useEffect, useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { useMutations } from '../hooks/mutations';
import Image from 'next/image';

interface VideoObj {
  id: string;
  title: string;
  image: string;
}

interface YoutubePlayerPropsData {
  selectedVideo: VideoObj;
  playState: string;
  volume: number;
  seekTo: number;
  loop: boolean;
}


const opts: YouTubeProps['opts'] = {
  height: '150%',
  width: '150%',
  playerVars: {
    playlist: [],
    autoplay: 0,
    controls: 0,
    iv_load_policy: 3,
    modestbranding: 1,
    rel: 1
  }
};


export default function BgYoutubePlayer({ data, deckId }: { data: YoutubePlayerPropsData, deckId: string }) {
  const playerRef = useRef<YouTube>(null);
  const { updatePlayerState } = useMutations()
  const player = playerRef.current?.internalPlayer;

  useEffect(() => {

    if (!player) return;

    if (data.playState === 'playing') {
      player.playVideo();
    } else if (data.playState === 'paused') {
      player.pauseVideo();
    } else if (data.playState === 'resume') {
      player.seekTo(0);
    }

    if (data.loop) {
      player.setLoop(true)
    } else {
      player.setLoop(false)
    }

  }, [data.playState]);

  useEffect(() => {
    const player = playerRef.current?.internalPlayer
    if(!player) return
    if (data.selectedVideo) {
      player.cuePlaylist(data.selectedVideo.id)
    }
  }, [data.selectedVideo])

  useEffect(() => {
    const player = playerRef.current?.internalPlayer;
    if(!player) return
    if (data.seekTo > 0) {
      player.seekTo(data.seekTo);
      if (data.seekTo > 0 && data.playState === 'paused') {
        player.pauseVideo()
      }
    }

  }, [data.seekTo])

  const handleEnd = () => {
    if (!data.loop) {
      updatePlayerState.mutate({ state: 'paused', deck: deckId })
    }
  }

  const handlePlayerReady: YouTubeProps['onReady'] = (event) => {
    const player = event.target;
    if(!player) return
    if (data?.volume !== undefined) {
      player.setVolume(0);
    }

  };

  return (
    <div className={`relative w-[100%] h-[100%] scale-[1] ${data.playState === "playing" ? 'translate-x-[-25%]' : "blur-[50px]"}`}>
      {data.playState === "paused" &&
        <Image src={data.selectedVideo.image } width={1000} height={600} alt='cover' className='w-full h-full object-cover object-center scale-150' />
      }
      <YouTube
        ref={playerRef}
        onReady={handlePlayerReady}
        onEnd={handleEnd}
        opts={opts}
        className='h-[100%] w-[100%] ' />
    </div>
  );
}
