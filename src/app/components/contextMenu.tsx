'use client'
import * as ContextMenu from '@radix-ui/react-context-menu';
import { PlayIcon,TrashIcon } from '@radix-ui/react-icons';
import '../styles/contextMenu.css';
import { usePlayerMutations } from '../hooks/mutations';
import { useState } from 'react';

interface VideoObj {
    id: string
    title: string
    image: string
}

export default function PlaylistMenu({children,index,data,deck}:{children:any,index:number,data:VideoObj,deck:string}) {  
    const { updatePlaylist } = usePlayerMutations()
    const videoId = data

    const handlePlayNext = () => {
        updatePlaylist.mutate({data,deck:deck,action:"playnext"})
    }

    const handleRm = () => {
           updatePlaylist.mutate({data,deck:deck,action:"remove"})
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
                    <ContextMenu.Item className="ContextMenuItem" onClick={handleRm}>
                        Remove <div className="RightSlot"><TrashIcon/></div>
                    </ContextMenu.Item>
                </ContextMenu.Content>
            </ContextMenu.Portal>
        </ContextMenu.Root>
    );
};
