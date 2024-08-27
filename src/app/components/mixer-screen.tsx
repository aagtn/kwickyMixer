import VerticalSlider from "./sliderV"


export default function ScreenMixer({deckA,deckB}:any){

    return(
        <div className='w-full h-full bg-black flex relative justify-center'>
        <VerticalSlider volume={deckA?.volume ?? 100} deckId={"deckA"} />
        <VerticalSlider volume={deckB?.volume ?? 0} deckId={"deckB"} />
        </div>
    )
}