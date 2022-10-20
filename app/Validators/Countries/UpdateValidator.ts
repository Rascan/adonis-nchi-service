import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    params: schema.object().members({
      id: schema.number([
        rules.exists({
          table: 'countries',
          column: 'id'
        })
      ]),
    }),
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
