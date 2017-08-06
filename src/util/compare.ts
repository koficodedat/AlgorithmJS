/*
 compare(..)
 compares two arguments for equality
 @param: { T { number | string} } first - takes a a number or string
 @param: { T { number | string} } second - takes a a number or string
 @return: { number } - returns a -1 for less, 0 for equality and 1 more
 */

export function compare(first: number | string, second: number | string) : number {

    if( first === null || second === null) return undefined;

    if( first !== null && second !== null ){
        if( first > second ) return 1;
        if( first < second ) return -1;
    }
    return 0;
}