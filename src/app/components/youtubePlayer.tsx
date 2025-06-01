'use client';
import { useEffect, useRef, useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateCurrentTime,
  updateDuration,
  playNextTrack,
  loadingVideo,
  updatePlayerState,
} from '../store/playerSlice';
import { DeckId, MixTable } from '../types';

const opts: YouTubeProps['opts'] = {
  height: '250px',
  width: '100%',
  playerVars: {
    playlist: [],
    controls: 0,
    iv_load_policy: 3,
    modestbranding: 1,
    rel: 1,
  },
};

export default function YoutubePlayer({ deckId }: DeckId) {
  const playerRef = useRef<YouTube>(null);
  const dispatch = useDispatch();
  const [playerReady, setPlayerReady] = useState(false);

  const selectedVideo = useSelector((state: MixTable) => state.player[deckId].selectedVideo);
  const playState = useSelector((state: MixTable) => state.player[deckId].playState);
  const loop = useSelector((state: MixTable) => state.player[deckId].loop);
  const volume = useSelector((state: MixTable) => state.player[deckId].volume);
  const seekTo = useSelector((state: MixTable) => state.player[deckId].seekTo);
  const playlist = useSelector((state: MixTable) => state.player[deckId].playlist);
  const transitionInProcess = useSelector((state: MixTable) => state.player.mixer.transitionInProcess);

  const handlePlayerReady: YouTubeProps['onReady'] = (event) => {
    setPlayerReady(true);
    const player = event.target;

    if (volume !== undefined) player.setVolume(volume);
  };

  const handleEnd = () => {
    if (playlist && playlist.length > 0) {
      dispatch(playNextTrack({ deck: deckId }));
    } else {
      console.error('Playlist is empty or does not exist');
    }
  };

  useEffect(() => {
    const player = playerRef.current?.internalPlayer;

    if (!player) return;

    // Volume control
    if (volume !== undefined) {
      player.setVolume(volume);
    }

    // Loop
    player.setLoop(loop || false);
  }, [loop, volume]);

  // Handle cue + autoplay when ready
  useEffect(() => {
    const player = playerRef.current?.internalPlayer;

    if (playerReady && selectedVideo) {
      if (playState === 'playing') {
        player.loadPlaylist([selectedVideo.id]);
        player.playVideo();
      } else {
        player.cuePlaylist([selectedVideo.id]);
      }
    }
  }, [playerReady, selectedVideo, playState]);

  // Handle seek
  useEffect(() => {
    const player = playerRef.current?.internalPlayer;

    if (player && seekTo > 0) {
      player.seekTo(seekTo);
      if (playState === 'paused') {
        player.pauseVideo();
      }
    }
  }, [seekTo, playState]);

  // Handle transition
  useEffect(() => {
    const player = playerRef.current?.internalPlayer;

    const checkState = async () => {
      const state = await player?.getPlayerState();
      if (transitionInProcess && state === 5) {
        player?.playVideo();
      }
    };

    checkState();
  }, [transitionInProcess]);

  // Handle player state changes (playing, paused, etc.)
  const handleStateChange = async () => {
    const player = playerRef.current?.internalPlayer;

    if (!player) return;

    const state = await player.getPlayerState();
    const duration = await player.getDuration();

    if (state === -1) {
      dispatch(loadingVideo({ deck: deckId, isLoading: true }));
    }

    if (state === 5) {
      dispatch(updatePlayerState({ deck: deckId, playState: 'paused' }));
      dispatch(loadingVideo({ deck: deckId, isLoading: false }));
    }

    if (state === 1) {
      dispatch(loadingVideo({ deck: deckId, isLoading: false }));
      dispatch(updatePlayerState({ deck: deckId, playState: 'playing' }));
      dispatch(updateDuration({ deck: deckId, trackDuration: duration }));

      let lastUpdateTime = 0;
      const updateTime = async () => {
        const now = Date.now();
        if (now - lastUpdateTime > 1000) {
          const currentTime = Math.round(await player.getCurrentTime());
          dispatch(updateCurrentTime({ deck: deckId, currentTime }));
          lastUpdateTime = now;
        }
        requestAnimationFrame(updateTime);
      };
      updateTime();
    }
  };

  return (
    <YouTube
      ref={playerRef}
      onReady={handlePlayerReady}
      onStateChange={handleStateChange}
      onEnd={handleEnd}
      opts={opts}
      className="h-[100%]"
    />
  );
}
