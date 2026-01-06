import Screenshot from '#models/screenshot'
import User from '#models/user'
import { DateTime } from 'luxon'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import { cuid } from '@adonisjs/core/helpers'
import db from '@adonisjs/lucid/services/db'
import cloudinary from '#config/cloudinary'

interface GroupedScreenshot {
  hour: number
  intervals: {
    interval: string
    startTime: string
    endTime: string
    screenshots: Screenshot[]
  }[]
}

export default class ScreenshotService {
  /**
   * Upload screenshot for employee
   */
  async uploadScreenshot(userId: number, screenshot: MultipartFile, capturedAt?: DateTime) {
    const user = await User.query().where('id', userId).preload('company').firstOrFail()

    if (!user.companyId) {
      throw new Error('User does not belong to a company')
    }

    // // Generate unique filename
    // const fileName = `${cuid()}.${screenshot.extname}`
    // const filePath = `screenshots/${user.companyId}/${user.id}/${fileName}`

    // // Move file to storage
    // await screenshot.move(app.makePath('storage/uploads'), {
    //   name: fileName,
    //   overwrite: true,
    // })
    // const fileName = `${cuid()}.${screenshot.extname}`
    // const relativePath = `screenshots/${user.companyId}/${user.id}`
    // const absolutePath = app.makePath(`storage/uploads/${relativePath}`)

    // await screenshot.move(absolutePath, {
    //   name: fileName,
    //   overwrite: true,
    // })
    // const filePath = `${relativePath}/${fileName}`

    const fileName = `${cuid()}.${screenshot.extname}`

    // Optional: set a folder path in Cloudinary similar to local structure
    const folderPath = `screenshots/company_${user.companyId}/employee_${user.id}`

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(screenshot.tmpPath!, {
      folder: folderPath,
      public_id: fileName.replace(`.${screenshot.extname}`, ''),
      overwrite: true,
    })

    // console.log(result)
    // Cloudinary file URL
    const filePath = result.secure_url

    // Use provided capturedAt or current time
    const captureTime = capturedAt || DateTime.now()

    // console.log(captureTime)
    // Create screenshot record
    const screenshotRecord = await Screenshot.create({
      userId: user.id,
      companyId: user.companyId,
      filePath: filePath,
      capturedAt: captureTime,
      capturedDate: captureTime,
    })

    return screenshotRecord
  }

  /**
   * Get screenshots with filtering and grouping
   */
  async getScreenshots(
    requestUserId: number,
    filters: {
      userId?: number
      date?: DateTime
      startDate?: DateTime
      endDate?: DateTime
      groupBy?: '5min' | '10min'
      timezone?: string
    }
  ) {
    const requestUser = await User.findOrFail(requestUserId)

    if (!requestUser.companyId) {
      throw new Error('User does not belong to a company')
    }

    // Build query
    // console.log(requestUser, filters.date)
    let query = Screenshot.query()
      .where('company_id', requestUser.companyId)
      .preload('user', (userQuery) => {
        userQuery.select('id', 'fullName')
      })
    // console.log(filters)
    // If owner, can see all employees. If employee, only their own
    if (requestUser.isEmployee()) {
      query = query.where('user_id', requestUser.id)
    } else if (filters.userId) {
      // Owner filtering by specific employee
      query = query.where('user_id', filters.userId)
    }
    //console.log('processing filters', filters)

    // Date filtering
    if (filters.date) {
      query = query.where('captured_date', filters.date.toSQLDate()!)
    } else if (filters.startDate && filters.endDate) {
      query = query
        .where('captured_date', '>=', filters.startDate.toSQLDate()!)
        .where('captured_date', '<=', filters.endDate.toSQLDate()!)
    }

    query = query.orderBy('captured_at', 'asc')

    const screenshots = await query
    // Only allow grouping on single day
    if (filters.groupBy && (!filters.date || filters.startDate || filters.endDate)) {
      throw new Error('Grouping only supported for single date')
    }

    // Limit max results
    query = query.limit(100)
    // Group by hour and intervals if requested
    if (filters.groupBy) {
      return this.groupScreenshots(screenshots, filters.groupBy, filters.timezone)
    }

    return screenshots
  }

  /**
   * Group screenshots by hour and minute intervals
   */
  private groupScreenshots(
    screenshots: Screenshot[],
    interval: '5min' | '10min',
    timezone?: string
  ): GroupedScreenshot[] {
    const intervalMinutes = interval === '5min' ? 5 : 10
    const grouped: Map<number, Map<number, Screenshot[]>> = new Map()

    screenshots.forEach((screenshot) => {
      const localCapturedAt = screenshot.capturedAt.setZone(timezone || 'utc')
      const hour = localCapturedAt.hour
      const minute = localCapturedAt.minute
      const intervalIndex = Math.floor(minute / intervalMinutes)

      if (!grouped.has(hour)) {
        grouped.set(hour, new Map())
      }

      const hourGroup = grouped.get(hour)!
      if (!hourGroup.has(intervalIndex)) {
        hourGroup.set(intervalIndex, [])
      }

      hourGroup.get(intervalIndex)!.push(screenshot)
    })

    // Format output
    const result: GroupedScreenshot[] = []

    grouped.forEach((hourData, hour) => {
      const intervals: GroupedScreenshot['intervals'] = []

      hourData.forEach((screenshots, intervalIndex) => {
        const startMinute = intervalIndex * intervalMinutes
        const endMinute = startMinute + intervalMinutes - 1

        intervals.push({
          interval: `${intervalIndex}`,
          startTime: `${hour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`,
          endTime: `${hour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`,
          screenshots: screenshots,
        })
      })

      result.push({
        hour,
        intervals: intervals.sort((a, b) => parseInt(a.interval) - parseInt(b.interval)),
      })
    })

    return result.sort((a, b) => a.hour - b.hour)
  }

  /**
   * Get screenshot statistics for dashboard
   */
  async getStatistics(userId: number, date?: DateTime) {
    const user = await User.findOrFail(userId)

    if (!user.companyId) {
      throw new Error('User does not belong to a company')
    }

    let query = db
      .from('screenshots')
      .where('company_id', user.companyId)
      .count('* as total')
      .countDistinct('user_id as active_employees')

    if (date) {
      query = query.where('captured_date', date.toSQLDate()!)
    }

    if (user.isEmployee()) {
      query = query.where('user_id', user.id)
    }

    const stats = await query.first()

    return stats
  }
}
