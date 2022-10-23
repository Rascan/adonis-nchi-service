declare module '@ioc:Adonis/Core/Validator' {
  interface Rules {
    childJurisdictionMustHaveParent(parent_jurisdiction_uuid? : string): Rule,
    parentUuidRequiredWhenBoundaryLevelIsOne(parent_jurisdiction_uuid? : string): Rule
    parentJurisdictionBoundaryLevelsMustMakeSense(boundary_id? : number): Rule
  }
}