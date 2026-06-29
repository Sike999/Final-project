import z from 'zod'

export const createUser = z.object({
    email: z.email(),
    password: z.string(), 
    name: z.string().min(2).max(100), 
    nickname: z.string().min(2).max(100),
    role:  z.enum(['listener','artist','admin']), 
    profileCoverUrl: z.string().max(550), 
    avatarUrl: z.string().max(550), 
})