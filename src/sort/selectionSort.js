"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var compare_1 = require("../util/compare");
var swapInArray_1 = require("../util/swapInArray");
/*
 selectionSort(..)
 returns a sorted array in ascending order with selection sort
 not suitable for large sets of data
 performs  O(n2) in worst case

 @param: {  T[] { number[] | string[] } } array - takes an array of generic items
 @return: { number } T[] { number[] | string[] } - returns an array

 has side effects
 */
function selectionSort(array) {
    if (array instanceof Array) {
        var length_1 = array.length;
        for (var i = 0; i < length_1; i++) {
            var min = i;
            for (var j = min + 1; j < length_1; j++) {
                if (compare_1.compare(array[j], array[min]) === -1)
                    min = j;
            }
            swapInArray_1.swapInArray(i, min, array);
        }
        return array;
    }
    return [undefined];
}
exports.selectionSort = selectionSort;
