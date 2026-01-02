import Plan from '#models/plan'
import type { HttpContext } from '@adonisjs/core/http'

export default class PlanController {
  async index({ response }: HttpContext) {
    const plans = await Plan.all()

    return response.ok({
      data: plans.map((plan) => ({
        id: plan.id,
        name: plan.name,
        pricePerEmployee: plan.pricePerEmployee,
      })),
    })
  }

  async show({ params, response }: HttpContext) {
    try {
      const plan = await Plan.findOrFail(params.id)

      return response.ok({
        data: {
          id: plan.id,
          name: plan.name,
          pricePerEmployee: plan.pricePerEmployee,
        },
      })
    } catch (error) {
      return response.notFound({
        message: 'Plan not found',
      })
    }
  }
}
