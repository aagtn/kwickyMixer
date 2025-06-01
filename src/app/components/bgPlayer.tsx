'use client'
import { useRef, useEffect, useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { useDispatch, useSelector } from 'react-redux';
import { DeckId, MixTable } from '../types';
import { updatePlayerState } from '../store/playerSlice';

const opts: YouTubeProps['opts'] = {
  height: '150%',
  width: '150%',
  playerVars: {
    playlist: [],
    controls: 0,
    iv_load_policy: 3,
    modestbranding: 1,
    rel: 0,
  },
};

export default function BgYoutubePlayer({ deckId }: DeckId) {
  const playerRef = useRef<YouTube>(null);
  const dispatch = useDispatch();
  const [playerReady, setPlayerReady] = useState(false);

  const playState = useSelector((state: MixTable) => state.player[deckId].playState);
  const loop = useSelector((state: MixTable) => state.player[deckId].loop);
  const selectedVideo = useSelector((state: MixTable) => state.player[deckId].selectedVideo);
  const seekTo = useSelector((state: MixTable) => state.player[deckId].seekTo);
  const volume = useSelector((state: MixTable) => state.player[deckId].volume);

  const handlePlayerReady: YouTubeProps['onReady'] = (event) => {
    const player = event.target;
    if (volume !== undefined) player.setVolume(0); // mute bg
    setPlayerReady(true);

    if (selectedVideo) {
      if (playState === 'playing') {
        player.loadPlaylist([selectedVideo.id]);
        player.playVideo();
      } else {
        player.cuePlaylist([selectedVideo.id]);
      }
    }
  };

  const handleEnd = () => {
    if (!loop) {
      dispatch(updatePlayerState({ deck: deckId, playState: 'paused' }));
    }
  };

  useEffect(() => {
    const player = playerRef.current?.internalPlayer;
    if (!player || !playerReady) return;

    if (seekTo > 0) {
      player.seekTo(seekTo);
      if (playState === 'paused') {
        player.pauseVideo();
      }
    }
  }, [seekTo, playState, playerReady]);

  useEffect(() => {
    const player = playerRef.current?.internalPlayer;
    if (!player || !playerReady) return;

    // Loop
    player.setLoop(loop || false);

    // Play state
    if (playState === 'playing') {
      player.playVideo();
    } else if (playState === 'paused') {
      player.pauseVideo();
    } else if (playState === 'resume') {
      player.seekTo(0);
    }
  }, [playState, loop, playerReady]);

  useEffect(() => {
    const player = playerRef.current?.internalPlayer;
    if (!player || !playerReady) return;

    if (selectedVideo) {
      if (playState === 'playing') {
        player.loadPlaylist([selectedVideo.id]);
        player.playVideo();
      } else {
        player.cuePlaylist([selectedVideo.id]);
      }
    }
  }, [selectedVideo, playState, playerReady]);

  return (
    <div
      className={`relative w-full h-full scale-[1] ${
        playState === 'playing' ? 'translate-x-[-25%]' : 'blur-[50px]'
      }`}
    >
      <YouTube
        ref={playerRef}
        onReady={handlePlayerReady}
        onEnd={handleEnd}
        opts={opts}
        className="h-full w-full"
      />
    </div>
  );
}
