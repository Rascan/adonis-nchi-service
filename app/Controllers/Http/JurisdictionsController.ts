import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Jurisdiction from 'App/Models/Jurisdiction'
import StoreValidator from 'App/Validators/Jurisdictions/StoreValidator'
import UpdateValidator from 'App/Validators/Jurisdictions/UpdateValidator'

export default class JurisdictionsController {
  public async index({request,response}: HttpContextContract) {
    const { page, boundary_level, search_term, country_id, boundary } = request.qs()
    response.ok({
      data: await Jurisdiction.query()
      .if(boundary_level, (builder) => {
        builder.whereHas('boundary', (builder)=>{
          builder.where('level', boundary_level)
        })
      })
      .if(search_term, (builder)=> {
        builder.where('name', 'like', `%${search_term}%`)
      })
      .if(country_id, (builder)=> {
        builder.whereHas('boundary', (builder)=> {
          builder.where('country_id', country_id)
        })
      })
      .if(boundary, (builder)=>{
        builder.where('boundary_id', boundary)
      })
      .paginate(page | 1, 25)
    })
  }

  public async store({ request, response }: HttpContextContract) {
    const payload =  await request.validate(StoreValidator)

    response.created({
      data: await Jurisdiction.create(payload)
    })
  }

  public async show({params, response}: HttpContextContract) {
    const jurisdiction = await Jurisdiction.query()
    .where('id', params.id)
    .first()

    response.abortIf(!jurisdiction, {
      message: 'The jurisdiction specified could not be found'
    }, 404)

    response.ok({
      data: jurisdiction
    })
  }

  public async update({params, request, response }: HttpContextContract) {
    const payload =  await request.validate(UpdateValidator)

    const jurisdiction = await Jurisdiction.query()
    .where('id', params.id)
    .first()

    response.abortIf(!jurisdiction, {
      message: 'The jurisdiction specified could not be found'
    }, 404)

    response.ok({
      data: await jurisdiction?.merge(payload).save()
    })
  }

  public async destroy({}: HttpContextContract) {}
}
