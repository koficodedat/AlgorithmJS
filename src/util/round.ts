/*
 @since 1.0.25
 round(..)

 motivation from PHP-Like rounding Method.

 rounds a number to a precision
 @param: { number } number - number to round
 @param: { number } precision - the precision to round to. 1 by default.
 @return: { number } - returns a number
 */

export function round(number: number, precision?: number): number{
    const factor = Math.pow(10, precision ? precision : 1);
    const numberScaledByFactor = number * factor;
    const numberRounded = Math.round( numberScaledByFactor );
    return numberRounded / factor;
}