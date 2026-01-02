import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Plan from './plan.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Screenshot from './screenshot.js'

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare planId: number

  @column()
  declare name: string

  // @column()
  // declare ownerId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  // Relationships
  @belongsTo(() => Plan)
  declare plan: BelongsTo<typeof Plan>

  // @belongsTo(() => User, {
  //   foreignKey: 'ownerId',
  // })
  // declare owner: BelongsTo<typeof User>

  @hasMany(() => User, {
    foreignKey: 'companyId',
  })
  declare employees: HasMany<typeof User>

  @hasMany(() => Screenshot)
  declare screenshots: HasMany<typeof Screenshot>
}
