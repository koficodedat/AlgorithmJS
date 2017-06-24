/*
 arraySum(..)
 returns the sum of an array of numbers.
 @param: { number[] } array - takes an array of numbers
 @return: { number } sum - returns a single number
 */

export function arraySum(array: number[]): number{
    let sum: number = 0;

    for( let i = 0; i < array.length; i++ ){
        sum += array[i];
    }

    return sum;
}