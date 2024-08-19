'use client';
import { use, useEffect, useRef } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { useMutations } from '../hooks/mutations';
import { deckA } from '../data/decksParams';

interface VideoObj {
  id: string;
  title: string;
  image: string;
}

interface YoutubePlayerPropsData {
  selectedVideo: VideoObj;
  playState: string;
  volume: number;
  loop: boolean;
  deck: string;
  seekTo: number;
  playlist: VideoObj[]
}

interface YoutubePlayerProps {
  data?: YoutubePlayerPropsData;
  deckId?: string;
}

export default function YoutubePlayer({ data }: YoutubePlayerProps) {
  const playerRef = useRef<YouTube>(null);
  const { updateCurrentTime, updateDuration, playNextTrack } = useMutations();
  

  if (!data) {
    return <div className='p-6 w-full min-h-[250px]'>Waiting for a track...</div>;
  }

  useEffect(() => {
    const player = playerRef.current?.internalPlayer;

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

  }, [data.playState, data.loop]);

  useEffect(() => {
    const player = playerRef.current?.internalPlayer
    if (data.selectedVideo) {
      player.cuePlaylist(data.selectedVideo.id)
    }
  }, [data.selectedVideo])

  useEffect(() => {
    const player = playerRef.current?.internalPlayer;
    if (player && data.volume !== undefined) {
      player.setVolume(data.volume);
    }
  }, [data.volume]);

  useEffect(() => {
    const player = playerRef.current?.internalPlayer;
    if (data.seekTo > 0) {
      player.seekTo(data.seekTo);
      if (data.seekTo > 0 && data.playState === 'paused') {
        player.pauseVideo()
      }
    }

  }, [data.seekTo])

 

  const handlePlayerReady: YouTubeProps['onReady'] = (event) => {
    
    
    const player = event.target;
    if (data?.volume !== undefined) {
      player.setVolume(data.volume);
    }
  };


  const updateProgress = async () => {
    const player = playerRef.current?.internalPlayer
    const playerState = await player.getPlayerState()
   
    const updateTime = async () => {
    const currentTime = await player.getCurrentTime()
    const duration = player.getDuration()
    updateDuration.mutate({ currentTime: duration, deck: data.deck })
      
    if (player && playerState === 1) {
      requestAnimationFrame(updateTime);
      updateCurrentTime.mutate({ currentTime, deck: data.deck });     
    }
  }

  if(playerState
    && data.playState === "playing"
    && data.volume > 50){
    player.playVideo()
  }
  
  updateTime()

  }

  const handleEnd = () => {
    if (data.playlist && data.playlist.length > 0) {
      playNextTrack.mutate(data.deck)
      
    } else {
      console.error('Playlist is empty or does not exist');
    }
  }


  const opts: YouTubeProps['opts'] = {
    height: '250px',
    width: '100%',
    playerVars: {
      playlist: [],
      autoplay: 0,
      controls: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      rel: 1
    },
  }

  return (
    <YouTube
      onReady={handlePlayerReady}
      onStateChange={updateProgress}
      onEnd={handleEnd}
      opts={opts}
      ref={playerRef}
      className="h-[100%]"
    />
  );
}
