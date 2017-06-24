import {isSorted} from "../util/isSorted";
import Warn from "../helpers/warn";

/*
 - returns index of value in the array
 - using binary search
 - return -1 if value does not exists

 - will return an array with undefined if an error occurs: [ undefined ]
 */

export function binarySearch<T>(array: T, value: number | string){

    let context = this;

    if( array instanceof Array ) { //TODO: implement a function to check if all values of the list are of the same type
        if (isSorted(array)) {
            let lo = 0;
            let hi = array.length - 1;
            while (lo <= hi) {
                let mid = Math.floor(lo + (hi - lo) / 2);
                if (value < array[mid])
                    hi = mid - 1;
                else if (value > array[mid])
                    lo = mid + 1;
                else
                    return mid;
            }
        }
        else {
            let isSortWarn = new Warn("binarySearch(..)", "array supplied to binarySearch must be sorted", false, context);
            isSortWarn.log();
            return undefined;
        }
    }

}