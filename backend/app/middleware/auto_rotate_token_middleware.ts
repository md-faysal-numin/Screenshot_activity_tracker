import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import jwt from 'jsonwebtoken'
// import env from '#start/env'

/**
 * Auto-rotate JWT tokens after a certain period
 * This middleware checks if the token is older than X days and rotates it
 */
export default class JwtAutoRotateMiddleware {
  // Rotate token if older than 30 days (configurable)
  private rotationThresholdDays = 30

  async handle(ctx: HttpContext, next: NextFn) {
    await next()

    // Only process on successful requests
    if (ctx.response.getStatus() >= 400) {
      return
    }

    // Check if user is authenticated
    if (!ctx.auth.user) {
      return
    }

    // Get the current token from Authorization header
    const authHeader = ctx.request.header('authorization')
    if (!authHeader) {
      return
    }

    const [, token] = authHeader.split('Bearer ')
    if (!token) {
      return
    }

    try {
      // Decode token without verification (we already verified in guard)
      const decoded = jwt.decode(token) as any

      if (!decoded || !decoded.iat) {
        return
      }

      // Calculate token age
      const tokenAge = Date.now() / 1000 - decoded.iat
      const thresholdSeconds = this.rotationThresholdDays * 24 * 60 * 60

      // If token is older than threshold, add new token to response header
      if (tokenAge > thresholdSeconds) {
        const newToken = await ctx.auth.use('jwt').generate(ctx.auth.user)

        // Add new token to response header for client to use
        ctx.response.cookie('token', newToken.token)
        ctx.response.header('X-Token-Rotated', 'true')
      }
    } catch (error) {
      // Silently fail - don't break the request
      console.error('Token rotation check failed:', error)
    }
  }
}
