import vine from '@vinejs/vine'
// import { time } from 'console'

export const uploadScreenshotValidator = vine.compile(
  vine.object({
    screenshot: vine.file({
      size: '5mb',
      extnames: ['jpg', 'jpeg', 'png', 'webp'],
    }),
    // capturedAt: vine
    //   .date({
    //     formats: ['ISO8601', 'YYYY-MM-DD HH:mm:ss'],
    //   })
    //   .optional(),
    capturedAt: vine
      .date({
        formats: { utc: true }, // This enables full ISO 8601 parsing (including milliseconds and Z/+offset)
      })
      .optional(),
  })
)

export const getScreenshotsValidator = vine.compile(
  vine.object({
    userId: vine.number().positive().optional(),
    date: vine
      .date({
        formats: ['YYYY-MM-DD'],
      })
      .optional(),
    startDate: vine
      .date({
        formats: ['YYYY-MM-DD'],
      })
      .optional(),
    endDate: vine
      .date({
        formats: ['YYYY-MM-DD'],
      })
      .optional(),
    groupBy: vine.enum(['5min', '10min']).optional(),
    timezone: vine.string().optional(),
  })
)
