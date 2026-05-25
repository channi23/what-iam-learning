import type{JSONSchema,JSONValue,ValidationError,ValidationResult} from './types.js'
import { getJSONType } from './utils/getJSONType.js';
import { draft2020_12 } from './drafts/draft2020_12.js';


// will define a helper to convert a javascript value to a JSON Schema type name
//in this the instance will be convered to the json type so that we can compare and validate later

//this is the main function that actually does the valdation of the JSONSchema 
function validate(schema:JSONSchema,instance:JSONValue,path:string = '$'):ValidationResult{
    const errors:ValidationError[] = [];
    //check the boolean cases of the schema
    if(schema===true){
        return{
            valid:true,
            errors,
        };
    }
    if(schema===false){
        errors.push({
            path,
            keyword:'falseSchema',
            message:'False Schema always fails validation',
        });
        return{
            valid:false,
            errors,
        };
    }

    if(schema==null||typeof schema !=='object'||Array.isArray(schema)){
        throw new Error('Schema must be boolean or an object');
    }

    const draft = draft2020_12;

    for(const key of Object.keys(schema)){
        if(key==="type" && schema.type!== undefined){
        const isValid = draft.type(schema.type,instance);

        if(!isValid){
            const allowedTypes = Array.isArray(schema.type)?schema.type:[schema.type];
            const actualType = getJSONType(instance);

            errors.push({
                path,
                keyword:"type",
                message:`expected type ${allowedTypes.join(" or ")}, but got ${actualType}`,
            });
        }
        
    }
}


    
    return{
        valid:errors.length===0,
        errors,
    };

}
export { validate };