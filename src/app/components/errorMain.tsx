export default function ErrorMain(error:any){
    return(
        <div className='w-ful h-[100vh] flex items-center justify-center'>{error?.message }</div>
    )
}