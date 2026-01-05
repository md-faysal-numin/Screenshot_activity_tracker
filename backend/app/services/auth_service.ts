import User from '#models/user'
import Company from '#models/company'
import Plan from '#models/plan'
import db from '@adonisjs/lucid/services/db'

type EmployeeFilters = {
  search: string
  currentPage: number
  perPage: number
}

export default class AuthService {
  /**
   * Register a new company with owner
   */
  async registerCompany(data: {
    ownerName: string
    ownerEmail: string
    ownerPassword: string
    companyName: string
    planId: number
  }) {
    // Verify plan exists
    const plan = await Plan.findOrFail(data.planId)
    // console.log('plan found')
    // Use transaction to ensure data consistency
    const result = await db.transaction(async (trx) => {
      // Create owner user first

      // Create company
      const company = await Company.create(
        {
          name: data.companyName,
          planId: plan.id,
          //ownerId: owner.id,
        },
        { client: trx }
      )

      const owner = await User.create(
        {
          fullName: data.ownerName,
          email: data.ownerEmail,
          password: data.ownerPassword,
          role: 'owner',
          companyId: company.id,
        },
        { client: trx }
      )

      await owner.load('company', (query) => {
        query.preload('plan')
      })

      return { owner, company }
    })

    return result
  }

  /**
   * Login user
   */
  async login(email: string, password: string) {
    // console.log(email, password)
    const user = await User.verifyCredentials(email, password)
    // console.log('thik ase')
    // await user.load('company', (query) => {
    //   query.preload('plan')
    // })
    return user
  }

  /**
   * Create employee for a company
   */
  async createEmployee(
    ownerId: number,
    data: {
      name: string
      email: string
      password: string
    }
  ) {
    // Get owner and verify they own a company
    const owner = await User.query()
      .where('id', ownerId)
      .where('role', 'owner')
      .preload('company')
      .firstOrFail()

    if (!owner.companyId) {
      throw new Error('Owner does not have a company')
    }

    // Create employee
    const employee = await User.create({
      fullName: data.name,
      email: data.email,
      password: data.password,
      role: 'employee',
      companyId: owner.companyId,
    })

    await employee.load('company')
    return employee
  }

  /**
   * Get all employees for a company
   */
  async getCompanyEmployees(ownerId: number, filters: Partial<EmployeeFilters>) {
    const owner = await User.query().where('id', ownerId).where('role', 'owner').firstOrFail()
    let { currentPage = 1, perPage = 10, search = '' } = filters
    if (!owner.companyId) {
      throw new Error('Owner does not have a company')
    }

    const query = User.query()
      .where('company_id', owner.companyId)
      .where('role', 'employee')
      .orderBy('fullName', 'asc')

    if (search) {
      query.where('fullName', 'like', `%${search}%`)
    }
    const employees = await query.paginate(currentPage, Math.min(perPage, 10))
    return employees
  }

  async deleteEmployee(employeeId: number) {
    const employee = await User.query().where('id', employeeId).firstOrFail()
    await employee.delete()
  }
}
