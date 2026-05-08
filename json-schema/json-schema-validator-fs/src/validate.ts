import type{JSONSchema,JSONValue,ValidationError,ValidationResult} from './types.js'

// will define a helper to convert a javascript value to a JSON Schema type name
//in this the instance will be convered to the json type so that we can compare and validate later

 function getJSONType(instance:JSONValue):string{
    if(instance===null){
        return 'null';
    }
    if(Array.isArray(instance)){
        return 'array';
    }
    if(typeof instance === 'object'){
        return 'object';
    }
    if(typeof instance === 'string'){
        return 'string';
    }
    if(typeof instance ==='boolean'){
        return 'boolean';
    }
    if(typeof instance ==='number'){
        return Number.isInteger(instance)?'integer':'number';
    }

    throw new Error('Unsupported JSON Value');

}

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


    if(schema.type!==undefined){
        const allowedTypes = Array.isArray(schema.type)?schema.type:[schema.type]; //can include multiple types , so wrapping the thing in arr, if it is not an arr
        const actualType = getJSONType(instance);

        const isValidType = allowedTypes.some((expectedType)=>{ //.some checks if atleast element matches the condition
            if(actualType===expectedType){
                return true;
            }
            if(expectedType==='number'&&actualType==='integer'){
                return true;
            }
            return false;
        });

        if(!isValidType){
            errors.push({
                path,
                keyword:'type',
                message:`expected type ${allowedTypes.join(' or ')}, but got ${actualType}`,
            });
        }
    }
    return{
        valid:errors.length===0,
        errors,
    };

}
export { validate };