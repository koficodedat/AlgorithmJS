import { compare } from '../util/compare';
import { swapInArray } from '../util/swapInArray';
import {hasSameType} from "../util/hasSameType";

/*
 shellSort(..)
 returns a sorted array in ascending order with selection sort
 performs O(n2) in worst case and a running time of O(nlog(n)) on average

 @param: { (number | string)[] } array - takes an array of generic items
 @return: { (number | string)[] } - returns an array

 has side effects
 */


/*
 - returns a sorted array in ascending order
 - using shell sort
 - using an increment sequence proposed by Sedgewick and Incerpi
 - makes O(n^2) compares and exchanges in the worse time.
 - uses O(1) extra memory

 - will return an array with undefined if an error occurs: [ undefined ]
 - has side effects (hse)
 */

export function shellSort(array: (number | string)[]): (number | string)[]{
    if( array instanceof Array && hasSameType(array) ) {

        let length: number = array.length;
        let incrementSequence: number = 1;

        while( incrementSequence < Math.floor(length/3) ) incrementSequence = (3 * incrementSequence) + 1;

        while ( incrementSequence >= 1 ){
            for( let i = incrementSequence; i < length; i++ ){

                for( let j = i; j >= incrementSequence && compare( array[j], array[j - incrementSequence]) === -1; j -= incrementSequence ){
                    swapInArray(j, j - incrementSequence, array);
                }
            }
            incrementSequence = Math.floor( incrementSequence/3 );
        }

        return array;

    }

    return [ undefined ];
}