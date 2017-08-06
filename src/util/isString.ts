/*
 isString(..)
 determines if the object is a string
 @param: { value: any } - takes an object of any type
 @return: { boolean } - returns a boolean
 */

export function isString(object: any): boolean{
    return typeof object === 'string';
}