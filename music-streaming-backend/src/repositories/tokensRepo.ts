import prismaClient from "../prismaClient.ts";
import bcrypt from 'bcrypt'

export function createTokensRepo() {
    return {
        async findAllRefreshTokens ( page = 1, limit = 20,) {
            const where = {}
            const [data, total] = await Promise.all ([
                prismaClient.userRefreshTokens.findMany({
                    where,
                    skip: (page - 1) * limit,
                    take: limit,
                }),
                prismaClient.userRefreshTokens.count({where})
            ])
            return {
                data: data,
                total: total,
                page: page,
                limit: limit,
            }
        },
        async findRefreshTokensByUserId (userId:number) {
            const refreshToken = await prismaClient.userRefreshTokens.findMany({
                where: {
                    userId: userId,
                },
            });
            return refreshToken
        },

        async createRefreshToken (userId:number, tokenHash:string) {
            const expires = Date.now() + 604800000
            const user = await prismaClient.userRefreshTokens.create({
                data: {
                    userId: userId,
                    token: tokenHash,
                    expiresAt: new Date(expires),
                },
            })
            return user.id
        },

        async removeRefreshTokensByUser (userId: number) {
            const result = await prismaClient.userRefreshTokens.deleteMany({
                where: {
                    userId: userId,
                },
        });

        return result;
        },

        async removeExpired() {
            const result = await prismaClient.userRefreshTokens.deleteMany({
                where: {
                    expiresAt: {
                        lt: new Date(),
                    },
                },
            });
            return result.count
        },

        async deleteRefreshToken(id: number) {
            const result = await prismaClient.userRefreshTokens.delete({
                where: {id: id}
            })
            return result.id
        },

        async findRefreshToken (refToken: string, userId: number) {
            const tokens = await this.findRefreshTokensByUserId(userId)

            for (const t of tokens) {
                const isValid = await bcrypt.compare(refToken,t.token)
                if (isValid) {
                    return t
                }
            }
            return null
        },
    }
}