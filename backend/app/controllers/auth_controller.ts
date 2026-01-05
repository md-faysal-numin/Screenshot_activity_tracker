import type { HttpContext } from '@adonisjs/core/http'
import AuthService from '#services/auth_service'
import { registerCompanyValidator, loginValidator } from '#validators/auth'
// import User from '#models/user'

export default class AuthController {
  private authService = new AuthService()

  /**
   * Register a new company with owner
   * POST /api/auth/register
   */
  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerCompanyValidator)
    try {
      // console.log(request.all())
      // console.log('before validation')
      // console.log('validation completed')
      const { owner, company } = await this.authService.registerCompany(payload)

      return response.created({
        message: 'Company registered successfully',
        data: {
          owner: {
            id: owner.id,
            fullName: owner.fullName,
            email: owner.email,
            role: owner.role,
          },
          company: {
            id: company.id,
            name: company.name,
            plan: owner.company?.plan,
          },
        },
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Failed to create company and user. Please try again.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      })
    }
  }

  /**
   * Login user
   * POST /api/auth/login
   */
  async login({ request, response, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    console.log('after validation')
    try {
      // console.log(email, password)
      // console.log('validation completed')
      const user = await this.authService.login(email, password)

      // // Generate JWT token (using AdonisJS auth)
      // const token = await User.accessTokens.create(user, ['*'], {
      //   expiresIn: undefined, // Token never expires as per requirement
      // })

      const token = await auth.use('jwt').generate(user)
      response.cookie('token', token.token, {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      })
      return response.ok({
        message: 'Login successful',
        data: {
          user: {
            id: user.id,
            fullName: user.fullName,
            role: user.role,
          },
          token,
        },
      })
    } catch (error) {
      return response.unauthorized({
        message: 'Invalid credentials',
      })
    }
  }

  /**
   * Get authenticated user details
   * GET /api/auth/me
   */
  async me({ auth, response }: HttpContext) {
    const user = auth.user!

    return response.ok({
      data: {
        id: user.id,
        fullName: user.fullName,
        role: user.role,
      },
    })
  }

  /**
   * Logout user (revoke token)
   * POST /api/auth/logout
   */
  async logout({ response }: HttpContext) {
    // const user = auth.user!
    // await User.accessTokens.delete(user, user.currentAccessToken.identifier)

    response.clearCookie('token')

    return response.ok({
      message: 'Logged out successfully',
    })
  }

  /**
   * Rotate token (auto-rotation as per requirement)
   * POST /api/auth/rotate-token
   */
  // async rotateToken({ auth, response }: HttpContext) {
  //   const user = auth.user!

  //   // Delete current token
  //   response.clearCookie('token')

  //   // Create new token
  //   const newToken = await auth.use('jwt').generate(user)
  //   response.cookie('token', newToken.token, {
  //     httpOnly: true,
  //     sameSite: 'strict',
  //     path: '/',
  //     maxAge: 60 * 60 * 24 * 30,
  //   })

  //   return response.ok({
  //     message: 'Token rotated successfully',
  //   })
  // }
}
