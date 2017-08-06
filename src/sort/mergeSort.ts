import { sort } from '../helpers/mergeSortHelper'
import {hasSameType} from "../util/hasSameType";


/*
 mergeSort(..)
 returns a sorted array in ascending order with insertion sort
 performs running time of O(nlog(n)) on average

 @param: { (number | string)[] } array - takes an array of generic items
 @return: { (number | string)[] } - returns an array

 has side effects
 */

export function mergeSort(array: (number | string)[]): (number | string)[]{

    if( array instanceof Array && hasSameType(array) ) {

        sort(array, <(number | string)[]> [], 0, array.length - 1);
        return array;
    }

    return [ undefined ];
}