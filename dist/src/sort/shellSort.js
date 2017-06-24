"use strict";
exports.__esModule = true;
var compare_1 = require("../util/compare");
var swapInArray_1 = require("../util/swapInArray");
/*
 shellSort(..)
 returns a sorted array in ascending order with selection sort
 performs O(n2) in worst case and a running time of O(nlog(n)) on average

 @param: {  T[] { number[] | string[] } } array - takes an array of generic items
 @return: { number } T[] { number[] | string[] } - returns an array

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
function shellSort(array) {
    if (array instanceof Array) {
        var length_1 = array.length;
        var incrementSequence = 1;
        while (incrementSequence < Math.floor(length_1 / 3))
            incrementSequence = (3 * incrementSequence) + 1;
        while (incrementSequence >= 1) {
            for (var i = incrementSequence; i < length_1; i++) {
                for (var j = i; j >= incrementSequence && compare_1.compare(array[j], array[j - incrementSequence]) === -1; j -= incrementSequence) {
                    swapInArray_1.swapInArray(j, j - incrementSequence, array);
                }
            }
            incrementSequence = Math.floor(incrementSequence / 3);
        }
        return array;
    }
    return [undefined];
}
exports.shellSort = shellSort;
//# sourceMappingURL=shellSort.js.map