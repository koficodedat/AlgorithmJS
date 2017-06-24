import { compare } from '../util/compare';

export function sort<T>(array: T[],aux: T[], lo: number, hi: number){

    if( hi <= lo ) return;

    let mid: number = Math.floor( lo + ( hi - lo ) / 2 );
    sort( array, aux, lo, mid );
    sort( array, aux, mid + 1, hi );
    merge( array, aux, lo, mid, hi)
}

export function merge<T>(array: T[], aux: T[], lo: number, mid: number, hi: number){

    if( array instanceof Array ) { //TODO: implement a function to check if all values of the list are of the same type

        // copy to aux[]
        for( let i = lo; i <= hi; i++ ) aux[i] = array[i];

        // merge back to array[]
        let i = lo;
        let j = mid + 1;

        for( let k = lo; k <= hi; k++ ){

            if( i > mid ) array[k] = aux[j++];
            else if( j > hi ) array[k] = aux[i++];
            else if( compare( aux[j], aux[i] ) === -1 ) array[k] = aux[j++];
            else array[k] = aux[i++];

        }
    }

}

export function getInversions<T>(array: T[], aux: T[], lo: number, mid: number, hi: number): number{

    let inversions: number = 0;

    if( array instanceof Array ) { //TODO: implement a function to check if all values of the list are of the same type

        // copy to aux[]
        for( let i = lo; i <= hi; i++ ) aux[i] = array[i];

        // merge back to array[]
        let i = lo;
        let j = mid + 1;

        for( let k = lo; k <= hi; k++ ){

            if( i > mid ) array[k] = aux[j++];
            else if( j > hi ) array[k] = aux[i++];
            else if( compare( aux[j], aux[i] ) === -1 ){ array[k] = aux[j++]; inversions += (mid - i + 1); }
            else array[k] = aux[i++];

        }
    }

    return inversions;
}