import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Boundary from 'App/Models/Boundary'
import Jurisdiction from 'App/Models/Jurisdiction'

export const childJurisdictionMustHaveParent = {
  action: async (value, [ parent_jurisdiction_uuid ], options) => {
    const boundary = await Boundary.find(value)

    if (!boundary) {
      return
    }

    if (boundary.level !== 1 && !parent_jurisdiction_uuid) {
      options.errorReporter.report(
        options.pointer,
        'childJurisdictionMustHaveParent',
        'childJurisdictionMustHaveParent validation failed',
        options.arrayExpressionPointer
      )
    }
  },
  options: (_) => ({ async: true, })
}

export const parentUuidRequiredWhenBoundaryLevelIsOne = {
  action: async (value, [ parent_jurisdiction_uuid ], options) => {
    const boundary = await Boundary.find(value)

    if (!boundary) {
      return
    }

    if (boundary.level == 1 && parent_jurisdiction_uuid) {
      options.errorReporter.report(
        options.pointer,
        'parentUuidRequiredWhenBoundaryLevelIsOne',
        'parentUuidRequiredWhenBoundaryLevelIsOne validation failed',
        options.arrayExpressionPointer
      )
    }
  },
  options: (_) => ({ async: true, })
}

export const parentJurisdictionBoundaryLevelsMustMakeSense = {
  action: async (value, [ boundary_id ], options) => {
    const boundary = await Boundary.find(boundary_id)

    const parentJurisdiction = await Jurisdiction.findByOrFail('uuid', value)
    await parentJurisdiction?.load('boundary')

    if (!boundary) {
      return
    }

    if (boundary.level < parentJurisdiction?.boundary.level) {
      options.errorReporter.report(
        options.pointer,
        'parentJurisdictionBoundaryLevelsMustMakeSense',
        'parentJurisdictionBoundaryLevelsMustMakeSense validation failed',
        options.arrayExpressionPointer
      )
    }

    const boundaryLevelDifference = boundary.level - parentJurisdiction?.boundary.level

    console.log(Math.abs(boundaryLevelDifference));


    if (Math.abs(boundaryLevelDifference) > 1) {
      options.errorReporter.report(
        options.pointer,
        'parentJurisdictionBoundaryLevelsMustMakeSense',
        'parentJurisdictionBoundaryLevelsMustMakeSense validation failed',
        options.arrayExpressionPointer
      )
    }
  },
  options: (_) => ({ async: true, })
}

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) { }

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
