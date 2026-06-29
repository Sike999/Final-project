import jwt, {type JwtPayload} from 'jsonwebtoken';

export interface TokenPayload {
    userId: number,
    email: string,
    role: string,
    nickname: string | null,
    avatarUrl: string | null,
    profileCoverUrl: string | null
}

export const generateAccessToken = (payload: TokenPayload): string => {
    const ttl = process.env.ACCESS_TOKEN_TTL || '15m';
    const secret = process.env.ACCESS_TOKEN_SECRET!
    return jwt.sign(payload, secret, {
        expiresIn: ttl as jwt.SignOptions['expiresIn']
    })
}

export const generateRefreshToken = (payload: TokenPayload,): string => {
    const ttl = process.env.REFRESH_TOKEN_TTL || '7d';
    const secret = process.env.REFRESH_TOKEN_SECRET!
    return jwt.sign(payload, secret, {
        expiresIn: ttl as jwt.SignOptions['expiresIn']
    })
}

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload & TokenPayload;
}

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as  JwtPayload & TokenPayload;
}