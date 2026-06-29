import fp from 'fastify-plugin'
import cookie, {type FastifyCookieOptions} from '@fastify/cookie'

export default fp<FastifyCookieOptions>(async(instance) => {
  instance.register(cookie, {

    secret: process.env.COOKIE_SECRET,

  })
})