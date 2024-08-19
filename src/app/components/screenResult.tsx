import '../styles/screenResult.css';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import Image from 'next/image';
import PlaylistMenu from './contextMenu';
import { useMutations} from '../hooks/mutations';
import { useState, useEffect } from 'react';

interface VideoObj {
    id: string;
    title: string;
    image: string;
}

interface DataObj {
    searchInput: string;
    videos: VideoObj[];
    volume: number;
    playState: string;
    selectedVideo: VideoObj;
    loop: boolean;
    currentTime: number;
    trackDuration: number;
    seekTo: number;
    playlist: VideoObj[];
    playlistActive?: boolean;
}

export default function ScreenResult({ data, deckId }: { data: DataObj, deckId: string }) {
    const { updateSelectedVideo,updatePlayerState,addToPlayList } = useMutations();
    

    const handleSelectedVideo = (event: React.MouseEvent<HTMLInputElement>) => {
        const key = event.currentTarget.getAttribute('data-key');
        const image = event.currentTarget.getAttribute('data-image');
        const title = event.currentTarget.getAttribute('data-title');
        if (key) {
            updatePlayerState.mutate({ state: 'paused', deck: deckId });
            const data = {
                id: key,
                image: image || "",
                title: title || "",
            };
            updateSelectedVideo.mutate({ newVideo: data, deck: deckId });
        }
    };

    const handleAddToPlaylist = (event: React.MouseEvent<HTMLImageElement>) => {
        const key = event.currentTarget.getAttribute('data-key');
        const image = event.currentTarget.getAttribute('data-image');
        const title = event.currentTarget.getAttribute('data-title');
        if (key) {
            const data = {
                id: key,
                image: image || "",
                title: title || "",
            };
            addToPlayList.mutate({ data: data, deck: deckId});
        }
    };

    const isInPlaylist = (video: VideoObj) => {
        return data.playlist.findIndex(track => track.id === video.id);
    };

    return (
       
        <ScrollArea.Root className={`${data.playlistActive ? "ScrollAreaRootPlaylist" : "ScrollAreaRoot"}`}>
            <ScrollArea.Viewport className="ScrollAreaViewport m-2">
                <div className='shadow-b w-full h-[40px] absolute bottom-0'></div>
                <div className='shadow-t w-full h-[10px] absolute'></div>
                {data.playlistActive ?
                    <div style={{ padding: '15px 20px' }}>
                        {data.playlist.length > 0 && (
                            <div>
                                <div className='text-white pt-2 text-sm'>Playing:</div>
                                <div className={`Tag flex cursor-pointer text-white items-center playlist-first-title`}>
                                    <div className='w-[40px] h-[30px] flex items-center object-cover overflow-hidden rounded mr-3 bg-slate-900'>
                                        {data.selectedVideo.image ?
                                            <Image src={data.selectedVideo.image || ''} width={60} height={60} alt='cover' className='object-cover' />
                                            :
                                            <div className='w-[60px] h-[60px] bg-gray-900'></div>
                                        }
                                    </div>
                                    <div className='pr-8 hover:text-blue-500'>{data.selectedVideo.title}</div>
                                </div>
                                <div className='text-white pt-5 text-sm font-semibold'>Next:</div>
                            </div>
                        )}
                        {data.playlist.length > 0 ? (
                            data.playlist.map((video, index) => (
                                video.id !== data.selectedVideo.id &&
                                <div key={index}>
                                    <PlaylistMenu index={index} data={video} deck={deckId}>
                                        <div className={`Tag-playlist flex cursor-pointer py-2 text-white items-center`}>
                                            <div className='w-[40px] min-w-[40px] h-[30px] flex items-center object-cover bg-red-500 overflow-hidden rounded mr-3 bg-slate-900'>
                                                <Image src={video.image} width={60} height={60} alt='cover' className='object-cover' />
                                            </div>
                                            <div className='pr-8 hover:text-blue-500' data-key={video.id} data-img={video.image} data-title={video.title}>{video.title}</div>
                                        </div>
                                    </PlaylistMenu>
                                </div>
                            ))
                        ) : (
                            <div className="NoResults"> No track in playlist </div>
                        )}
                    </div>
                    :
                    <div style={{ padding: '15px 20px' }}>
                        {data.videos.length > 0 ? (
                            data.videos.map((video) => (
                                <div className={`Tag flex text-white items-center ${ data.selectedVideo.id === video.id ? "selected" : ""}`} key={video.id}>
                                    <div className='w-[40px] min-w-[40px] h-[30px] flex items-center object-cover bg-red-500 overflow-hidden rounded mr-3 bg-slate-900'>
                                        <Image src={video.image} width={60} height={60} alt='cover' className='object-cover' />
                                    </div>
                                    <div className='pr-8 cursor-pointer' onClick={handleSelectedVideo} data-key={video.id} data-title={video.title} data-image={video.image}>{video.title}</div>
                                    {isInPlaylist(video) < 0 ?
                                        <Image src={'/playlist_add.svg'} width={20} height={20} alt="playlist icon" data-key={video.id} data-image={video.image} data-title={video.title} className="ml-auto opacity-60 hover:opacity-100 mr-3 cursor-pointer" onClick={handleAddToPlaylist} />
                                        :
                                        <Image src={'/playlist_add_check.svg'} width={20} height={20} alt="playlist icon" className="ml-auto opacity-60 mr-3" />
                                    }
                                </div>
                            ))
                        ) : (
                            <div className="NoResults"> No results found </div>
                        )}
                    </div>
                }
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
                <ScrollArea.Thumb className="ScrollAreaThumb" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="horizontal">
                <ScrollArea.Thumb className="ScrollAreaThumb" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner className="ScrollAreaCorner" />
        </ScrollArea.Root>
    );
}

