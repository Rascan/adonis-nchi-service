import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) { }
  public schema = schema.create({
    name: schema.string([
      rules.unique({
        table: 'countries',
        column: 'name'
      })
    ]),
    code: schema.string([
      rules.unique({
        table: 'countries',
        column: 'name'
      })
    ]),
    currency: schema.string(),
    dial_code: schema.string([
      rules.maxLength(7)
    ]),
    trim: schema.boolean.optional(),
    value: schema.number.optional([
      rules.requiredWhen('trim', '=', true)
    ])
  })
}
