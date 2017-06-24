import { getInversions } from '../helpers/mergeSortHelper'

/*
 inversions(..)
 gets the number of swaps needed to sort a list
 @param: { T[] { number[] | string[] } } array - takes an array of generic items
 @return: { number } - returns a number
 */

export function inversions<T>(array: T[]): number{

    if( array instanceof Array ) { //TODO: implement a function to check if all values of the list are of the same type

        let duplicate: T[] = [];
        let aux: T[] = [];

        for( let i = 0; i < array.length; i++ ) duplicate.push(array[i]);
        return count( array, duplicate, aux, 0, array.length - 1 );
    }

    return 0;
}

function count<T>(array: T[], duplicate: T[], aux: T[], lo: number, hi: number): number{

    let inversions: number = 0;

    if( hi <= lo ) return 0;
    let mid: number = Math.floor( lo + ( hi - lo ) / 2 );
    inversions += count( array, duplicate, aux, lo, mid );
    inversions += count( array, duplicate, aux, mid + 1, hi );
    inversions += getInversions( duplicate, aux, lo, mid, hi );

    return inversions;
}