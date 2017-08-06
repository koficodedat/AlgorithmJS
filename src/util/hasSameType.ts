/*
 hasSameType(..)
 determines if an array of values have the same type
 @param: { T[] } array - takes an array of generic items
 @return: { boolean } - returns a boolean
 */

export function hasSameType<T>(array: T[]): boolean{

    if( array instanceof Array ) {

        let type = typeof array[0];

        for(let i = 1; i < array.length; i++){
            if( type !== typeof array[i] ) return false;
        }

        return true;
    }

    return undefined;
}