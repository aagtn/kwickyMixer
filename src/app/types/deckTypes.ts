
export interface PlaylistItem {
    id: string;
    title: string;
    image?: string;
}

export interface DeckState {
    currentTime: number;
    trackDuration: number;
    playState: string;
    loop: boolean;
    volume: number;
    seekTo: number;
    playlist: PlaylistItem[];
    playlistActive: boolean;
    selectedVideo: PlaylistItem | null;
    searchInput: string;
    videos: PlaylistItem[];
}

export interface RootState{
    deckA: DeckState;
    deckB: DeckState;
    mixer: {
        position: number;
        autoMixDuration: number;
        autoMixStartAt: number;
        transitionInProcess: boolean;
        autoMix: boolean;
    };
}

export interface MixTable {
    player:RootState;
}

export interface DeckId{
    deckId:'deckA' | 'deckB';
}