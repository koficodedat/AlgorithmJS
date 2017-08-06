/*
 isEmpty(..)
 determines if an object is empty
 @param: { object: any } - takes an object (array or key-value object)
 @return: { boolean } - returns a boolean
 */

export function isEmpty(object: any){
    if( object instanceof Array ) return object.length === 0;
    if( typeof object === 'object' ){
        for( let key in object ) return false;
        return true;
    }
    return false;
}