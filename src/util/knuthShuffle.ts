import { swapInArray } from './swapInArray';

/*
 knuthShuffle(..)
 shuffles an array list randomly
 @param: { T[] { number[] | string[] } } array - takes an array of generic items
 @return: { T[] { number[] | string[] } } - returns an array
 */

export function knuthShuffle<T>(array: T[]): T[]{
    if( array instanceof Array ) { //TODO: implement a function to check if all values of the list are of the same type

        for( let i = 0; i < array.length; i++ ){
            let r: number = Math.random() * (i + 1);
            swapInArray(i, Math.floor(r), array);
        }

        return array;
    }

    return [ undefined ];
}