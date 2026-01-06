import type { HttpContext } from '@adonisjs/core/http'
import AuthService from '#services/auth_service'
import { createEmployeeValidator } from '#validators/employee'
import { inject } from '@adonisjs/core'

@inject()
export default class EmployeeController {
  // private authService = new AuthService()
  constructor(private authService: AuthService) {}
  /**
   * Create a new employee (Owner only)
   * POST /api/employees
   */
  async store({ auth, request, response }: HttpContext) {
    try {
      const owner = auth.user!

      if (!owner.isOwner()) {
        return response.forbidden({
          message: 'Only company owners can create employees',
        })
      }

      const payload = await request.validateUsing(createEmployeeValidator)

      const employee = await this.authService.createEmployee(owner.id, payload)

      return response.created({
        message: 'Employee created successfully',
        data: {
          id: employee.id,
          fullName: employee.fullName,
          email: employee.email,
          role: employee.role,
          company: employee.company,
        },
      })
    } catch (error) {
      if (error.code === '23505') {
        return response.conflict({
          message: 'Email already exists',
        })
      }
      throw error
    }
  }

  /**
   * Get all employees (Owner only)
   * GET /api/employees?search=name
   */
  async index({ auth, request, response }: HttpContext) {
    const owner = auth.user!

    if (!owner.isOwner()) {
      return response.forbidden({
        message: 'Only company owners can view employees',
      })
    }

    const filters = request.qs()

    const employees = await this.authService.getCompanyEmployees(owner.id, filters)
    // console.log(employees)

    // return response.ok({
    //   data: employees.map((emp) => ({
    //     id: emp.id,
    //     fullName: emp.fullName,
    //     email: emp.email,
    //     role: emp.role,
    //     createdAt: emp.createdAt,
    //   })),

    // })
    return response.ok(employees)
  }

  /**
   * Get single employee (Owner only)
   * GET /api/employees/:id
   */
  async show({ auth, params, response }: HttpContext) {
    const owner = auth.user!

    if (!owner.isOwner()) {
      return response.forbidden({
        message: 'Only company owners can view employees',
      })
    }

    const employees = await this.authService.getCompanyEmployees(owner.id, {})
    const employee = employees.find((emp) => emp.id === params.id)

    if (!employee) {
      return response.notFound({
        message: 'Employee not found',
      })
    }

    return response.ok({
      data: {
        id: employee.id,
        fullName: employee.fullName,
        email: employee.email,
        role: employee.role,
        createdAt: employee.createdAt,
      },
    })
  }

  async destroy({ auth, params, response }: HttpContext) {
    const owner = auth.user!
    // console.log(typeof params.id, owner.fullName)
    if (!owner.isOwner()) {
      return response.forbidden({
        message: 'Only company owners can delete employees',
      })
    }

    const employees = await this.authService.getCompanyEmployees(owner.id, {})
    const employee = employees.find((emp) => emp.id == Number(params.id))

    if (!employee) {
      return response.notFound({
        message: 'Employee not found',
      })
    }

    await this.authService.deleteEmployee(employee.id)

    return response.ok({
      message: 'Employee deleted successfully',
    })
  }
}
