"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var meregSortHelper_1 = require("../helpers/meregSortHelper");
/*
 inversions(..)
 gets the number of swaps needed to sort a list
 @param: { T[] { number[] | string[] } } array - takes an array of generic items
 @return: { number } - returns a number
 */
function inversions(array) {
    if (array instanceof Array) {
        var duplicate = [];
        var aux = [];
        for (var i = 0; i < array.length; i++)
            duplicate.push(array[i]);
        return count(array, duplicate, aux, 0, array.length - 1);
    }
    return 0;
}
exports.inversions = inversions;
function count(array, duplicate, aux, lo, hi) {
    var inversions = 0;
    if (hi <= lo)
        return 0;
    var mid = Math.floor(lo + (hi - lo) / 2);
    inversions += count(array, duplicate, aux, lo, mid);
    inversions += count(array, duplicate, aux, mid + 1, hi);
    inversions += meregSortHelper_1.getInversions(duplicate, aux, lo, mid, hi);
    return inversions;
}
