import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type Track = {
    id: number,
    artist: string,
    isLiked: boolean,
    title: string, 
    duration: number,
    fileKey: string,
    coverUrl: string,
    waveform: JSON
}

type TrackState = {
    track: Track | null;
    isPlaying: boolean;
    setTrack: (track: Track | null) => void;
    setPlaying: (isPlaying: boolean) => void;
}

export const useTracksStore = create<TrackState>()(
    devtools(
        (set) => ({
            track: null,
            isPlaying: false,
            setTrack: (track) => set({ track }),
            setPlaying: (isPlaying) => set({ isPlaying }),
        }),
        { name: 'TrackStore' }
    )
);
