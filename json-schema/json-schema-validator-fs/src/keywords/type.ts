import type{ JSONValue } from "../types.js";
import { getJSONType } from "../utils/getJSONType.js";

export function validateType(expectedType:string|string[],instance:JSONValue):boolean{
    const allowedTypes = Array.isArray(expectedType)?expectedType:[expectedType];
    const actualType = getJSONType(instance);

    return allowedTypes.some((type)=>{
        if(type===actualType){
            return true;
        }

        if(type==="number" && actualType==="integer"){
            return true;
        }
        return false;
    });
}