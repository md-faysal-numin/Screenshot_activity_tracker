import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'companies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable().unique()

      table.integer('plan_id').unsigned().notNullable().references('id').inTable('plans')
      //table.integer('owner_id').unsigned().notNullable().references('id').inTable('users')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.index(['plan_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

// import { BaseSchema } from '@adonisjs/lucid/schema'

// export default class extends BaseSchema {
//   protected tableName = 'companies'

//   async up() {
//     this.schema.createTable(this.tableName, (table) => {
//       table.increments('id').primary()
//       table.string('name', 100).notNullable()
//       table.integer('plan_id').unsigned().notNullable()
//       table.integer('owner_id').unsigned().notNullable()
//       table.timestamp('created_at').notNullable()
//       table.timestamp('updated_at').notNullable()

//       table.index(['owner_id'])
//       table.index(['plan_id'])
//     })

//     // Add foreign key to users table
//     this.schema.alterTable('users', (table) => {
//       table.foreign('company_id').references('companies.id').onDelete('CASCADE')
//     })
//   }

//   async down() {
//     this.schema.alterTable('users', (table) => {
//       table.dropForeign(['company_id'])
//     })
//     this.schema.dropTable(this.tableName)
//   }
// }
