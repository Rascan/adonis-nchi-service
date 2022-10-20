import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IndexValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    is_active: schema.string.optional(),
    page: schema.string.optional()
  })
  public messages: CustomMessages = {}
}
