/*
 @since 1.0.25
 product(..)
 multiplies the number elements in an array
 @param: { data } array
 @return: { number } - returns a number
 */
export function arrayProduct(array: number[]): number{
    return array.reduce(
        (product, value) => {
            return product * value;
        }
    )
}