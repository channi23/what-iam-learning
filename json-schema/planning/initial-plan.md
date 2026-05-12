#Intial Architecture
 I would like to create the file architecture minimal, where i will be implementing the entry flow validator.

 * Entry validator flow
 * Boolean schemas
 * Basic result structure
 * may be one keyword

 ## Okay I guess i am rushing to the code too fast, so i decide to create a flow diagram so that i can have clarity

 So My validator flow:
 * Accept schema and instance
 * If Schema is true, return Valid (as it is a boolean type)
 * If Schema is false, return Invalid
 * If Schem is Object,detect the draft
 * Load keyword handlers for the draft
 * For each keyword in the schema:
 - find the keyword handler
 - run it with schema value and instance
 - collect errors
 * Return final validation result

 ### (So for now, i will stick to this and plan to write the code around it, so changes are needed in the code)

# Planned File Structure
src/
    validate.ts -> which accepts the schema and the instance to validate, does not contain keyword specific logic
    types.ts -> JSONValue, JSONSchema,ValidationError....etc
context/
    validationContext.ts -> Stores validation state: current instace path, current schema path, root path, selected draft, collected errors
drafts/
    draft2020_12.ts -> Registers the keyword handlers supported by this(draft) for example type->Validation type, const->validationConst, enum -> validationEnum
keywords/
    type.ts ->validates the type keyword
    const.ts -> validate exact equality between schema const value and instance
    enum.ts  -> checks if instance matches atleast one value from enum
    required.ts -> checks required objects property
    properties.ts -> Applies subschema to object properties
utils/
    getJSONType.ts -> converts js values to JSON schema types
    deepEqual.ts -> compares JSON values deeply for const and enum
    jsonPointer.ts -> builds paths like $.user.name or later #/properties/name.

