// import { BaseSchema } from '@adonisjs/lucid/schema'

// export default class extends BaseSchema {
//   protected tableName = 'screenshots'

//   async up() {
//     this.schema.createTable(this.tableName, (table) => {
//       table.increments('id').primary()
//       table
//         .integer('company_id')
//         .unsigned()
//         .notNullable()
//         .references('id')
//         .inTable('companies')
//         .onDelete('CASCADE')
//       table
//         .integer('user_id')
//         .unsigned()
//         .notNullable()
//         .references('id')
//         .inTable('users')
//         .onDelete('CASCADE')
//       table.string('file_path').notNullable()
//       table.date('captured_date').notNullable()
//       table.timestamp('captured_at').notNullable()
//       table.timestamp('created_at').notNullable()
//       table.index(['company_id', 'user_id', 'captured_date', 'captured_at'], 'idx_screenshots_main')

//       // For owner viewing all employees on a specific date
//       table.index(['company_id', 'captured_date', 'captured_at'], 'idx_screenshots_company_date')

//       // For time-based grouping queries
//       table.index(['user_id', 'captured_date', 'captured_at'], 'idx_screenshots_user_date')
//     })
//   }

//   async down() {
//     this.schema.dropTable(this.tableName)
//   }
// }

import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'screenshots'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary()
      table.integer('user_id').unsigned().notNullable()
      table.integer('company_id').unsigned().notNullable()
      table.string('file_path', 500).notNullable()
      table.date('captured_date').notNullable() // Separate date for grouping
      table.timestamp('captured_at', { useTz: true }).notNullable() // Full timestamp
      table.timestamp('created_at').notNullable()

      // Composite indexes for high-performance queries
      // Most common query: company + user + date range
      table.index(['company_id', 'user_id', 'captured_date', 'captured_at'], 'idx_screenshots_main')

      // For owner viewing all employees on a specific date
      table.index(['company_id', 'captured_date', 'captured_at'], 'idx_screenshots_company_date')

      // For time-based grouping queries
      table.index(['user_id', 'captured_date', 'captured_at'], 'idx_screenshots_user_date')

      table.foreign('user_id').references('users.id').onDelete('CASCADE')
      table.foreign('company_id').references('companies.id').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
