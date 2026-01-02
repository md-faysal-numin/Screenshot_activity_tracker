import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Company from './company.js'

export default class Screenshot extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number
  @column({ serializeAs: null })
  declare companyId: number

  @column()
  declare filePath: string

  @column.date()
  declare capturedDate: DateTime

  @column.dateTime()
  declare capturedAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => Company)
  declare company: BelongsTo<typeof Company>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
