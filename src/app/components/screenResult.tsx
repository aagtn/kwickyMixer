import '../styles/screenResult.css';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import Image from 'next/image';
import { useSearhInputMutations } from '../hooks/mutations';

interface YoutubeVideo {
    id: string
    title:string
    image:string
}

interface ScreenResultProps {
    data?: YoutubeVideo[]
    deckId: string
}

export default function ScreenResult({ data, deckId }: ScreenResultProps) {
    const {updateSelectedVideo} = useSearhInputMutations()

    const handleSelectedVideo = (event: React.MouseEvent<HTMLInputElement>) => {
        const key = event.currentTarget.getAttribute('data-key');
        if (key) {
            updateSelectedVideo.mutate({newVideoId:key, deck:deckId});
        }
    }

    return (
        <ScrollArea.Root className="ScrollAreaRoot">
            <ScrollArea.Viewport className="ScrollAreaViewport">
                <div className='shadow-b w-full h-[40px] bg-red-500 absolute bottom-0'></div>
                <div className='shadow-t w-full h-[10px] bg-red-500 absolute'></div>
                <div style={{ padding: '15px 20px' }} >
                    {data && data.length > 0 ? (
                        data.map((video) => (
                            <div className="Tag flex cursor-pointer hover:text-blue-500 items-center" data-key={video.id} data-img={video.image} key={video.id} onClick={handleSelectedVideo}>
                               <div className='w-[40px] h-[30px] flex items-center justify-center object-cover bg-red-500 overflow-hidden rounded mr-3 bg-slate-100'><Image src={video.image} width={60} height={60} alt='cover' className='object-cover'/></div> {video.title}
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
