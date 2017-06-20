"use strict";
/*
 swapInArray(..)
 swaps the values in an array
 @param: { number } firstIndex - takes a number
 @param: { number } secondIndex - takes a number
 @param: { T[] } array - takes an array of generics
 */
Object.defineProperty(exports, "__esModule", { value: true });
function swapInArray(firstIndex, secondIndex, array) {
    var temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
    temp = null;
}
exports.swapInArray = swapInArray;
