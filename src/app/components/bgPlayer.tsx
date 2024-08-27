'use client'
import { useRef, useEffect } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { DeckId, MixTable } from '../types';
import { updatePlayerState } from '../store/playerSlice';


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


export default function BgYoutubePlayer({ deckId }: DeckId) {
  const playerRef = useRef<YouTube>(null);

  const dispatch = useDispatch()

  const playState = useSelector((state: MixTable) => state.player[deckId].playState)
  const loop = useSelector((state: MixTable) => state.player[deckId].loop)
  const selectedVideo = useSelector((state: MixTable) => state.player[deckId].selectedVideo)
  const seekTo = useSelector((state: MixTable) => state.player[deckId].seekTo)
  const volume = useSelector((state: MixTable) => state.player[deckId].volume)
  const player = playerRef.current?.internalPlayer;


  useEffect(() => {

    if (!player) return;

    if (playState === 'playing') {
      player.playVideo();
    } else if (playState === 'paused') {
      player.pauseVideo();
    } else if (playState === 'resume') {
      player.seekTo(0);
    }

    if (loop) {
      player.setLoop(true)
    } else {
      player.setLoop(false)
    }

  }, [playState, loop]);

  useEffect(() => {
    const player = playerRef.current?.internalPlayer
    if (!player) return
    if (selectedVideo) {
      player.cuePlaylist(selectedVideo.id)
    }
  }, [selectedVideo])

  useEffect(() => {
    const player = playerRef.current?.internalPlayer;
    if (!player) return
    if (seekTo > 0) {
      player.seekTo(seekTo);
      if (seekTo > 0 && playState === 'paused') {
        player.pauseVideo()
      }
    }

  }, [seekTo])

  const handleEnd = () => {
    if (!loop) {
      dispatch(updatePlayerState({ deck: deckId, playState: "paused" }))
    }
  }

  const handlePlayerReady: YouTubeProps['onReady'] = (event) => {
    const player = event.target;
    if (!player) return
    if (volume !== undefined) {
      player.setVolume(0);
    }

  };

  return (
    <div className={`relative w-[100%] h-[100%] scale-[1] ${playState === "playing" ? 'translate-x-[-25%]' : "blur-[50px]"}`}>
      {playState === "paused" &&
        <Image src={selectedVideo?.image || ""} width={1000} height={600} alt='cover' className='w-full h-full object-cover object-center scale-150' />
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
