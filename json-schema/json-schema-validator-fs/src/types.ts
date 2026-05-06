export type JSONValue=
    | string
    | number
    | boolean
    | null
    | JSONObject
    | JSONArray;

export interface JSONObject{           //JSONObject can be defined with type by type JSONObject = Record<string,JSONValue>;
    [key:string]:JSONValue;
}
export interface JSONArray extends Array<JSONValue>{} //it can also be declared using type for example // type JSONArray = JSONValue[];

export interface ValidationError{
    path:string;
    message:string;
    keyword:string;
} 
//again this can also be defined using type , if you can follow the strcture

export interface ValidationResult{
    valid:boolean;
    errors:ValidationError[];
}

export type JSONSchema = boolean | JSONSchemaObject;

export interface JSONSchemaObject{
    type?: string | string[];
    properties?: Record<string, JSONSchema>;
    required?: string[];
    items?: JSONSchema;
    minimum?: number;
    maximum?: number;
    minLength?: number;
    maxLength?: number;
    enum?: JSONValue[];
    const?: JSONValue;
    additionalProperties?: boolean | JSONSchema;
    allOf?: JSONSchema[];
    anyOf?: JSONSchema[];
    oneOf?: JSONSchema[];
    $ref?: string;
}
