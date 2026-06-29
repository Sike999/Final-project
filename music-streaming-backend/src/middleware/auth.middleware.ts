import { type FastifyRequest, type FastifyReply } from 'fastify';
import { verifyAccessToken } from '../utils/jwt.ts';


declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      userId: number,
      email: string,
      role: string,
    };
  }
}

export const authMiddleware = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return reply.code(401).send({ error: 'Access token is missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
  } catch (err) {
    return reply.code(401).send({ error: 'Invalid or expired access token' });
  }
};

export const requireRole = (...roles: string[]) => {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    if (!req.user) {
      return reply.code(401).send({ error: 'Not authenticated' });
    }

    if (!roles.includes(req.user.role)) {
      return reply.code(403).send({ error: 'Insufficient permissions' });
    }
  };
};