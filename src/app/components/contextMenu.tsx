'use client'
import * as ContextMenu from '@radix-ui/react-context-menu';
import { PlayIcon,TrashIcon } from '@radix-ui/react-icons';
import '../styles/contextMenu.css';
import { useMutations } from '../hooks/mutations';


interface VideoObj {
    id: string
    title: string
    image: string
}

export default function PlaylistMenu({children,index,data,deck}:{children:any,index:number,data:VideoObj,deck:string}) {  
    const { playAfter,removeFromPlaylist } = useMutations()
    
    const handlePlayNext = () => {
         playAfter.mutate({videoId:data.id,deck:deck})
    }

    const handleRm = () => {
        removeFromPlaylist.mutate({videoId:data.id,deck:deck})
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
