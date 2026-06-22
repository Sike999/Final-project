import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';
import { type FastifyInstance } from 'fastify';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function staticPlugin(fastify: FastifyInstance) {
  await fastify.register(fastifyStatic, {
    root: path.join(__dirname, '../../public'),
    prefix: '/public/',
  });
}