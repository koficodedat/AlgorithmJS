"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uniform_1 = require("./uniform");
/*
 randSeq(..)
 creates an array list of uniformly and randomly generated numbers
 @param: { number } howMany - takes the number of random numbers to generate
 @param: { number } from - takes a beginning number
 @param: { number } to - takes a ending number
 @param: { boolean (optional) } shouldExcludeEnds - takes a boolean to denote if it should exclude ends
 @return: { number[] } - returns an array of numbers
 */
function randSeq(howMany, from, to, shouldExcludeEnds) {
    var shouldAccountForExclusivity = shouldExcludeEnds !== null && shouldExcludeEnds !== undefined && shouldExcludeEnds;
    var lo = shouldAccountForExclusivity ? from + 1 : from;
    var hi = shouldAccountForExclusivity ? to - 1 : to;
    var randomSeqArray = [];
    for (var i = 0; i < howMany; i++) {
        randomSeqArray.push(uniform_1.uniform(lo, hi));
    }
    return randomSeqArray;
}
exports.randSeq = randSeq;
