import '../styles/searchInput.css';
import { Button } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { useMutation,useQueryClient } from '@tanstack/react-query';
import fetchYoutube from '../utils/fetchYoutubeApi';
import { useDispatch,useSelector } from 'react-redux';
import { DeckId,MixTable } from '../types';
import { updateActivePlaylist } from '../store/playerSlice';

export default function InputSearch({deckId}: DeckId) {
    const queryClient = useQueryClient()
    
    const dispatch = useDispatch()
    const inputData = useSelector((state:MixTable) => state.player[deckId].searchInput)
    
    const updateDeckSearchInput = useMutation({
        mutationFn: async ({ newSearchInput, deck }: { newSearchInput: string, deck: string }) => {            
            const response = await fetchYoutube({ input: newSearchInput, deck: deck })
            return response;
        },
        onSuccess: (data, variables) => {
            queryClient.setQueryData([variables.deck], (oldData: any) => {
                return {
                    ...oldData,
                    searchInput: variables.newSearchInput,
                    videos: data.videos
                };
            });
        }
    });
    
    
    const [inputValue, setInputValue] = useState<string>(inputData);
    const [playlistActive, setPlaylistActive] = useState<boolean>(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        updateDeckSearchInput.mutate({ newSearchInput: inputValue, deck: deckId });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleActivePlaylist = () => {
        setPlaylistActive((prev) => !prev) 
    }

    useEffect(()=>{
        dispatch(updateActivePlaylist({deck:deckId,playlistActive}))
    },[playlistActive])

    return (
        <div className='flex w-full relative'>
        <form className="flex w-full items-center mb-2" onSubmit={handleSubmit} name={"search"}>
            <div className="w-[80%] flex items-center">
                <div className='input-morph mr-4'>
                    <input
                        className="Input w-full p-2 border border-gray-300 rounded-md"
                        type="text"
                        required
                        value={inputValue}
                        onChange={handleChange}
                        placeholder="Enter a track or an artist name..."
                    />
                </div>
                <div className="btn-morph">
                    <Button loading={updateDeckSearchInput.isPending ? true : false} type="submit" variant="surface" className="ml-4 p-2 cursor-pointer">
                        Search
                    </Button>
                
                </div>
            </div>
        </form>
        <div className='bottom-2 absolute right-0 btn-morph' onClick={handleActivePlaylist}>
            <Image src={"/playlist_play.svg"} width={15} height={15} alt='playlist icon'  className={`${ playlistActive ? "playlist-icn-active": "playlist-icn"}`}/>
        </div>
        </div>
    );
}
