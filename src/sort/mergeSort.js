"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var meregSortHelper_1 = require("../helpers/meregSortHelper");
/*
 mergeSort(..)
 returns a sorted array in ascending order with insertion sort
 performs running time of O(nlog(n)) on average

 @param: {  T[] { number[] | string[] } } array - takes an array of generic items
 @return: { number } T[] { number[] | string[] } - returns an array

 has side effects
 */
function mergeSort(array) {
    if (array instanceof Array) {
        meregSortHelper_1.sort(array, [], 0, array.length - 1);
        return array;
    }
    return [undefined];
}
exports.mergeSort = mergeSort;
