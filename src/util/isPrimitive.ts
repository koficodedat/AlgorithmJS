/*
 isPrimitive(..)
 determines if the value is primitive
 @param: { value: any } - takes an value of any type
 @return: { boolean } - returns a boolean
 */

export function isPrimitive(value: any): boolean{
    return typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean';
}