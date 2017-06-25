"use strict";
exports.__esModule = true;
var swapInArray_1 = require("./swapInArray");
/*
 knuthShuffle(..)
 shuffles an array list randomly
 @param: { T[] { number[] | string[] } } array - takes an array of generic items
 @return: { T[] { number[] | string[] } } - returns an array
 */
function knuthShuffle(array) {
    if (array instanceof Array) {
        for (var i = 0; i < array.length; i++) {
            var r = Math.random() * (i + 1);
            swapInArray_1.swapInArray(i, Math.floor(r), array);
        }
        return array;
    }
    return [undefined];
}
exports.knuthShuffle = knuthShuffle;
