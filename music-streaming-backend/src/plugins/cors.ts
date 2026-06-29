import fp from 'fastify-plugin'
import cors, {type FastifyCorsOptions} from '@fastify/cors'


export default fp<FastifyCorsOptions>(async(instance) => {
  instance.register(cors, {
    origin: 'http://localhost:5173',
    methods: [
      'GET',
      'HEAD',
      'POST',
      'PATCH',
      'DELETE',
      'OPTIONS'
    ],
    allowedHeaders: [
      'Accept',
      'Accept-Encoding',
      'Authorization',
      'Content-Type',
      'Content-Encoding',
      'Content-Range'
    ],
    credentials: true,
    maxAge: 3600
  })
})