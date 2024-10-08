'use client';
import { useEffect, useRef, useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentTime, updateDuration, playNextTrack,loadingVideo, updatePlayerState } from '../store/playerSlice';
import { DeckId, MixTable } from '../types';

const opts: YouTubeProps['opts'] = {
  height: '250px',
  width: '100%',
  playerVars: {
    playlist: [], 
    controls: 0,
    iv_load_policy: 3,
    modestbranding: 1,
    rel: 1
  },
}

export default function YoutubePlayer({ deckId }: DeckId) {

  const playerRef = useRef<YouTube>(null);


  const dispatch = useDispatch();

  const [playerReady, setPlayerReady] = useState(false)
  const selectedVideo = useSelector((state: MixTable) => state.player[deckId].selectedVideo)
  const playState = useSelector((state: MixTable) => state.player[deckId].playState)
  const loop = useSelector((state: MixTable) => state.player[deckId].loop)
  const volume = useSelector((state: MixTable) => state.player[deckId].volume)
  const seekTo = useSelector((state: MixTable) => state.player[deckId].seekTo)
  const playlist = useSelector((state: MixTable) => state.player[deckId].playlist)
  const transitionInProcess = useSelector((state:MixTable) => state.player.mixer.transitionInProcess)

  useEffect(() => {
    const player = playerRef.current?.internalPlayer;

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
    if (selectedVideo && playerReady) {
      player.cuePlaylist(selectedVideo.id)
    }
  }, [selectedVideo])

  useEffect(() => {
    const player = playerRef.current?.internalPlayer;
    if (player && volume !== undefined) {
      player.setVolume(volume);
    }
  }, [volume]);

  useEffect(() => {
    const player = playerRef.current?.internalPlayer;
    if (seekTo > 0) {
      player.seekTo(seekTo);
      if (seekTo > 0 && playState === 'paused') {
        player.pauseVideo()
      }
    }
  }, [seekTo])

  useEffect(()=>{

    const getPlayerState = async()=>{
      const player = playerRef.current?.internalPlayer;
      const playerState = await player.getPlayerState()
      
      if(transitionInProcess && playerState === 5){
        player.playVideo()
      }
    }
 
    getPlayerState()
  },[transitionInProcess])


  const handlePlayerReady: YouTubeProps['onReady'] = (event) => {
    const player = event.target;
    setPlayerReady(true)
    if (volume !== undefined) {
      player.setVolume(volume);
    }
    if (selectedVideo) {
      player.cuePlaylist(selectedVideo.id)
    }
  };


  const setNewState = async () => {

    const player = playerRef.current?.internalPlayer
    
    const playerState = await player.getPlayerState()
    const duration = await player.getDuration()

    if(playerState === -1){
      dispatch(loadingVideo({deck:deckId,isLoading:true}))
    }

    if(playerState === 5){
      dispatch(updatePlayerState({deck:deckId,playState:"paused"}))
      dispatch(loadingVideo({deck:deckId,isLoading:false}))
    }
      
    dispatch(updateDuration({ deck: deckId, trackDuration: duration }));

    if (playerState === 1) {
      
      dispatch(loadingVideo({deck:deckId,isLoading:false}))
      dispatch(updatePlayerState({deck:deckId,playState:"playing"}))

      let lastUpdateTime = 0;
      const updateTime = async () => {
        const playerCurrentTime = await player.getCurrentTime()
        const now = Date.now();
        if (now - lastUpdateTime > 1000) {
          const currentTime = Math.round(playerCurrentTime)
          dispatch(updateCurrentTime({ deck: deckId, currentTime: currentTime }));
          lastUpdateTime = now;
        }
        requestAnimationFrame(updateTime);
      };
      
      updateTime()
    }

  }

  const handleEnd = () => {
    if (playlist && playlist.length > 0) {
      dispatch(playNextTrack({ deck: deckId }))
    } else {
      console.error('Playlist is empty or does not exist');
    }
  }


  return (

    <YouTube
      onReady={handlePlayerReady}
      onStateChange={setNewState}
      onEnd={handleEnd}
      opts={opts}
      ref={playerRef}
      className="h-[100%]"
    />

  );
}
