import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'countries'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').unique().notNullable()
      table.string('code').unique().notNullable()
      table.string('currency').notNullable()
      table.string('dial_code', 7).notNullable().unique()
      table.boolean('trim').defaultTo(true).comment('If true it Indicates that phone numbers in that country need the trunk prefix (first digit after the country code) trimmed. If set to false then a trunk prefix of 0 should be added to the number')
      table.integer('value', 4).nullable().comment('Value to be added as the trunk prefix')
      table.boolean('is_active').defaultTo(true)

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
