/*
 @since 1.0.25
 arrayMin(..)
 gets the minimum value in an array
 @param: { data } array
 @param: { after } number - optional( used to search for minimums after this number )
 @return: { number } - returns a number
 */
import {Dictionary} from "../data-structure/dictionary";
export function arrayMin<T>(data: number[], after?: number): Dictionary<number>{
    let min: Dictionary<number> = null;
    data.forEach(
        ( value, index ) => {
            if( after !== undefined ){
                if( min ){
                    if( value > after && min.value > value ) min = { key: index, value: value }
                }
                else{
                    if( value > after ) min = { key: index, value: value }
                }
            }
            else{
                if( min ){
                    if( min.value > value ) min = { key: index, value: value }
                }
                else{
                    min = { key: index, value: value }
                }
            }
        }
    );

    return min;
}