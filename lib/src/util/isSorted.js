"use strict";
exports.__esModule = true;
var compare_1 = require("./compare");
/*
 isSorted(..)
 checks if an array is sorted
 @param: { T[] { number[] | string[] } } array - takes an array of generic items
 @return: { boolean } - returns a boolean
 */
function isSorted(array) {
    if (array instanceof Array) {
        for (var i = 1; i < array.length; i++) {
            if (compare_1.compare(array[i], array[i - 1]) === -1)
                return false;
        }
    }
    return true;
}
exports.isSorted = isSorted;
