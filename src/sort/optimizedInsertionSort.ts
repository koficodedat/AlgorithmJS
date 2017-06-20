import { swapInArray } from '../util/swapInArray';
import { compare } from '../util/compare';


/*
 optimizedInsertionSort(..)
 returns a sorted array in ascending order with optimized insertion sort
 by comparing and exchanging the values one after the other:
           firstly, putting the smallest value at the first position
           secondly, check and swap from second index
 not suitable for large sets of data
 performs O(n2) in worst case and a running time of O(1/2 n^2) on average

 @param: {  T[] { number[] | string[] } } array - takes an array of generic items
 @return: { number } T[] { number[] | string[] } - returns an array

 has side effects
 */


export function optimizedInsertionSort<T>(array: T[]): T[]{
    if( array instanceof Array ) { //TODO: implement a function to check if all values of the list are of the same type

        const length: number = array.length;
        let numberOfSwaps: number = 0;

        //put smallest value at the first position
        for( let i = length - 1; i > 0; i-- ){
            if( compare( array[i], array[i - 1]) === -1 ){
                swapInArray(i, i - 1, array);
                numberOfSwaps += 1;
            }
        }

        if( numberOfSwaps === 0 ){
            return array;
        }

        //check and swap from second index
        for( let i = 2; i < length; i++ ){
            let potentialLowerBound = array[i];
            let j: number = i;

            while( compare(array[j], array[j -1]) === -1 ){
                array[j] = array[j - 1];
                j -= 1;
            }
            array[j] = potentialLowerBound;
        }

        return array;
    }

    return [ undefined ];
}