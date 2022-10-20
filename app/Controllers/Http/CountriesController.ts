import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Country from 'App/Models/Country'
import IndexValidator from 'App/Validators/Countries/IndexValidator'
import StoreValidator from 'App/Validators/Countries/StoreValidator'
import UpdateValidator from 'App/Validators/Countries/UpdateValidator'

export default class CountriesController {
  public async index({ request, response }: HttpContextContract) {
    await request.validate(IndexValidator)
    const { page } = request.qs()

    response.ok({
      data: await Country.query()
        .preload('boundaries')
        .paginate(page | 1, 20)
    })
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(StoreValidator)

    response.created({
      data: await Country.create(payload),
      message: 'Country persisted successfully'
    })
  }

  public async show({ params, response }: HttpContextContract) {
    const country = await Country.query()
      .preload('boundaries')
      .where('id', params.id)
      .first()

    response.abortIf(!country, {
      message: 'The country specified could not be found'
    }, 404)

    response.ok({
      data: await Country.find(params.id)
    })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const country = await Country.query()
      .where('id', params.id)
      .first()

    response.abortIf(!country, {
      message: 'The country specified could not be found'
    }, 404)

    const payload = await request.validate(UpdateValidator)

    response.ok({
      data: await Country.query()
        .where('id', params.id)
        .update(payload)
    })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const country = await Country.query()
      .where('id', params.id)
      .where('is_active', true)
      .first()

    response.abortIf(!country, {
      message: 'The country specified could not be found or is inactive'
    }, 404)

    await Country.query()
      .where('id', params.id)
      .update({
        is_active: false
      })

    response.ok({
      message: 'Country deactivated successfully'
    })
  }
}
