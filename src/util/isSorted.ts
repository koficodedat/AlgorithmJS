import { compare } from './compare';

/*
 isSorted(..)
 checks if an array is sorted
 @param: { T[] { number[] | string[] } } array - takes an array of generic items
 @return: { boolean } - returns a boolean
 */

export function isSorted<T>(array: T[]): boolean{

    if( array instanceof Array ) { //TODO: implement a function to check if all values of the list are of the same type

        for( let i = 1; i < array.length; i++ ){
            if( compare(array[i], array[i - 1]) === -1 ) return false;
        }
    }

    return true;
}