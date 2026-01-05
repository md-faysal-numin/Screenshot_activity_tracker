import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Company from './company.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Screenshot from './screenshot.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column({ serializeAs: null })
  declare companyId: number | null

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare role: 'owner' | 'employee'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Company)
  declare company: BelongsTo<typeof Company>

  @hasMany(() => Screenshot)
  declare screenshots: HasMany<typeof Screenshot>

  isOwner() {
    return this.role === 'owner'
  }
  isEmployee() {
    return this.role === 'employee'
  }

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
