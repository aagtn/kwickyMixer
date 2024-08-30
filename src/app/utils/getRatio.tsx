export default function getRatio({arw,arh}:{arw:number,arh:number}){
    const screenW = window.innerWidth;
    const ratio = arw / arh;
    const width = screenW * 0.90;
    const height = width / ratio;
    return {w:width,h:height}
}