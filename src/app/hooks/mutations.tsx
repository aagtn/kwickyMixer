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
            queryClient.setQueryData(['mixer'], (oldData: any) => ({
                ...oldData,
                position: data,
            }));
        },
    });


    const updateSeekTo = useMutation({
        mutationFn: async ({ currentTime, deck, trackDuration }: { currentTime: number, deck: string, trackDuration: number }) => {
            return Promise.resolve(currentTime);
        },
        onSuccess: (time, variables) => {
            const progressInSec = (time / 100) * variables.trackDuration;
            queryClient.setQueryData([variables.deck], (oldData: any) => ({
                ...oldData,
                seekTo: progressInSec,
            }));
        }
    });

    interface Playlist {
        id: string,
        image?: string,
        title?: string,
    }

    const updatePlaylist = useMutation({
        mutationFn: async ({ data, deck, action }: { data: Playlist, deck: string, action: string }) => {
            return Promise.resolve(data);
        },
        onSuccess: (newData, variables) => {
            if (variables.action === "add") {
                queryClient.setQueryData([variables.deck], (oldData: any) => ({
                    ...oldData,
                    playlist: [...(oldData?.playlist || []), newData],
                }));
            }

            if (variables.action === "playnext") {
                const moveItem = (array:any[], fromIndex:number, toIndex:number) => {
                    const item = array.splice(fromIndex, 1)[0]; 
                    array.splice(toIndex, 0, item);
                    return array;  
                }
            
                queryClient.setQueryData([variables.deck], (oldData: any) => {
                    const updatedPlaylist = moveItem([...oldData.playlist], 1, 3); 
                    return {
                        ...oldData,  
                        playlist: updatedPlaylist, 
                    };
                });
            }

            if (variables.action === "remove") {
                queryClient.setQueryData([variables.deck], (oldData: any) => ({
                    ...oldData,
                    playlist: oldData?.playlist.filter((item: Playlist) => item.id !== newData.id), 
                }));
            }
        }
    });


    const updateActivePlaylist = useMutation({
        mutationFn: async ({ state, deck }: { state: boolean, deck: string }) => {
            return Promise.resolve(state);
        },
        onSuccess: (newState, variables) => {
            queryClient.setQueryData([variables.deck], (oldData: any) => ({
                ...oldData,
                playlistActive: newState,
            }));
        }
    });



    return { updateCurrentTime, updateDuration, updatePlayerState, updateLoopState, updateVolume, updateCrossFader, updateSeekTo, updatePlaylist, updateActivePlaylist };
}

function useSearchInputMutations() {
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

function useAutoMixMutation() {
    const queryClient = useQueryClient()

    const updateAutoMixDuration = useMutation({
        mutationFn: ({ newValue }: { newValue: number }) => {
            return Promise.resolve(newValue);
        },
        onSuccess: (value) => {
            queryClient.setQueryData(["mixer"], (oldData: any) => {
                return {
                    ...oldData,
                    autoMixDuration: value

                };
            });
        }
    });

    const updateAutoMixStart = useMutation({
        mutationFn: ({ newValue }: { newValue: number }) => {
            return Promise.resolve(newValue);
        },
        onSuccess: (value) => {
            queryClient.setQueryData(["mixer"], (oldData: any) => {
                return {
                    ...oldData,
                    autoMixStartAt: value

                };
            });
        }
    });

    const updateTransitionInProcess = useMutation({
        mutationFn: ({ newValue }: { newValue: boolean }) => {
            return Promise.resolve(newValue);
        },
        onSuccess: (value) => {
            queryClient.setQueryData(["mixer"], (oldData: any) => {
                return {
                    ...oldData,
                    transitionInProcess: value

                };
            });
        }

    });


    const updateAutoMixState = useMutation({
        mutationFn: ({ newValue }: { newValue: boolean }) => {
            return Promise.resolve(newValue);
        },
        onSuccess: (value) => {
            queryClient.setQueryData(["mixer"], (oldData: any) => {
                return {
                    ...oldData,
                    autoMix: value

                };
            });
        }

    });

    return { updateAutoMixDuration, updateAutoMixStart, updateTransitionInProcess, updateAutoMixState }
}

export { usePlayerMutations, useSearchInputMutations, useAutoMixMutation }
