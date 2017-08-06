import { arraySum }  from './arraySum';

/*
 average(..)
 returns the average of an array of numbers.
 @param: { number[] } array - takes an array of numbers
 @return: { number } average - returns a single number
 */

export function average(array: number[]): number{
    let sum = arraySum(array);
    if(sum === undefined) return undefined;
    return arraySum(array) / array.length;

}