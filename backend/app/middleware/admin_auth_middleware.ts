import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AdminAuthMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn) {
    await auth.authenticate()

    if (!auth.user || auth.user.role !== 'owner') {
      return response.forbidden({ error: 'Access denied' })
    }

    const output = await next()
    return output
  }
}
