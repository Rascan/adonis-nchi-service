import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

import { string } from '@ioc:Adonis/Core/Helpers'


export default class Country extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({
    prepare: value => string.titleCase(value),
  })
  public name: string

  @column({
    prepare: (value: string) => value.toUpperCase(),
  })
  public code: string

  @column({
    prepare: (value: string) => value.toUpperCase(),
  })
  public currency: string

  @column()
  public language_id: number

  @column()
  public dial_code: string

  @column()
  public trim: boolean

  @column()
  public value: number

  @column({ 
    serialize: (value?: number) => Boolean(value), 
  })
  public is_active: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
