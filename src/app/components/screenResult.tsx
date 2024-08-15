import '../styles/screenResult.css';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import Image from 'next/image';
import { useSearchInputMutations,usePlayerMutations } from '../hooks/mutations';
import { useEffect } from 'react';

interface VideoObj {
    id: string
    title: string
    image: string
}

interface DataObj {
    searchInput: string;
    videos: VideoObj[];
    volume: number;
    playState: string;
    selectedVideo: string;
    image: string;
    loop: boolean;
    currentTime: number;
    trackDuration: number;
    seekTo: number;
}

export default function ScreenResult({ data, deckId }: { data: DataObj, deckId: string }) {
    const { updateSelectedVideo } = useSearchInputMutations()
    const { updatePlayerState } = usePlayerMutations()

    const handleSelectedVideo = (event: React.MouseEvent<HTMLInputElement>) => {
        const key = event.currentTarget.getAttribute('data-key');
        if (key) {
            updatePlayerState.mutate({state:'paused', deck:deckId})
            updateSelectedVideo.mutate({ newVideoId: key, deck: deckId });
        }
    }

    return (
        
        <ScrollArea.Root className="ScrollAreaRoot">
            <ScrollArea.Viewport className="ScrollAreaViewport m-2">
                <div className='shadow-b w-full h-[40px] bg-red-500 absolute bottom-0'></div>
                <div className='shadow-t w-full h-[10px] bg-red-500 absolute'></div>
                <div style={{ padding: '15px 20px' }} >
                    {data && data.videos.length > 0 ? (
                        data.videos.map((video) => (
                            <div className={`Tag flex cursor-pointer hover:text-blue-500 text-white items-center ${data.selectedVideo === video.id ? "selected" : ""}`} data-key={video.id} data-img={video.image} key={video.id} onClick={handleSelectedVideo}>
                                <div className='w-[40px] h-[30px] flex items-center justify-center object-cover bg-red-500 overflow-hidden rounded mr-3 bg-slate-100'><Image src={video.image} width={60} height={60} alt='cover' className='object-cover' /></div>
                                {video.title}
                            </div>
                        ))
                    ) : (
                        <div className="NoResults"> No results found </div>
                    )}
                </div>
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
