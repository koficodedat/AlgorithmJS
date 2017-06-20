"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var compare_1 = require("../util/compare");
function sort(array, aux, lo, hi) {
    if (hi <= lo)
        return;
    var mid = Math.floor(lo + (hi - lo) / 2);
    sort(array, aux, lo, mid);
    sort(array, aux, mid + 1, hi);
    merge(array, aux, lo, mid, hi);
}
exports.sort = sort;
function merge(array, aux, lo, mid, hi) {
    if (array instanceof Array) {
        // copy to aux[]
        for (var i_1 = lo; i_1 <= hi; i_1++)
            aux[i_1] = array[i_1];
        // merge back to array[]
        var i = lo;
        var j = mid + 1;
        for (var k = lo; k <= hi; k++) {
            if (i > mid)
                array[k] = aux[j++];
            else if (j > hi)
                array[k] = aux[i++];
            else if (compare_1.compare(aux[j], aux[i]) === -1)
                array[k] = aux[j++];
            else
                array[k] = aux[i++];
        }
    }
}
exports.merge = merge;
function getInversions(array, aux, lo, mid, hi) {
    var inversions = 0;
    if (array instanceof Array) {
        // copy to aux[]
        for (var i_2 = lo; i_2 <= hi; i_2++)
            aux[i_2] = array[i_2];
        // merge back to array[]
        var i = lo;
        var j = mid + 1;
        for (var k = lo; k <= hi; k++) {
            if (i > mid)
                array[k] = aux[j++];
            else if (j > hi)
                array[k] = aux[i++];
            else if (compare_1.compare(aux[j], aux[i]) === -1) {
                array[k] = aux[j++];
                inversions += (mid - i + 1);
            }
            else
                array[k] = aux[i++];
        }
    }
    return inversions;
}
exports.getInversions = getInversions;
