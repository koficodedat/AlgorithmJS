import { swapInArray } from '../util/swapInArray';
import { compare } from '../util/compare';
import {hasSameType} from "../util/hasSameType";

/*
 insertionSort(..)
 returns a sorted array in ascending order with insertion sort
 not suitable for large sets of data
 performs O(n2) in worst case and a running time of O(n) on average

 @param: { (number | string)[] } array - takes an array of generic items
 @return: { (number | string)[] } - returns an array

 has side effects
 */

export function insertionSort(array: (number | string)[]): (number | string)[] {
    if( array instanceof Array && hasSameType(array) ){

        const length : number = array.length;

        for( let i = 0; i < length;  i++ ){
            for( let j = i; j > 0 && compare( array[j], array[j - 1] )  === -1; j-- ){
                swapInArray(j, j - 1, array);
            }
        }

        return array;

    }

    return [ undefined ];
}