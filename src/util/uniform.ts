import Warn from "./warn";

/*
 uniform(..)
 generates a random number between two numbers uniformly
 @param: { number } from - takes a number
 @param: { number } to - takes a number
 @return: { number } - returns a number
 */

export function uniform(from: number, to: number): number{
    if( !(from < to) ){
        let isSortWarn = new Warn("uniform(..)", "beginning number must be less than ending number", false);
        isSortWarn.log();
        return undefined;
    }
    return from + ( Math.random() * (to - from) );
}
