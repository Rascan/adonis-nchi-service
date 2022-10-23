/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import { validator } from '@ioc:Adonis/Core/Validator'
import {
    childJurisdictionMustHaveParent,
    parentUuidRequiredWhenBoundaryLevelIsOne,
    parentJurisdictionBoundaryLevelsMustMakeSense
} from 'App/Validators/Jurisdictions/StoreValidator'


validator.rule('childJurisdictionMustHaveParent', childJurisdictionMustHaveParent.action, childJurisdictionMustHaveParent.options)
validator.rule('parentUuidRequiredWhenBoundaryLevelIsOne', parentUuidRequiredWhenBoundaryLevelIsOne.action, parentUuidRequiredWhenBoundaryLevelIsOne.options)
validator.rule('parentJurisdictionBoundaryLevelsMustMakeSense', parentJurisdictionBoundaryLevelsMustMakeSense.action, parentJurisdictionBoundaryLevelsMustMakeSense.options)


