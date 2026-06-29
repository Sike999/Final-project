import { createUserRepository } from "../../repositories/usersRepo.ts"
import { createTokensRepo } from "../../repositories/tokensRepo.ts"
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/jwt.ts"
import { type FastifyPluginAsync } from "fastify"
import { authMiddleware, requireRole } from "../../middleware/auth.middleware.ts"
import { userLogSchema, userRegSchema } from "../../schemas/userSchema.ts"

import bcrypt from 'bcrypt'



const tokensRepository = createTokensRepo()
const usersRepository = createUserRepository()

type RegisterBody = {
  email: string
  name: string
  password: string
  role: 'listener' | 'artist' | 'admin'
  nickname?: string
}
type LoginBody = {
  email: string,
  password: string
}


const authRoutes: FastifyPluginAsync = async (fastify) => {

  fastify.post<{Body:RegisterBody}>('/register', 
    { schema: {
      body: {
        type: 'object',
        required: ['email', 'name', 'password', 'role'],
        properties: userRegSchema
      }
     }
    },
    async (req,rep) => {
    if (req.body.nickname){
      const nicknameExists = await usersRepository.nicknameExist(req.body.nickname)
      if (nicknameExists) {
        rep.code(409).send({error: 'Nickname already exists'})
      }
    }
    const emailExists = await usersRepository.emailExist(req.body.email)
    if (emailExists) {
      rep.code(409).send({error: 'Email already exisits'})
    }
    
    const passwordHash = await bcrypt.hash(req.body.password,12)

    const user = await usersRepository.create({
      email:req.body.email,
      passwordHash:passwordHash,
      name:req.body.name,
      nickname:req.body.nickname,
      role:req.body.role,
    })
    const payload = {userId: user.id, email:user.email, role:user.role, nickname: user.nickname, avatarUrl: user.avatarUrl, profileCoverUrl: user.profileCoverUrl}
    const accessToken = generateAccessToken(payload)
    const refreshToken = generateRefreshToken(payload)

    const hashRefresh = await bcrypt.hash(refreshToken, 12)
    tokensRepository.createRefreshToken(user.id,hashRefresh)

    rep.setCookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',

    })

    return rep.code(201).send({
      user: { id: user.id, email: user.email, name:user.name, role: user.role, nickname: user.nickname },
      accessToken,
    })
  })

  fastify.post('/refresh', async (req,rep) => {
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) {
      return rep.code(401).send({ error: 'Refresh token is missing' })
    }

    let record = null;
    let payload = null;

    try {
      payload = verifyRefreshToken(refreshToken)
      
      record = await tokensRepository.findRefreshToken(refreshToken,payload.userId)
      if (!record) {
        return rep.code(401).send({ error: 'Refresh token is revoked' })
      }

      const newAccessToken = generateAccessToken({
            userId: payload.userId,
            email: payload.email,
            role: payload.role,
            nickname: payload.nickname,
            avatarUrl: payload.avatarUrl,
            profileCoverUrl: payload.profileCoverUrl,
        });

      rep.setCookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60,

      })

      return rep.send({ accessToken: newAccessToken })
    }
    catch(err){
      if (!record) {
        return rep.code(401).send({ error: 'Refresh token is revoked' })
      }
      await tokensRepository.removeRefreshTokensByUser(record.userId)
      rep.clearCookie('refreshToken', { path: '/' });
      return rep.code(401).send({ error: 'Refresh token invalid' })
    }
  })

  fastify.post<{Body:LoginBody}>('/login',
    {
      schema: {
        body:{
          type:'object',
          required:['email','password',],
          properties: userLogSchema
        }
      }
    },
    async(req,rep) => {
  
    const user = await usersRepository.findUserByEmail(req.body.email)
    if (!user) {
        return rep.code(409).send({ error: 'Wrong email or password' })
    }

    const passwordVerified = await usersRepository.verifyPassword(user.id, req.body.password)
    if (!passwordVerified) {
        return rep.code(409).send({ error: 'Wrong email or password' })
    }

    const payload = {userId: user.id, email:user.email, role:user.role, nickname: user.nickname, avatarUrl: user.avatarUrl, profileCoverUrl: user.profileCoverUrl}
    const accessToken = generateAccessToken(payload)
    const refreshToken = generateRefreshToken(payload)

    if (refreshToken) {
      const record = await tokensRepository.findRefreshToken(refreshToken,user.id)
      if (record) tokensRepository.deleteRefreshToken(record.id)
      const refHash = await bcrypt.hash(refreshToken,12)
      tokensRepository.createRefreshToken(payload.userId,refHash)
    }
    rep.setCookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,

    })
    return rep.send({
      user: { id: user.id, email: user.email, name:user.name, role: user.role, nickname: user.nickname, avatarUrl: user.avatarUrl, profileCoverUrl: user.profileCoverUrl },
      accessToken,
    });
    })

  fastify.post('/logout', async(req,rep) => {
    const refreshToken = req.cookies.refreshToken

      if (refreshToken) {
      const payload = await verifyRefreshToken(refreshToken)
      const record = await tokensRepository.findRefreshToken(refreshToken,payload.userId)
      if (record) {
      const del = await tokensRepository.deleteRefreshToken(record.id)}
      }
    

    rep.clearCookie('refreshToken', { path: '/'})
    return rep.send({message: 'Logged out'})
  })

  fastify.get('/profile', { preHandler: authMiddleware }, async(req,rep) => {
    const user = await usersRepository.findById(req.user!.userId)
    if(!user) {
      return rep.code(404).send({ error: 'User not found' })
    }
    return rep.send({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        nickname: user.nickname,
        avatarUrl: user.avatarUrl,
        profileCoverUrl: user.profileCoverUrl
      })
  })
}
export default authRoutes