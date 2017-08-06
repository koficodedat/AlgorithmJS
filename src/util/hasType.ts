import { type as _type } from '../constants/util'

/*
 hasType(..)
 determines if an array of values has the specific type
 @param: { T[] } array - takes an array of generic items
 @return: { boolean } - returns a boolean
 */

export function hasType<T>(array: T[], type: string): boolean{

    if( array instanceof Array && ( type === _type.number || type === _type.string || type === _type.boolean || type === _type.object ) ) {

        for(let i = 0; i < array.length; i++){
            if( type === typeof array[i] ) return true;
        }

        return false;
    }

    return undefined;
}