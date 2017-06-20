import { uniform } from './uniform'
import Warn from './warn';

/*
 randSeq(..)
 creates an array list of uniformly and randomly generated numbers
 @param: { number } howMany - takes the number of random numbers to generate
 @param: { number } from - takes a beginning number
 @param: { number } to - takes a ending number
 @param: { boolean (optional) } shouldExcludeEnds - takes a boolean to denote if it should exclude ends
 @return: { number[] } - returns an array of numbers
 */

export function randSeq(howMany: number, from: number, to: number, shouldExcludeEnds?: boolean): number[] {

    const shouldAccountForExclusivity = shouldExcludeEnds !== null && shouldExcludeEnds !== undefined && shouldExcludeEnds;

    if( shouldAccountForExclusivity && (to - from) < 3 ){

        let randSeqWarn = new Warn("randSeq(..)", "Explicitly excluding the ends: Difference between from and to must be at least 3", false);
        randSeqWarn.log();
        return [ undefined ];

    }else{

        const lo = shouldAccountForExclusivity ? from + 1 : from;
        const hi = shouldAccountForExclusivity ? to - 1 : to;

        let randomSeqArray: number[] = [];

        for( let i = 0; i < howMany; i++ ){
            randomSeqArray.push( uniform(lo,hi) );
        }

        return randomSeqArray;
    }
}

