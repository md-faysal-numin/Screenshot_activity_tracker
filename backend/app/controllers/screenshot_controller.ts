import type { HttpContext } from '@adonisjs/core/http'
import ScreenshotService from '#services/screenshot_service'
import { uploadScreenshotValidator, getScreenshotsValidator } from '#validators/screenshot'
import { DateTime } from 'luxon'

export default class ScreenshotController {
  private screenshotService = new ScreenshotService()

  /**
   * Upload screenshot (Employee or Owner)
   * POST /api/screenshots/upload
   */
  async upload({ auth, request, response }: HttpContext) {
    try {
      const user = auth.user!
      // console.log('payload received')
      const payload = await request.validateUsing(uploadScreenshotValidator)
      // console.log('payload validated')

      const capturedAt = payload.capturedAt ? DateTime.fromJSDate(payload.capturedAt) : undefined

      const screenshot = await this.screenshotService.uploadScreenshot(
        user.id,
        payload.screenshot,
        capturedAt
      )

      return response.created({
        message: 'Screenshot uploaded successfully',
        data: {
          id: screenshot.id,
          filePath: screenshot.filePath,
          capturedAt: screenshot.capturedAt,
          capturedDate: screenshot.capturedDate,
        },
      })
    } catch (error) {
      return response.badRequest({
        message: 'Failed to upload screenshot',
        error: error.message,
      })
    }
  }

  /**
   * Get screenshots with filtering and grouping
   * GET /api/screenshots?userId=1&date=2025-01-15&groupBy=5min
   */
  async index({ auth, request, response }: HttpContext) {
    try {
      const user = auth.user!
      const filters = await request.validateUsing(getScreenshotsValidator)
      // console.log('filters validated')
      // Convert date strings to DateTime objects
      const processedFilters = {
        userId: filters.userId,
        date: filters.date ? DateTime.fromJSDate(filters.date) : undefined,
        startDate: filters.startDate ? DateTime.fromJSDate(filters.startDate) : undefined,
        endDate: filters.endDate ? DateTime.fromJSDate(filters.endDate) : undefined,
        groupBy: filters.groupBy,
      }

      const screenshots = await this.screenshotService.getScreenshots(user.id, processedFilters)

      return response.ok({
        data: screenshots,
      })
    } catch (error) {
      return response.badRequest({
        message: 'Failed to fetch screenshots',
        error: error.message,
      })
    }
  }

  /**
   * Get screenshot statistics
   * GET /api/screenshots/stats?date=2025-01-15
   */
  async stats({ auth, request, response }: HttpContext) {
    try {
      const user = auth.user!
      const dateParam = request.input('date')

      const date = dateParam ? DateTime.fromISO(dateParam) : undefined

      const statistics = await this.screenshotService.getStatistics(user.id, date)

      return response.ok({
        data: statistics,
      })
    } catch (error) {
      return response.badRequest({
        message: 'Failed to fetch statistics',
        error: error.message,
      })
    }
  }
}
