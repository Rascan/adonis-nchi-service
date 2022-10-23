import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeCreate,
  belongsTo,
  BelongsTo
} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid';
import Boundary from 'App/Models/Boundary'


export default class Jurisdiction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public uuid: string

  @column()
  public parent_jurisdiction_uuid: string

  @column()
  public boundary_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(jurisdiction: Jurisdiction) {
    jurisdiction.uuid = uuid()
  }

  @belongsTo(() => Boundary, {
    foreignKey: 'boundary_id',
  })
  public boundary: BelongsTo<typeof Boundary>
}
