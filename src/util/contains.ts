/*
 contains(..)
 determines if an object of values contains a specific value
 @param: { object: any } - takes an object (array or key-value object)
 @param: { value: any } - takes an object (array or key-value object)
 @return: { boolean } - returns a boolean

 for key-value objects, it only checks for the objects own properties.
 */

import assert = require('assert');
import {isEqual} from "./isEqual";

export function contains(object: any, value: any): boolean{

    if( object instanceof Array ) {

        for(let i = 0; i < object.length; i++){
            if( isEqual(value,object[i]) ) return true;
        }

        return false;
    }else if( typeof object === 'object' ){

        for( let i in object) {
            if( object.hasOwnProperty(i) && isEqual(value,object[i]) ) return true;
        }

        return false;
    }

    return undefined;
}