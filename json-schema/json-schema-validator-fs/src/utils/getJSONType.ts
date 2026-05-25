import type{ JSONValue } from "../types.js";

export function getJSONType(instance:JSONValue):string{
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