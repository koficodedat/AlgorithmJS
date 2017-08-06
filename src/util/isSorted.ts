import { compare } from './compare';
import {hasSameType} from "./hasSameType";

/*
 isSorted(..)
 checks if an array is sorted
 @param: { T[] { number[] | string[] } } array - takes an array of generic items
 @return: { boolean } - returns a boolean
 */

export function isSorted<T>(array: (number | string)[]): boolean{

    if( array instanceof Array && hasSameType(array) ) {

        for( let i = 1; i < array.length; i++ ){
            if( compare(array[i], array[i - 1]) === -1 ) return false;
        }

        return true;
    }

    return undefined;
}