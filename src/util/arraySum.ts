/*
 arraySum(..)
 returns the sum of an array of numbers.
 @param: { number[] } array - takes an array of numbers
 @return: { number } sum - returns a single number
 */

export function arraySum(array: number[]): number{
    return array.reduce(
        (sum, value) => {
            return sum + value;
        }
    )
}