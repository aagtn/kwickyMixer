'use client'
import * as ContextMenu from '@radix-ui/react-context-menu';
import { PlayIcon,TrashIcon } from '@radix-ui/react-icons';
import '../styles/contextMenu.css';
import { MixTable } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { playAfter ,removeFromPlaylist} from '../store/playerSlice';


export type DeckId = 'deckA' | 'deckB'; 

export default function PlaylistMenu({children,index,data,deckId}:{children:React.ReactNode,index:number,data:any,deckId:DeckId}) {  

    const dispatch = useDispatch()
    const playlist = useSelector((state:MixTable) => state.player[deckId].playlist)
    
    
    const handlePlayNext = () => {
         dispatch(playAfter({deck:deckId,playlist:playlist,videoId:data.id}))
    }

    const handleRm = () => {
        dispatch(removeFromPlaylist({deck:deckId,videoId:data.id}))
    }

    return (
        <ContextMenu.Root>
            <ContextMenu.Trigger className="ContextMenuTrigger">{children}</ContextMenu.Trigger>
            <ContextMenu.Portal>
                <ContextMenu.Content className="ContextMenuContent" >
                    <ContextMenu.Item className="ContextMenuItem" disabled={index === 1 ? true : false} onClick={handlePlayNext}>
                        Play next <div className="RightSlot"><PlayIcon/></div>
                    </ContextMenu.Item>
                    <ContextMenu.Separator className="ContextMenuSeparator" />
                    <ContextMenu.Item className="ContextMenuItem"  onClick={handleRm}>
                        Remove <div className="RightSlot"><TrashIcon/></div>
                    </ContextMenu.Item>
                </ContextMenu.Content>
            </ContextMenu.Portal>
        </ContextMenu.Root>
    );
};
