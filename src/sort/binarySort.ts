import { compare } from '../util/compare';
import {hasSameType} from "../util/hasSameType";

/*
 binarySort(..)
 returns a sorted array in ascending order with binary insertion sort
 not suitable for large sets of data
 performs O(n log n) in worst case and a running time of O(n2) on average

 @param: { (number | string)[] } array - takes an array of generic items
 @return: { (number | string)[] } - returns an array

 has side effects
 */

export function binarySort(array: (number | string)[]): (number | string)[] {
    if( array instanceof Array && hasSameType(array) ){

        let length: number = array.length;

        for( let i = 1; i < length; i++ ){
            const currentIndexValue = array[i];
            let lo: number = 0;
            let hi: number = i;

            while( lo < hi ){
                let mid = Math.floor( lo + ( hi - lo ) / 2 );
                if( compare( currentIndexValue, array[mid] ) === -1 ) hi = mid;
                else lo = mid + 1;
            }

            for( let j = i; j > lo; j-- ){
                array[j] = array[j - 1];
            }

            array[lo] = currentIndexValue;
        }

        return array;
    }

    return [ undefined ];
}