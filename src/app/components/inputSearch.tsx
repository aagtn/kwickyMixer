import '../styles/searchInput.css';
import { Button } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useSearchInputMutations ,usePlayerMutations} from '../hooks/mutations';
import Image from 'next/image';

interface InputSearchProps {
    data: string;
    deckId: string;
}

export default function InputSearch({ data, deckId }: InputSearchProps) {

    const { updateDeckSearchInput } = useSearchInputMutations();
    const { updateActivePlaylist } = usePlayerMutations()
    const [inputValue, setInputValue] = useState<string>(data);
    const [playlistActive, setPlaylistActive] = useState(false)

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
        updateActivePlaylist.mutate({state:playlistActive,deck:deckId})
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
                    <Button type="submit" variant="surface" className="ml-4 p-2 cursor-pointer">
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
