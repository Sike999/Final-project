import prismaClient from "../prismaClient.ts";
import { Role, } from "@prisma/client";
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt'
import { verify } from "node:crypto";
export type CreateUserInput = Omit<Prisma.UserCreateInput, 'id' | 'createdAt' | 'updatedAt'>;

export interface RefreshTokenRecord {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
}

export function createUserRepository() {
    return {
        async findAll( page = 1, limit = 20, role:Role ) {
            let where = {}
            if (role) {
                where = {
                    ...(role && {role })
                }
            }
            const [data, total] = await Promise.all ([
                prismaClient.user.findMany({
                    where,
                    orderBy: {createdAt:'desc'},
                    skip: (page - 1) * limit,
                    take: limit,
                }),
                prismaClient.user.count({where})
            ])
            return {
                data: data,
                total: total,
                page: page,
                limit: limit,
            }
        },
        async findById(id:number) {
            const user = await prismaClient.user.findUnique({where:{id}})
            return user
        },

        async create(data : CreateUserInput) {

            const user = await prismaClient.user.create({
                data: {
                    email: data.email,
                    passwordHash: data.passwordHash,
                    name: data.name,
                    nickname: data.nickname ?? null,
                    role: data.role || 'listener',
                },
            })
            return user
        },

        async update(id:number, data: CreateUserInput) {
            try {
            const user = await prismaClient.user.update({
                data: {
                    email: data.email,
                    passwordHash: data.passwordHash,
                    name: data.name,
                    nickname: data.nickname ?? null,
                    role: data.role || 'listener',
                    profileCoverUrl: data.profileCoverUrl,
                    avatarUrl: data.avatarUrl,
                    updatedAt: new Date
                },
                where: {id}
            })
            return user.id
            }
            catch(err) {
                if (err.code === "P2025") return null
                throw err
            }
        },
        async remove(id: number) {
            try {
            await prismaClient.user.delete({
                where:{id}
            })
            return true
            }
            catch(err) {
                if (err.code === "P2025") return null
                throw err
            }
        },

        async verifyPassword(id:number,passwordHash:string) {
            const user = await this.findById(id)        
            if (user) return  bcrypt.compare(passwordHash, user.passwordHash)
            else throw new Error('User not found')
        },

        async emailExist(email:string) {
            const count = await prismaClient.user.count({
                where: {email}
            })
            return count > 0 
        },
        
        async nicknameExist(nickname: string) {
            const count = await prismaClient.user.count({
                where: {nickname}
            })
            return count > 0
        },
        
        async findUserByEmail(email:string) {
            const user = await prismaClient.user.findFirst({
                where:{email: email}
            })
            return user
        },
        async setAvatar() {

        },
        async setProfileCover() {

        }
    }
}