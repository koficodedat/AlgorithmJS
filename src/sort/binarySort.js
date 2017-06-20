"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var compare_1 = require("../util/compare");
/*
 binarySort(..)
 returns a sorted array in ascending order with binary insertion sort
 not suitable for large sets of data
 performs O(n log n) in worst case and a running time of O(n2) on average

 @param: {  T[] { number[] | string[] } } array - takes an array of generic items
 @return: { number } T[] { number[] | string[] } - returns an array

 has side effects
 */
function binarySort(array) {
    if (array instanceof Array) {
        var length_1 = array.length;
        for (var i = 1; i < length_1; i++) {
            var currentIndexValue = array[i];
            var lo = 0;
            var hi = i;
            while (lo < hi) {
                var mid = Math.floor(lo + (hi - lo) / 2);
                if (compare_1.compare(currentIndexValue, array[mid]) === -1)
                    hi = mid;
                else
                    lo = mid + 1;
            }
            for (var j = i; j > lo; j--) {
                array[j] = array[j - 1];
            }
            array[lo] = currentIndexValue;
        }
        return array;
    }
    return [undefined];
}
exports.binarySort = binarySort;
