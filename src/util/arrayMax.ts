/*
 @since 1.0.25
 arrayMax(..)
 gets the minimum value in an array
 @param: { data } array
 @param: { before } number - optional( used to search for maximum before this number )
 @return: { number } - returns a number
 */
import {Dictionary} from "../data-structure/dictionary";
export function arrayMax<T>(data: number[], before?: number): Dictionary<number>{
    let max: Dictionary<number> = null;
    data.forEach(
        ( value, index ) => {
            if( before !== undefined ){
                if( max ){
                    if( value < before && max.value > value ) max = { key: index, value: value }
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