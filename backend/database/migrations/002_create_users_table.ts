import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      table
        .integer('company_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('companies')
        .onDelete('CASCADE')

      table.string('full_name').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.enum('role', ['owner', 'employee']).notNullable().defaultTo('employee')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.index(['company_id', 'role'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

// import { BaseSchema } from '@adonisjs/lucid/schema'

// export default class extends BaseSchema {
//   protected tableName = 'users'

//   async up() {
//     this.schema.createTable(this.tableName, (table) => {
//       table.increments('id').primary()
//       table.string('full_name', 100).notNullable()
//       table.string('email', 254).notNullable().unique()
//       table.string('password', 180).notNullable()
//       table.enum('role', ['owner', 'employee']).notNullable().defaultTo('employee')
//       table.integer('company_id').unsigned().nullable()
//       table.timestamp('created_at').notNullable()
//       table.timestamp('updated_at').notNullable()

//       table.index(['email'])
//       table.index(['company_id', 'role'])
//     })
//   }

//   async down() {
//     this.schema.dropTable(this.tableName)
//   }
// }
