import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { type AuthUser } from '../types'


type UserState = {
    user: AuthUser | null;
    isLoading: boolean;
    setUser: (user: AuthUser | null) => void;
    setLoading: (isLoading: boolean) => void;
    logout: () => void;
}

export const useUserStore = create<UserState>()(
    devtools(
        (set) => ({
            user: null,
            isLoading: true,
            setUser: (user) => set({ user }),
            setLoading: (isLoading) => set({ isLoading }),
            logout: () => set({ user: null }),
        }),
        { name: 'UserStore' }
    )
);
