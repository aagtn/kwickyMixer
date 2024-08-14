'use client'
import { useRef,useEffect } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';


interface YoutubePlayerPropsData {
    selectedVideo: string;
    playState: string;
    volume: number;
    seekTo:number;
    loop:boolean;
  }
  
  interface BgPlayerProps {
    data?: YoutubePlayerPropsData;
  }

export default function BgYoutubePlayer({data}:BgPlayerProps) {
    const playerRef = useRef<YouTube>(null);
    
    if (!data) {
        return <div className='p-6 w-full min-h-[250px]'>No track selected...</div>;
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

      useEffect(()=>{
        const player = playerRef.current?.internalPlayer;
        if(data.seekTo > 0 ){
          player.seekTo(data.seekTo);
          if(data.seekTo > 0 && data.playState === 'paused'){
            player.pauseVideo()
          }
        }
        
      },[data.seekTo])

      const handleEnd = () => {
        // const player = playerRef.current?.internalPlayer
        // if (data.loop) {      
        //   player.playVideo()
        // }
    
        // if (!data.loop) {
        //   updatePlayerState.mutate('paused')
        // }
      }

    const opts: YouTubeProps['opts'] = {
        height: '150%',
        width: '150%',
        playerVars: {
            autoplay: 0,
            controls: 0,
            iv_load_policy:3,
            modestbranding:1,      
            rel:0
        }
    };

    const handlePlayerReady: YouTubeProps['onReady'] = (event) => {
        const player = event.target;
    
        if (data?.volume !== undefined) {
          player.setVolume(0);
          player.setPlaybackQuality("highres")
        }
    
      };

    return (
        <div className='relative w-[100%] h-[100%] scale-[1] translate-x-[-25%]'>
            <YouTube
            ref={playerRef}
            onReady={handlePlayerReady}
            videoId={data.selectedVideo} 
            onEnd={handleEnd}
            opts={opts} 
            className='h-[100%] w-[100%] ' />
        </div>
    );
}
