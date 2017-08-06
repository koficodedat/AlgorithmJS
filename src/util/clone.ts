/*
 clone(..)
 returns a element level copy of the source object passed in.
 @param: { source: any } - takes an object (array or key-value object)
 @return: { object: any } - returns an object

 for key-value objects, it only copies for the objects own properties, ignores otherwise.
 it does not clone primitive types from the head as there is no idea of reference since it is not an object. will return null otherwise.
 */

export function clone<T>(source: T){
    let copy = null;
    if( source instanceof Array ) {
        copy = [];
        source.forEach( (value, index) => {
            copy[index] = value;
        })
    }
    else if( typeof source === 'object' ){
        copy = {};
        for( let i in source ){
            if( source.hasOwnProperty(i) ) copy[i] = source[i];
        }
    }

    return copy;
}