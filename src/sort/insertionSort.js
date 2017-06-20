"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swapInArray_1 = require("../util/swapInArray");
var compare_1 = require("../util/compare");
/*
 insertionSort(..)
 returns a sorted array in ascending order with insertion sort
 not suitable for large sets of data
 performs O(n2) in worst case and a running time of O(n) on average

 @param: {  T[] { number[] | string[] } } array - takes an array of generic items
 @return: { number } T[] { number[] | string[] } - returns an array

 has side effects
 */
function insertionSort(array) {
    if (array instanceof Array) {
        var length_1 = array.length;
        for (var i = 0; i < length_1; i++) {
            for (var j = i; j > 0 && compare_1.compare(array[j], array[j - 1]) === -1; j--) {
                swapInArray_1.swapInArray(j, j - 1, array);
            }
        }
        return array;
    }
    return [undefined];
}
exports.insertionSort = insertionSort;
