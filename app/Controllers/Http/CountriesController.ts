import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Country from 'App/Models/Country'
import DeleteValidator from 'App/Validators/Countries/DeleteValidator'
import IndexValidator from 'App/Validators/Countries/IndexValidator'
import ShowValidator from 'App/Validators/Countries/ShowValidator'
import StoreValidator from 'App/Validators/Countries/StoreValidator'
import UpdateValidator from 'App/Validators/Countries/UpdateValidator'

export default class CountriesController {
  public async index({ request, response }: HttpContextContract) {
    await request.validate(IndexValidator)
    const { page } = request.qs()

    response.ok({
      data: await Country.query()
        .paginate(page | 1, 20)
    })

  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(StoreValidator)

    response.created({
      data: await Country.create(payload),
      message: 'Country created successfully'
    })
  }

  public async show({ params, request, response }: HttpContextContract) {
    await request.validate(ShowValidator)

    response.ok({
      data: await Country.find(params.id)
    })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const payload = await request.validate(UpdateValidator)

    response.ok({
      data: await Country.query()
        .where('id', params.id)
        .update(payload)
    })
  }

  public async destroy({ params, request, response }: HttpContextContract) {
    await request.validate(DeleteValidator)

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
