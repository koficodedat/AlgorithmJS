"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var arraySum_1 = require("./arraySum");
/*
 average(..)
 returns the average of an array of numbers.
 @param: { number[] } array - takes an array of numbers
 @return: { number } average - returns a single number
 */
function average(array) {
    return arraySum_1.arraySum(array) / array.length;
}
exports.average = average;
