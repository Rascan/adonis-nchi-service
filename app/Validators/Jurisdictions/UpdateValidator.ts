import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string([
      rules.unique({
        table: 'jurisdictions',
        column: 'name',
        where: {
          boundary_id: this.ctx.request.input('boundary_id')
        }
      })
    ]),
    boundary_id: schema.number([
      rules.exists({
        table: 'boundaries',
        column: 'id'
      }),
      rules.childJurisdictionMustHaveParent(this.ctx.request.input('parent_jurisdiction_uuid')),
      rules.parentUuidRequiredWhenBoundaryLevelIsOne(this.ctx.request.input('parent_jurisdiction_uuid'))
    ]),
    parent_jurisdiction_uuid: schema.string.optional([
      rules.exists({
        table: 'jurisdictions',
        column: 'uuid'
      }),
      rules.parentJurisdictionBoundaryLevelsMustMakeSense(this.ctx.request.input('boundary_id'))
    ])
  })
}
