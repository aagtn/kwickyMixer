'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetchYoutube from '../utils/fetchYoutubeApi';
import { deckA } from '../data/decksParams';

function useMutations() {
    const queryClient = useQueryClient();

    // Mutation to update the current time of the track on a specific deck
    const updateCurrentTime = useMutation({
        mutationFn: async ({ currentTime, deck }: { currentTime: number, deck: string }) => {
            return Promise.resolve(currentTime);
        },
        onSuccess: (time, variables) => {
            // Update the query data with the new current time
            queryClient.setQueryData([variables.deck], (oldData: any) => ({
                ...oldData,
                currentTime: time,
            }));
        }
    });

    // Mutation to update the duration of the current track on a specific deck
    const updateDuration = useMutation({
        mutationFn: async ({ currentTime, deck }: { currentTime: number, deck: string }) => {
            return Promise.resolve(currentTime);
        },
        onSuccess: (time, variables) => {
            // Update the query data with the new track duration
            queryClient.setQueryData([variables.deck], (oldData: any) => ({
                ...oldData,
                trackDuration: time,
            }));
        }
    });

    // Mutation to update the player's state (e.g., playing, paused) on a specific deck
    const updatePlayerState = useMutation({
        mutationFn: async ({ state, deck }: { state: string, deck: string }) => {
            return Promise.resolve(state);
        },
        onSuccess: (playerState, variables) => {
            // Update the query data with the new player state
            queryClient.setQueryData([variables.deck], (oldData: any) => ({
                ...oldData,
                playState: playerState,
            }));
        }
    });

    // Mutation to toggle the loop state of the player on a specific deck
    const updateLoopState = useMutation({
        mutationFn: ({ newState, deck }: { newState: string, deck: string }) => {
            return Promise.resolve(newState);
        },
        onSuccess: (newState, variables) => {
            // Toggle the loop state in the query data
            queryClient.setQueryData([variables.deck], (oldData: any) => {
                return {
                    ...oldData,
                    loop: !oldData.loop
                };
            });
        }
    });

    // Mutation to update the volume of a specific deck
    const updateVolume = useMutation({
        mutationFn: async (dataVol: any) => {
            return Promise.resolve(dataVol);
        },
        onSuccess: (data) => {
            // Update the volume for deckA or deckB
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

    // Mutation to update the crossfader position in the mixer
    const updateCrossFader = useMutation({
        mutationFn: async (dataCross: number) => {
            return Promise.resolve(dataCross);
        },
        onSuccess: (data) => {
            // Update the crossfader position in the mixer
            queryClient.setQueryData(['mixer'], (oldData: any) => ({
                ...oldData,
                position: data,
            }));
        },
    });

    // Mutation to seek to a specific time in the track
    const updateSeekTo = useMutation({
        mutationFn: async ({ currentTime, deck, trackDuration }: { currentTime: number, deck: string, trackDuration: number }) => {
            return Promise.resolve(currentTime);
        },
        onSuccess: (time, variables) => {
            // Calculate the progress in seconds based on the current time percentage
            const progressInSec = (time / 100) * variables.trackDuration;
            // Update the seekTo value in the query data
            queryClient.setQueryData([variables.deck], (oldData: any) => ({
                ...oldData,
                seekTo: progressInSec,
            }));
        }
    });

    // Interface for the playlist item
    interface Playlist {
        id: string,
        image?: string,
        title?: string,
    }

    // Mutation to add a new item to the playlist on a specific deck
    const addToPlayList = useMutation({
        mutationFn: async ({ data, deck }: { data: Playlist, deck: string }) => {
            return Promise.resolve(data);
        },
        onSuccess: (newData, variables) => {
            // Add the new item to the playlist
            queryClient.setQueryData([variables.deck], (oldData: any) => ({
                ...oldData,
                playlist: [...(oldData?.playlist || []), newData],
            }));
        }
    })

    // Mutation to move the specified video to the second position in the playlist
    const playAfter = useMutation({
        mutationFn: async ({ videoId, deck }: { videoId: string, deck: string }) => {
            return Promise.resolve(videoId);
        },
        onSuccess: (newData, variables) => {
            queryClient.setQueryData([variables.deck], (oldData: any) => {
                // Find the index of the video to move
                const index = oldData.playlist.findIndex((video: any) => video.id === newData);
                const objToMove = oldData.playlist[index]
                // Remove the video from its current position
                if (index > -1) {
                    oldData.playlist.splice(index, 1);
                }

                // Insert the video at the second position
                const newPlaylist = [
                    oldData.playlist[0],
                    { id: objToMove.id, title: objToMove.title, image: objToMove.image },
                    ...oldData.playlist.slice(1),
                ];

                return {
                    ...oldData,
                    playlist: newPlaylist,
                };
            });
        },
    });

    // Mutation to remove an item from the playlist on a specific deck
    const removeFromPlaylist = useMutation({
        mutationFn: async ({ videoId, deck }: { videoId: string, deck: string }) => {
            return Promise.resolve(videoId);
        },
        onSuccess: (rmId, variables) => {
            // Remove the item with the specified ID from the playlist
            queryClient.setQueryData([variables.deck], (oldData: any) => ({
                ...oldData,
                playlist: oldData?.playlist.filter((item: Playlist) => item.id !== rmId),
            }));
        }
    });

    // Mutation to update whether the playlist is active on a specific deck
    const updateActivePlaylist = useMutation({
        mutationFn: async ({ state, deck }: { state: boolean, deck: string }) => {
            return Promise.resolve(state);
        },
        onSuccess: (newState, variables) => {
            // Update the playlistActive state in the query data
            queryClient.setQueryData([variables.deck], (oldData: any) => ({
                ...oldData,
                playlistActive: newState,
            }));
        }
    });

    // Mutation to update the search input and fetch new videos from YouTube
    const updateDeckSearchInput = useMutation({
        mutationFn: async ({ newSearchInput, deck }: { newSearchInput: string, deck: string }) => {
            const response = await fetchYoutube({ input: newSearchInput, deck: deck })
            return response;
        },
        onSuccess: (data, variables) => {
            // Update the search input and videos in the query data
            queryClient.setQueryData([variables.deck], (oldData: any) => {
                return {
                    ...oldData,
                    searchInput: variables.newSearchInput,
                    videos: data.videos
                };
            });
        }
    });

    // Interface for the video object
    interface VideoObj {
        title: string;
        id: string;
        image: string;
    }

    // Mutation to update the selected video on a specific deck
    const updateSelectedVideo = useMutation({
        mutationFn: ({ newVideo, deck }: { newVideo: VideoObj, deck: string }) => {
            return Promise.resolve(newVideo);
        },
        onSuccess: (video, variables) => {
            // Update the selected video in the query data
            queryClient.setQueryData([variables.deck], (oldData: any) => {
                return {
                    ...oldData,
                    selectedVideo: video
                };
            });
        }
    });

    // Mutation to update the auto-mix duration in the mixer
    const updateAutoMixDuration = useMutation({
        mutationFn: ({ newValue }: { newValue: number }) => {
            return Promise.resolve(newValue);
        },
        onSuccess: (value) => {
            // Update the autoMixDuration in the mixer data
            queryClient.setQueryData(["mixer"], (oldData: any) => {
                return {
                    ...oldData,
                    autoMixDuration: value
                };
            });
        }
    });

    // Mutation to update the auto-mix start time in the mixer
    const updateAutoMixStart = useMutation({
        mutationFn: ({ newValue }: { newValue: number }) => {
            return Promise.resolve(newValue);
        },
        onSuccess: (value) => {
            // Update the autoMixStartAt in the mixer data
            queryClient.setQueryData(["mixer"], (oldData: any) => {
                return {
                    ...oldData,
                    autoMixStartAt: value
                };
            });
        }
    });

    // Mutation to update the transition-in-process state in the mixer
    const updateTransitionInProcess = useMutation({
        mutationFn: ({ newValue }: { newValue: boolean }) => {
            return Promise.resolve(newValue);
        },
        onSuccess: (value) => {
            // Update the transitionInProcess state in the mixer data
            queryClient.setQueryData(["mixer"], (oldData: any) => {
                return {
                    ...oldData,
                    transitionInProcess: value
                };
            });
        }
    });

    // Mutation to update the auto-mix state in the mixer
    const updateAutoMixState = useMutation({
        mutationFn: ({ newValue }: { newValue: boolean }) => {
            return Promise.resolve(newValue);
        },
        onSuccess: (value) => {
            // Update the autoMix state in the mixer data
            queryClient.setQueryData(["mixer"], (oldData: any) => {
                return {
                    ...oldData,
                    autoMix: value
                };
            });
        }
    });


    interface DeckData {
        playlist: Array<{ id: string, title: string, image: string }>;
        playState: string
    }

    // Mutation to play the next Track in playlist
    const playNextTrack = useMutation({
        mutationFn: (deck: string) => {
            // Retrieve the current deck data from the query cache
            const dataDeck = queryClient.getQueryData([deck]) as DeckData | undefined;
    
            // Prepare the data to be returned, ensuring the playlist is not undefined
            const data = {
                deck: deck,
                playlist: dataDeck?.playlist || []
            };
    
            return Promise.resolve(data);
        },
        onSuccess: async (dataArr) => {
                
            function moveFirstToLast(arr: Array<{ id: string, title: string, image: string }>): Array<{ id: string, title: string, image: string }> {
                if (arr.length === 0) {
                    return arr;
                }
                const [first, ...rest] = arr;
                return [...rest, first];
            }
    
            const newArr = moveFirstToLast(dataArr.playlist);
    
            try {
                                
                await updateSelectedVideo.mutateAsync({ newVideo: newArr[0], deck: dataArr.deck });
                
                queryClient.setQueryData([dataArr.deck], (oldData: any) => {
                    return {
                        ...oldData,
                        playlist: newArr
                    };
                });
                console.log("Playlist updated.");
    
            } catch (error) {
                console.error("Error during playNextTrack mutation:", error);
            }
        }
    });
    
    


    // Mutation to play the previous track in the playlist
    const playPreviousTrack = useMutation({
        mutationFn: (deck: string) => {
            const dataDeck = queryClient.getQueryData([deck]) as DeckData | undefined;

            const data = {
                deck: deck,
                playlist: dataDeck?.playlist || [],
            }

            return Promise.resolve(data);
        },
        onSuccess: (dataArr) => {

            function moveLastToFirst(arr: Array<{ id: string, title: string, image: string }>): Array<{ id: string, title: string, image: string }> {
                if (arr.length === 0) {
                    return arr;
                }
                const last = arr[arr.length - 1];
                const rest = arr.slice(0, -1);

                return [last, ...rest];
            }

            queryClient.setQueryData([dataArr.deck], (oldData: any) => {

                const newArr = moveLastToFirst(dataArr.playlist);
                updateSelectedVideo.mutate({ newVideo: newArr[0], deck: dataArr.deck });

                return {
                    ...oldData,
                    playlist: newArr
                };
            });
        }
    });


    return {
        updateCurrentTime,
        updateDuration,
        updatePlayerState,
        updateLoopState,
        updateVolume,
        updateCrossFader,
        updateSeekTo,
        addToPlayList,
        playAfter,
        removeFromPlaylist,
        updateActivePlaylist,
        updateDeckSearchInput,
        updateSelectedVideo,
        updateAutoMixDuration,
        updateAutoMixStart,
        updateTransitionInProcess,
        updateAutoMixState,
        playNextTrack,
        playPreviousTrack
    };
}

export { useMutations }
