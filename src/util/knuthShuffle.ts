import { swapInArray } from './swapInArray';
import { clone } from "./clone";
import assert = require('assert');

/*
 knuthShuffle(..)
 shuffles an array list randomly
 @param: { T[] { number[] | string[] } } array - takes an array of generic items
 @return: { T[] { number[] | string[] } } - returns an array
 */

export function knuthShuffle<T>(array: T[], tries?: number): T[]{

    if( array instanceof Array ) {

        let shuffleArray: T[] = clone(array);

        for( let i = 0; i < shuffleArray.length; i++ ){
            let r: number = Math.random() * (i + 1);
            swapInArray(i, Math.floor(r), shuffleArray);
        }

        try{
            assert.notDeepEqual(array,shuffleArray);
        }catch (e){
            let t = tries ? tries : 0;

            if(t === 5) return undefined;

            return knuthShuffle(array, ++t);
        }

        return shuffleArray;
    }

    return undefined;
}