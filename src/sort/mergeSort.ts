import { sort } from '../helpers/mergeSortHelper'


/*
 mergeSort(..)
 returns a sorted array in ascending order with insertion sort
 performs running time of O(nlog(n)) on average

 @param: {  T[] { number[] | string[] } } array - takes an array of generic items
 @return: { number } T[] { number[] | string[] } - returns an array

 has side effects
 */

export function mergeSort<T>(array: T[]): T[]{

    if( array instanceof Array ) { //TODO: implement a function to check if all values of the list are of the same type

        sort(array, <T[]> [], 0, array.length - 1);
        return array;
    }

    return [ undefined ];
}