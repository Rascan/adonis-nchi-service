import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Boundary from 'App/Models/Boundary'
import StoreValidator from 'App/Validators/Boundaries/StoreValidator'
import UpdateValidator from 'App/Validators/Boundaries/UpdateValidator'

export default class BoundariesController {
  public async index({response}: HttpContextContract) {
    response.ok({
      data: await Boundary.query()
      .paginate(1, 25)
    })
  }

  public async store({request, response}: HttpContextContract) {
    const payload = await request.validate(StoreValidator)

    response.created({
      data: await Boundary.create(payload)
    })
  }

  public async show({params, response}: HttpContextContract) {
    const boundary = await Boundary.query()
    .where('id', params.id)
    .first()

    response.abortIf(!boundary, {
      message: 'The boundary specified could not be found'
    }, 404)

    response.ok({
      data: boundary
    })
  }

  public async update({params, request, response}: HttpContextContract) {
    const payload = await request.validate(UpdateValidator)

    const boundary = await Boundary.query()
    .where('id', params.id)
    .first()

    response.abortIf(!boundary, {
      message: 'The boundary specified could not be found'
    }, 404)

    response.ok({
      data: await boundary?.merge(payload).save()
    })
  }
}
