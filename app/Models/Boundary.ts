import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid';
import Country from 'App/Models/Country'

export default class Boundary extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public level: number

  @column()
  public uuid: string

  @column()
  public country_id: number


  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(boundary: Boundary) {
    boundary.uuid = uuid()
  }

  @belongsTo(() => Country, {
    foreignKey: 'country_id',
  })
  public country: BelongsTo<typeof Country>
}
