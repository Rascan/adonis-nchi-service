import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    country_id: schema.number(),
    name: schema.string([
      rules.unique({
        table: 'boundaries',
        column: 'name',
        where: {
          country_id: this.ctx.request.input('country_id')
        }
      })
    ]),
    level: schema.number(),
  })
}
