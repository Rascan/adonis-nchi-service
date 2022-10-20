import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid';
import { 
  BaseModel, 
  column, 
  beforeCreate
} from '@ioc:Adonis/Lucid/Orm'
import { string } from '@ioc:Adonis/Core/Helpers'
export default class Country extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public uuid: string

  @column()
  public slug: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(country: Country) {
    country.uuid = uuid()
  }

  @beforeCreate()
  public static assignSlug(country: Country) {
    country.slug = string.snakeCase(country.name)
  }
}
