import { getInversions } from '../helpers/mergeSortHelper'
import {hasSameType} from "./hasSameType";
import {contains} from "./contains";

/*
 inversions(..)
 gets the number of swaps needed to sort a list
 @param: { T[] { number[] | string[] } } array - takes an array of generic items
 @return: { number } - returns a number
 */

export function inversions(array: (number | string)[]): number{

    if( array instanceof Array ) {

        if( !hasSameType(array) || contains(array,null) ) return undefined;

        let duplicate: (number | string)[] = [];
        let aux: (number | string)[] = [];

        for( let i = 0; i < array.length; i++ ) duplicate.push(array[i]);
        return count( array, duplicate, aux, 0, array.length - 1 );
    }

    return undefined;
}

function count<T>(array: (number | string)[], duplicate: (number | string)[], aux: (number | string)[], lo: number, hi: number): number{

    let inversions: number = 0;

    if( hi <= lo ) return 0;
    let mid: number = Math.floor( lo + ( hi - lo ) / 2 );
    inversions += count( array, duplicate, aux, lo, mid );
    inversions += count( array, duplicate, aux, mid + 1, hi );
    inversions += getInversions( duplicate, aux, lo, mid, hi );

    return inversions;
}