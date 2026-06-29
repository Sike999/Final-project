export type genreImages = {
    genre: string,
    url: string
}

export interface AuthUser {
  id: string,
  email: string,
  name: string,
  role: 'listener' | 'artist' | 'admin',
  nickname: string,
  avatarUrl: string,
  profileCoverUrl: string
}

export interface AuthResponse {
  user: AuthUser,
  accessToken: string
}

export interface RefreshResponse {
  accessToken: string
}

export type Role = 'listener' | 'artist' | 'admin'