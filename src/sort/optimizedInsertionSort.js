"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swapInArray_1 = require("../util/swapInArray");
var compare_1 = require("../util/compare");
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
function optimizedInsertionSort(array) {
    if (array instanceof Array) {
        var length_1 = array.length;
        var numberOfSwaps = 0;
        //put smallest value at the first position
        for (var i = length_1 - 1; i > 0; i--) {
            if (compare_1.compare(array[i], array[i - 1]) === -1) {
                swapInArray_1.swapInArray(i, i - 1, array);
                numberOfSwaps += 1;
            }
        }
        if (numberOfSwaps === 0) {
            return array;
        }
        //check and swap from second index
        for (var i = 2; i < length_1; i++) {
            var potentialLowerBound = array[i];
            var j = i;
            while (compare_1.compare(array[j], array[j - 1]) === -1) {
                array[j] = array[j - 1];
                j -= 1;
            }
            array[j] = potentialLowerBound;
        }
        return array;
    }
    return [undefined];
}
exports.optimizedInsertionSort = optimizedInsertionSort;
