'use client';
import { useEffect, useRef } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { usePlayerMutations } from '../hooks/mutations';

interface YoutubePlayerPropsData {
  selectedVideo: string;
  playState: string;
  volume: number;
  loop: boolean;
  deck: string;
  seekTo: number;
}

interface YoutubePlayerProps {
  data?: YoutubePlayerPropsData;
  deckId?: string;
}

export default function YoutubePlayer({ data }: YoutubePlayerProps) {
  const playerRef = useRef<YouTube>(null);
  const { updateCurrentTime, updateDuration, updatePlayerState } = usePlayerMutations();
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
  }, [data.playState]);

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
    const duration = player.getDuration()

    updateDuration.mutate({currentTime:duration,deck: data.deck})

    if (data?.volume !== undefined) {
      player.setVolume(data.volume);
    }
  };

  const handleEnd = () => {
    const player = playerRef.current?.internalPlayer
    if (data.loop) {      
      player.playVideo()
    }

    if (!data.loop) {
      updatePlayerState.mutate({state:'paused',deck:data.deck})
    }
  }

  const updateProgress = async () => {

    const player = playerRef.current?.internalPlayer
    const playerState = await player.getPlayerState()
    const currentTime = await player.getCurrentTime()
    if (player && playerState === 1) {
      requestAnimationFrame(updateProgress);
      updateCurrentTime.mutate({ currentTime, deck: data.deck});
    }

  };

  const opts: YouTubeProps['opts'] = {
    height: '250px',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      rel: 1
    },
  };

  return (
    <YouTube
      videoId={data.selectedVideo}
      onReady={handlePlayerReady}
      onStateChange={updateProgress}
      onEnd={handleEnd}
      opts={opts}
      ref={playerRef}
      className="h-[100%]"
    />
  );
}
