import { compare } from '../util/compare';
import { swapInArray } from '../util/swapInArray';

/*
 selectionSort(..)
 returns a sorted array in ascending order with selection sort
 not suitable for large sets of data
 performs  O(n2) in worst case

 @param: {  T[] { number[] | string[] } } array - takes an array of generic items
 @return: { number } T[] { number[] | string[] } - returns an array

 has side effects
 */


export function selectionSort(array: any[]): any[] {

    if( array instanceof Array ){

        let length: number = array.length;

        for( let i = 0; i < length; i++ ){
            let min: number = i;
            for( let j = min + 1; j < length; j++ ){
                if( compare( array[j], array[min]) === -1 ) min = j;
            }

            swapInArray(i, min, array);
        }

        return array;

    }

    return [ undefined ];
}