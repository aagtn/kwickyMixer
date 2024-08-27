'use client'
import InputSearch from './inputSearch';
import ScreenResult from './screenResult';
import Screen from './screen';
import Controls from './controls';
import ProgressBar from './playBar';
import { DeckId } from '../types';



export default function DeckCpnt({deckId}: DeckId) {

    return (

        <div className="w-[40%] flex flex-col items-center p-5 ">
            <InputSearch deckId={deckId}  />
            <ScreenResult deckId={deckId} />
            <Screen deckId={deckId}/>
            <ProgressBar deckId={deckId} />
            <Controls deckId={deckId} />
        </div>
    )

}