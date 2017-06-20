"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var warn_1 = require("./warn");
/*
 uniform(..)
 generates a random number between two numbers uniformly
 @param: { number } from - takes a number
 @param: { number } to - takes a number
 @return: { number } - returns a number
 */
function uniform(from, to) {
    if (!(from < to)) {
        var uniformWarn = new warn_1.default("uniform(..)", "beginning number must be less than ending number", false);
        uniformWarn.log();
        return undefined;
    }
    return from + (Math.random() * (to - from));
}
exports.uniform = uniform;
