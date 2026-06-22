import { type FastifyPluginAsync } from "fastify";
import prismaClient from "../../prismaClient.ts";

const genreImagesRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/genreImages', async () => {
      const genres = await prismaClient.genreImages.findMany();
      return genres;
  });
};

export default genreImagesRoute;