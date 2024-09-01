import '../styles/screenResult.css';
import Image from 'next/image';
import PlaylistMenu from './contextMenu';
import { PlaylistItem } from '../types';
import { useRef } from 'react';
import { DeckId, MixTable } from '../types';
import { useSelector, useDispatch } from 'react-redux';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { updateSelectedVideo, addToPlayList } from '../store/playerSlice';

export default function ScreenResult({ deckId }: DeckId) {

    const dispatch = useDispatch()
    const playlist = useSelector((state: MixTable) => state.player[deckId].playlist)
    const playlistActive = useSelector((state: MixTable) => state.player[deckId].playlistActive)
    const selectedVideo = useSelector((state: MixTable) => state.player[deckId].selectedVideo)
    const videos = useSelector((state: MixTable) => state.player[deckId].videos)
    const pmRef = useRef(null);

    const handleSelectedVideo = (event: React.MouseEvent<HTMLInputElement>) => {
        const key = event.currentTarget.getAttribute('data-key');
        const image = event.currentTarget.getAttribute('data-image');
        const title = event.currentTarget.getAttribute('data-title');

        if (key) {
            const data = {
                id: key,
                image: image || "",
                title: title || "",
            };

            dispatch(updateSelectedVideo({ deck: deckId, selectedVideo: data }))
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

            dispatch(addToPlayList({ deck: deckId, newItem: data }))
        }
    };

    const handleRightClick = () => {
       
    }

    const isInPlaylist = (video: PlaylistItem) => {
        return playlist.findIndex(track => track.id === video.id);
    };

    return (
       
            <div className={`${playlistActive ? "playlist" : "screen-result"} rounded-lg relative  my-4 overflow-y-scroll overflow-hidden screen-morph gpu-acc w-full`}>
                <div className="relative bg-black h-fit w-full">
                    {playlistActive ?
                        <div style={{ padding: '15px 20px' }}>

                            {playlist.length > 0 && (
                                <div>
                                    <div className='text-white pt-2 text-sm'>Playing:</div>
                                    <div className={`Tag flex cursor-pointer text-white items-center playlist-first-title`}>
                                        <div className='w-[40px] h-[30px] flex items-center object-cover overflow-hidden rounded mr-3 bg-slate-900'>
                                            {selectedVideo?.image ?
                                                <Image src={selectedVideo.image || ''} width={60} height={60} alt='cover' className='object-cover' />
                                                :
                                                <div className='w-[60px] h-[60px] bg-gray-900'></div>
                                            }
                                        </div>
                                        <div className='pr-8 hover:text-blue-500'>{selectedVideo?.title}</div>
                                    </div>
                                    <div className='text-white pt-5 text-sm font-semibold'>Next:</div>
                                </div>
                            )}
                            {playlist.length > 0 ? (
                                playlist.map((video, index) => (
                                    video.id !== selectedVideo?.id &&
                                    <div key={index}>
                                        <PlaylistMenu index={index} data={video} deckId={deckId}>
                                            <div className={`Tag-playlist flex cursor-pointer py-2 text-white items-center`}>
                                                <div className='w-[40px] min-w-[40px] h-[30px] flex items-center object-cover bg-red-500 overflow-hidden rounded mr-3 bg-slate-900'>
                                                    <Image src={video.image || ""} width={60} height={60} alt='cover' className='object-cover' />
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
                            {videos.length > 0 ? (
                                videos.map((video) => (
                                    <div className={`Tag flex text-white items-center ${selectedVideo?.id === video.id ? "selected" : ""}`} key={video.id}>
                                        <div className='w-[40px] min-w-[40px] h-[30px] flex items-center object-cover bg-red-500 overflow-hidden rounded mr-3 bg-slate-900'>
                                            <Image src={video.image || ""} width={60} height={60} alt='cover' className='object-cover' />
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
                </div>
            </div>
    );
}

