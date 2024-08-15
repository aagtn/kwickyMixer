const deckA = {
    id:"deckA",
    searchInput: "Max Cooper",
    videos: [{"id":"nO9aot9RgQc","title":"Max Cooper - Repetition (Official Video By Kevin McGloughlin)","image":"https://i.ytimg.com/vi/nO9aot9RgQc/hqdefault.jpg"},{"id":"_7wKjTf_RlI","title":"Max Cooper - Order From Chaos (official video by Maxime Causeret)","image":"https://i.ytimg.com/vi/_7wKjTf_RlI/hqdefault.jpg"},{"id":"owdva7V2M0o","title":"Max Cooper - Live at the Barbican (Yearning for the Infinite)","image":"https://i.ytimg.com/vi/owdva7V2M0o/hqdefault.jpg"},{"id":"Kpm1l0HfkV0","title":"Max Cooper - Resynthesis (official video by Kevin McGloughlin)","image":"https://i.ytimg.com/vi/Kpm1l0HfkV0/hqdefault.jpg"},{"id":"L2xbTkSYh8c","title":"Max Cooper - Live at the Acropolis","image":"https://i.ytimg.com/vi/L2xbTkSYh8c/hqdefault.jpg"},{"id":"_n_iKR3Icio","title":"Max Cooper - Symphony in Acid (Official video by Ksawery Komputery)","image":"https://i.ytimg.com/vi/_n_iKR3Icio/hqdefault.jpg"},{"id":"KM-EBZL881Q","title":"Max Cooper - Origins - Official Video by Rabbit Hole and Black Box","image":"https://i.ytimg.com/vi/KM-EBZL881Q/hqdefault.jpg"},{"id":"AuB03erPLnw","title":"Max Cooper - Cardano Circles (Official video by Mario Carrillo)","image":"https://i.ytimg.com/vi/AuB03erPLnw/hqdefault.jpg"},{"id":"PsXAMLudRjM","title":"playing piano requests:)","image":"https://i.ytimg.com/vi/PsXAMLudRjM/hqdefault.jpg"},{"id":"FKElZid_71w","title":"AVA X Red Bull Presents: Max Cooper Live A/V | Carlisle Church, Belfast","image":"https://i.ytimg.com/vi/FKElZid_71w/hqdefault.jpg"},{"id":"VGfayDKveAs","title":"Max Cooper - Waves (official video by Kevin McGloughlin)","image":"https://i.ytimg.com/vi/VGfayDKveAs/hqdefault.jpg"},{"id":"GvwayRd9gbw","title":"Max Cooper - Everything (Official video by Nick Cobby)","image":"https://i.ytimg.com/vi/GvwayRd9gbw/hqdefault.jpg"},{"id":"GcmHXo4isWQ","title":"Max Cooper - Perpetual Motion (Official Video by Nick Cobby)","image":"https://i.ytimg.com/vi/GcmHXo4isWQ/hqdefault.jpg"},{"id":"hR-JJyxpOY4","title":"Max Cooper - Circular (Official Video by Páraic McGloughlin)","image":"https://i.ytimg.com/vi/hR-JJyxpOY4/hqdefault.jpg"},{"id":"Shzx41k0hec","title":"Max Cooper - Gated Thoughts (Official video by Jazer Giles)","image":"https://i.ytimg.com/vi/Shzx41k0hec/hqdefault.jpg"}],
    volume: 100,
    playState: 'paused', /// playing | paused | resume 
    selectedVideo : "VGfayDKveAs",
    image:"https://i.ytimg.com/vi/VGfayDKveAs/hqdefault.jpg",
    loop:true,
    currentTime:0,
    trackDuration:0,
    seekTo:0,
}

const deckB = {
    id:"deckB",
    searchInput: "Floating Points",
    videos: [{"id":"yMjBGUKpH-0","title":"RA Live: Floating Points At Printworks 2019 | Resident Advisor","image":"https://i.ytimg.com/vi/yMjBGUKpH-0/hqdefault.jpg"},{"id":"DaiuHTYvF2U","title":"Floating Points - &#39;Key103&#39; (Official Video)","image":"https://i.ytimg.com/vi/DaiuHTYvF2U/hqdefault.jpg"},{"id":"yYqu5NdFMf8","title":"Floating Points - Full Performance (Live on KEXP)","image":"https://i.ytimg.com/vi/yYqu5NdFMf8/hqdefault.jpg"},{"id":"7iedUG5Kpis","title":"Floating Points - &#39;Del Oro&#39; (Official Video)","image":"https://i.ytimg.com/vi/7iedUG5Kpis/hqdefault.jpg"},{"id":"hq6w-sPMnJE","title":"Floating Points - Crush (Full Album)","image":"https://i.ytimg.com/vi/hq6w-sPMnJE/hqdefault.jpg"},{"id":"AZiJxNTdzwI","title":"Floating Points - Ratio (Full Mix)","image":"https://i.ytimg.com/vi/AZiJxNTdzwI/hqdefault.jpg"},{"id":"MWLpR6Fsc6Q","title":"Floating Points - &#39;Birth4000&#39; (Official Audio)","image":"https://i.ytimg.com/vi/MWLpR6Fsc6Q/hqdefault.jpg"},{"id":"PZRI1IfStY0","title":"Floating Point Numbers - Computerphile","image":"https://i.ytimg.com/vi/PZRI1IfStY0/hqdefault.jpg"},{"id":"GpCdodqTYtE","title":"The Art Of Production: Floating Points - Buchla system","image":"https://i.ytimg.com/vi/GpCdodqTYtE/hqdefault.jpg"},{"id":"0x0t1l7QeeY","title":"Floating Points - Last Bloom (Official Video)","image":"https://i.ytimg.com/vi/0x0t1l7QeeY/hqdefault.jpg"},{"id":"FvlyttLEQlk","title":"Floating Points, Pharoah Sanders &amp; The London Symphony Orchestra - Promises [Movement 1]","image":"https://i.ytimg.com/vi/FvlyttLEQlk/hqdefault.jpg"},{"id":"2gIxbTn7GSc","title":"Why Is This Happening?! Floating Point Approximation","image":"https://i.ytimg.com/vi/2gIxbTn7GSc/hqdefault.jpg"},{"id":"yz66Oj2K6p0","title":"Rappresentazione floating point semplificata","image":"https://i.ytimg.com/vi/yz66Oj2K6p0/hqdefault.jpg"},{"id":"l8kXBetL-XA","title":"Floating Points - Problems (Teaser 2)","image":"https://i.ytimg.com/vi/l8kXBetL-XA/hqdefault.jpg"},{"id":"xNbFxn34-5g","title":"Floating Points Live From #DJMagHQ ADE Special at Claire","image":"https://i.ytimg.com/vi/xNbFxn34-5g/hqdefault.jpg"}],
    volume: 0,
    playState: 'paused', /// playing | paused | resume 
    selectedVideo : "0x0t1l7QeeY",
    image:"https://i.ytimg.com/vi/0x0t1l7QeeY/hqdefault.jpg",
    loop:true,
    currentTime:0,
    trackDuration:0,
    seekTo:0,
}

const crossFader = {
    autoMix:true,
    position:-50,
    autoMixStartAt:-10,
    autoMixDuration:10,
    transitionInProcess:false
}

export {deckA, deckB, crossFader}