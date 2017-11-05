/*
 @since 1.0.25
 arrayMax(..)
 gets the maximum value in an array
 @param: { data } array
 @param: { before } number - optional( used to search for maximum before this number )
 @return: { number } - returns a number
 */
import {Dictionary} from "../data-structure/dictionary";
import {isSorted} from "./isSorted";
import {hasSameType} from "./hasSameType";
export function arrayMax<T>(data: (number | string)[], before?: number): Dictionary<number>{

    if( data instanceof Array && hasSameType(data) ) {
        let max: Dictionary<number> = null;

        if( isSorted(data) && before === undefined ) return { key: data.indexOf(data[data.length - 1]), value: data[data.length - 1] };
        data.forEach(
            ( value, index ) => {
                if( before !== undefined ){
                    if( max ){
                        if( value < before && max.value < value ) max = { key: index, value: value }
                    }
                    else{
                        if( value < before ) max = { key: index, value: value }
                    }
                }
                else{
                    if( max ){
                        if( max.value < value ) max = { key: index, value: value }
                    }
                    else{
                        max = { key: index, value: value }
                    }
                }
            }
        );

        return max;
    }

    return undefined;
}