"use strict";
/*
 arraySum(..)
 returns the sum of an array of numbers.
 @param: { number[] } array - takes an array of numbers
 @return: { number } sum - returns a single number
 */
exports.__esModule = true;
function arraySum(array) {
    var sum = 0;
    for (var i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum;
}
exports.arraySum = arraySum;
//# sourceMappingURL=arraySum.js.map