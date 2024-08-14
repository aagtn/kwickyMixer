const deckA = {
    id:"deckA",
    searchInput: "Max Cooper",
    videos: [{"id":"nO9aot9RgQc","title":"Max Cooper - Repetition (Official Video By Kevin McGloughlin)","image":"https://i.ytimg.com/vi/nO9aot9RgQc/hqdefault.jpg"},{"id":"_7wKjTf_RlI","title":"Max Cooper - Order From Chaos (official video by Maxime Causeret)","image":"https://i.ytimg.com/vi/_7wKjTf_RlI/hqdefault.jpg"},{"id":"owdva7V2M0o","title":"Max Cooper - Live at the Barbican (Yearning for the Infinite)","image":"https://i.ytimg.com/vi/owdva7V2M0o/hqdefault.jpg"},{"id":"Kpm1l0HfkV0","title":"Max Cooper - Resynthesis (official video by Kevin McGloughlin)","image":"https://i.ytimg.com/vi/Kpm1l0HfkV0/hqdefault.jpg"},{"id":"L2xbTkSYh8c","title":"Max Cooper - Live at the Acropolis","image":"https://i.ytimg.com/vi/L2xbTkSYh8c/hqdefault.jpg"},{"id":"_n_iKR3Icio","title":"Max Cooper - Symphony in Acid (Official video by Ksawery Komputery)","image":"https://i.ytimg.com/vi/_n_iKR3Icio/hqdefault.jpg"},{"id":"KM-EBZL881Q","title":"Max Cooper - Origins - Official Video by Rabbit Hole and Black Box","image":"https://i.ytimg.com/vi/KM-EBZL881Q/hqdefault.jpg"},{"id":"AuB03erPLnw","title":"Max Cooper - Cardano Circles (Official video by Mario Carrillo)","image":"https://i.ytimg.com/vi/AuB03erPLnw/hqdefault.jpg"},{"id":"PsXAMLudRjM","title":"playing piano requests:)","image":"https://i.ytimg.com/vi/PsXAMLudRjM/hqdefault.jpg"},{"id":"FKElZid_71w","title":"AVA X Red Bull Presents: Max Cooper Live A/V | Carlisle Church, Belfast","image":"https://i.ytimg.com/vi/FKElZid_71w/hqdefault.jpg"},{"id":"VGfayDKveAs","title":"Max Cooper - Waves (official video by Kevin McGloughlin)","image":"https://i.ytimg.com/vi/VGfayDKveAs/hqdefault.jpg"},{"id":"GvwayRd9gbw","title":"Max Cooper - Everything (Official video by Nick Cobby)","image":"https://i.ytimg.com/vi/GvwayRd9gbw/hqdefault.jpg"},{"id":"GcmHXo4isWQ","title":"Max Cooper - Perpetual Motion (Official Video by Nick Cobby)","image":"https://i.ytimg.com/vi/GcmHXo4isWQ/hqdefault.jpg"},{"id":"hR-JJyxpOY4","title":"Max Cooper - Circular (Official Video by Páraic McGloughlin)","image":"https://i.ytimg.com/vi/hR-JJyxpOY4/hqdefault.jpg"},{"id":"Shzx41k0hec","title":"Max Cooper - Gated Thoughts (Official video by Jazer Giles)","image":"https://i.ytimg.com/vi/Shzx41k0hec/hqdefault.jpg"}],
    volume: 100,
    playState: 'paused', /// playing | paused | resume 
    selectedVideo : "_n_iKR3Icio",
    image:"https://i.ytimg.com/vi/VGfayDKveAs/hqdefault.jpg",
    loop:true,
    currentTime:0,
    trackDuration:0,
    seekTo:0,
}

const deckB = {
    id:"deckB",
    searchInput: "Floating Points",
    videos: [{"id":"GlhV-OKHecI","title":"Squarepusher - Terminal Slam (Official Video)","image":"https://i.ytimg.com/vi/GlhV-OKHecI/hqdefault.jpg"},{"id":"yTlSo_9Ef1s","title":"Squarepusher -Dostrotime (Full Album)","image":"https://i.ytimg.com/vi/yTlSo_9Ef1s/hqdefault.jpg"},{"id":"MWCSw_cNxKc","title":"Squarepusher - Come On My Selector (Official Video)","image":"https://i.ytimg.com/vi/MWCSw_cNxKc/hqdefault.jpg"},{"id":"rYS8edMRgBg","title":"Squarepusher - Do You Know Squarepusher","image":"https://i.ytimg.com/vi/rYS8edMRgBg/hqdefault.jpg"},{"id":"LKJ-0ZO4pxo","title":"Squarepusher - Beep Street","image":"https://i.ytimg.com/vi/LKJ-0ZO4pxo/hqdefault.jpg"},{"id":"XvLAKrVbCBM","title":"Squarepusher - &#39;Dark Steering&#39; taken from &#39;Ufabulum&#39;","image":"https://i.ytimg.com/vi/XvLAKrVbCBM/hqdefault.jpg"},{"id":"xihg0s9_1eo","title":"Squarepusher - Iambic 5 Poetry","image":"https://i.ytimg.com/vi/xihg0s9_1eo/hqdefault.jpg"},{"id":"m6cYKt9hC5M","title":"Squarepusher - Wendorlan / Slamstep Remix (Scope Stills)","image":"https://i.ytimg.com/vi/m6cYKt9hC5M/hqdefault.jpg"},{"id":"wiycAAoaK2k","title":"Squarepusher - Squarepusher Theme (Official Audio)","image":"https://i.ytimg.com/vi/wiycAAoaK2k/hqdefault.jpg"},{"id":"VkUq4sO4LQM","title":"Squarepusher × Z-MACHINES","image":"https://i.ytimg.com/vi/VkUq4sO4LQM/hqdefault.jpg"},{"id":"tRjUUEZBXWE","title":"Old Composer Reacts to SQUAREPUSHER Beep Street","image":"https://i.ytimg.com/vi/tRjUUEZBXWE/hqdefault.jpg"},{"id":"pS_r1M3L878","title":"Squarepusher - Planetarium","image":"https://i.ytimg.com/vi/pS_r1M3L878/hqdefault.jpg"},{"id":"59ke5hp-p3E","title":"Squarepusher - Vortrack [Fracture Remix] (Official Audio)","image":"https://i.ytimg.com/vi/59ke5hp-p3E/hqdefault.jpg"},{"id":"xTDe5i6JA6g","title":"Squarepusher in session for Guardian Music","image":"https://i.ytimg.com/vi/xTDe5i6JA6g/hqdefault.jpg"},{"id":"1wPRlj0IZJE","title":"Iambic 9 Poetry","image":"https://i.ytimg.com/vi/1wPRlj0IZJE/hqdefault.jpg"}],
    volume: 0,
    playState: 'paused', /// playing | paused | resume 
    selectedVideo : "GlhV-OKHecI",
    image:"https://i.ytimg.com/vi/GlhV-OKHecI/hqdefault.jpg",
    loop:true,
    currentTime:0,
    trackDuration:0,
    seekTo:0,
}

const crossFader = {
    position:-50,
    autoMixStartAt:-10,
    autoMixDuration:5
}

export {deckA, deckB, crossFader}