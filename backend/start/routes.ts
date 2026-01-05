import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const EmployeeController = () => import('#controllers/employee_controller')
const ScreenshotController = () => import('#controllers/screenshot_controller')
const PlanController = () => import('#controllers/plan_controller')

// Public routes
router
  .group(() => {
    // Auth routes
    router.post('/auth/register', [AuthController, 'register'])
    router.post('/auth/login', [AuthController, 'login'])

    // Plans (public to see available plans during registration)
    router.get('/plans', [PlanController, 'index'])
    router.get('/plans/:id', [PlanController, 'show'])
  })
  .prefix('/api')

// Protected routes (requires authentication)
router
  .group(() => {
    // Auth routes
    router.get('/auth/me', [AuthController, 'me'])
    router.post('/auth/logout', [AuthController, 'logout'])

    // Employee management (Owner only, checked in controller)
    router
      .group(() => {
        router.post('/employees', [EmployeeController, 'store'])
        router.get('/employees', [EmployeeController, 'index'])
        router.get('/employees/:id', [EmployeeController, 'show'])
        router.delete('/employees/:id', [EmployeeController, 'destroy'])
        router.get('/screenshots', [ScreenshotController, 'index'])
        router.get('/screenshots/stats', [ScreenshotController, 'stats'])
      })
      .middleware([middleware.adminAuth()])

    // Screenshot routes
    router.post('/screenshots/upload', [ScreenshotController, 'upload'])
  })
  .prefix('/api')
  .middleware([middleware.auth(), middleware.autoRotateToken()])

// Health check
router.get('/health', async ({ response }) => {
  return response.ok({ status: 'ok', timestamp: new Date().toISOString() })
})
