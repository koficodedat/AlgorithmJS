/*
 contains(..)
 determines if an object of values contains a specific value
 @param: { object: any } - takes an object (array or key-value object)
 @param: { value: any } - takes an object (array or key-value object)
 @return: { boolean } - returns a boolean

 for key-value objects, it only checks for the objects own properties.
 */

import {isEqual} from "./isEqual";
import {isPrimitive} from "./isPrimitive";

export function contains(object: any, value: any): boolean{

    if( object instanceof Array ) {

        for(let i = 0; i < object.length; i++){
            if( deepContains(object[i],value) ) return true;
        }

        return false;
    }else if( typeof object === 'object' ){

        for( let i in object) {
            if( object.hasOwnProperty(i) && deepContains(object[i],value) ) return true;
        }

        return false;
    }

    return undefined;
}

function deepContains(first: any, second: any): boolean{

    if( isEqual(first,second) ) return true; //shallow check
    if( !isPrimitive(first) ) return contains(first,second);

    return false;

}