import {isPrimitive} from "./isPrimitive";
import {isNothing} from "./isNothing";
import {isEmpty} from "./isEmpty";

/*
 isEqual(..)
 determines the value by value deep equality of two or more objects.
 @param: { ...object: any } - takes a parameter list objects (array or key-value object)
 @return: { boolean } - returns a boolean

 for key-value objects, it only checks for the objects own properties, will return false otherwise.
 */

export function isEqual(...objects): boolean{

    const length = objects.length;
    let i = 0;
    let isEqual: boolean = true;

    while( i < length && isEqual ){
        isEqual = isDeepEqual(objects[0], objects[i]);
        i++;
    }

    return isEqual;
}

function isDeepEqual(first: any, second: any): boolean{

    if( typeof first !== typeof second ) return false;

    else if( isPrimitive(first) || ( isNothing(first) && isNothing(second) )) return first === second;

    else if( first instanceof Array && second instanceof Array ){

        if( first.length !== second.length ) return false;

        let i = 0;
        let isEqual = true;
        while( i < first.length && isEqual ){
            isEqual = isDeepEqual(first[i], second[i]);
            i++;
        }

        return isEqual;

    }else{

        if( isEmpty(first) && isEmpty(second) ) return true;

        const firstKeys = Object.keys(first);
        const secondKeys = Object.keys(second);

        if( firstKeys.length !== secondKeys.length ) return false;

        let i = 0;
        let isEqual = true;
        while( i < firstKeys.length && isEqual ){
            if( firstKeys[i] !== secondKeys[i] ) isEqual = false;
            else if( !first.hasOwnProperty(firstKeys[i]) && !second.hasOwnProperty(secondKeys[i]) ) isEqual = false;
            else isEqual = isDeepEqual(first[firstKeys[i]], second[secondKeys[i]]);
            i++;
        }

        return isEqual;
    }
}