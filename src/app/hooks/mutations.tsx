'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetchYoutube from '../utils/fetchYoutubeApi';


function usePlayerMutations() {
    const queryClient = useQueryClient();

    const updateCurrentTime = useMutation({
        mutationFn: async ({ currentTime, deck }: { currentTime: number, deck: string }) => {
            return Promise.resolve(currentTime);
        },
        onSuccess: (time, variables) => {
            queryClient.setQueryData([variables.deck], (oldData: any) => ({
                ...oldData,
                currentTime: time,
            }));
        }
    });

    const updateDuration = useMutation({
        mutationFn: async ({ currentTime, deck }: { currentTime: number, deck: string }) => {
            return Promise.resolve(currentTime);
        },
        onSuccess: (time, variables) => {
            queryClient.setQueryData([variables.deck], (oldData: any) => ({
                ...oldData,
                trackDuration: time,
            }));
        }
    });

    const updatePlayerState = useMutation({
        mutationFn: async ({ state, deck }: { state: string, deck: string }) => {
            return Promise.resolve(state);
        },
        onSuccess: (playerState, variables) => {
            queryClient.setQueryData([variables.deck], (oldData: any) => ({
                ...oldData,
                playState: playerState,
            }));
        }
    });

    const updateLoopState = useMutation({
        mutationFn: ({ newState, deck }: { newState: string, deck: string }) => {
            return Promise.resolve(newState);
        },
        onSuccess: (newState, variables) => {
            queryClient.setQueryData([variables.deck], (oldData: any) => {
                return {
                    ...oldData,
                    loop: !oldData.loop
                };
            });

        }
    });

    const updateVolume = useMutation({
        mutationFn: async (dataVol: any) => {
            return Promise.resolve(dataVol);
        },
        onSuccess: (data) => {
            if (data.deckId === 'deckA') {
                queryClient.setQueryData(['deckA'], (oldData: any) => ({
                    ...oldData,
                    volume: data.vol,
                }));
            }
            if (data.deckId === 'deckB') {
                queryClient.setQueryData(['deckB'], (oldData: any) => ({
                    ...oldData,
                    volume: data.vol,
                }));
            }
        },
    });

    const updateCrossFader = useMutation({
        mutationFn: async (dataCross: number) => {
            return Promise.resolve(dataCross);
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['mixer'], () => ({
                position: data,
            }));
        },
    });


        const updateSeekTo = useMutation({
        mutationFn: async ({currentTime,deck,trackDuration}:{currentTime:number,deck:string,trackDuration:number}) => {
            return Promise.resolve(currentTime);
        },
        onSuccess: (time,variables) => {
            const progressInSec = (time / 100) * variables.trackDuration;
            queryClient.setQueryData([variables.deck], (oldData: any) => ({
                ...oldData,
                seekTo: progressInSec,
            }));
        }
    });

    return { updateCurrentTime, updateDuration, updatePlayerState, updateLoopState, updateVolume, updateCrossFader, updateSeekTo };
}

function useSearhInputMutations() {
    const queryClient = useQueryClient();

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

    const updateSelectedVideo = useMutation({
        mutationFn: ({ newVideoId, deck }: { newVideoId: string, deck: string }) => {
            return Promise.resolve(newVideoId);
        },
        onSuccess: (videoId, variables) => {
            queryClient.setQueryData([variables.deck], (oldData: any) => {
                return {
                    ...oldData,
                    selectedVideo: videoId

                };
            });
        }
    });

    return { updateDeckSearchInput, updateSelectedVideo }
}

export { usePlayerMutations, useSearhInputMutations }
