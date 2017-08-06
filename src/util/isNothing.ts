import {isNullOrUndefined} from "util";

/*
 isNothing(..)
 wrapped the isNullOrUndefined into a much shorter function name
 @param: { object: any } - takes an object (array or key-value object)
 @return: { boolean } - returns a boolean
 */

export function isNothing(object: any){
    return isNullOrUndefined(object)
}