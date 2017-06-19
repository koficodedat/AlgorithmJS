/*
 swapInArray(..)
 swaps the values in an array
 @param: { number } firstIndex - takes a number
 @param: { number } secondIndex - takes a number
 @param: { T[] } array - takes an array of generics
 */

export function swapInArray<T>(firstIndex: number, secondIndex: number, array: T[]) {
    let temp = array[firstIndex];

    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;

    temp = null;
}