interface YoutubeSearchParams {
    input: string
    deck: string
}

interface YoutubeVideo {
    id: string;
    title: string;
}

export default async function fetchYoutube({ input, deck }: YoutubeSearchParams) {
    const apiKey = 'AIzaSyCUdPdSlrzzvasU5-emqNrv3qDo0ddwrAY'
    const maxResults = 15

    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(input)}&maxResults=${maxResults}&key=${apiKey}`
        )

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();

        const videos: YoutubeVideo[] = data.items.map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            image:item.snippet.thumbnails.high.url,
        }));

        const result = {
            deck : deck,
            videos:videos
        }

        return result

    } catch (error) {
        console.error('Error fetching YouTube data:', error)
        throw error
    }
}
