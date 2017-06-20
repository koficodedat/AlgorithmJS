import * as utility from './exports/utility-exports';
import * as sort from './exports/sort-exports';

(function (root, factory) {

    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root._ = factory();
    }

}(this, function () {
    return {

        //Functions:

        //utilities
        arraySum:       utility.Utility._arraySum,
        average:        utility.Utility._average,
        compare:        utility.Utility._compare,
        inversions:     utility.Utility._inversions,
        isSorted:       utility.Utility._isSorted,
        shuffle:        utility.Utility._knuthShuffle,
        randSeq:        utility.Utility._randSeq,
        swapInArray:    utility.Utility._swapInArray,
        uniform:        utility.Utility._uniform,

        //sorts
        binarySort:     sort.Sort._binarySort,
        insertionSort:  sort.Sort._insertionSort,
        mergeSort:      sort.Sort._mergeSort,
        selectionSort:  sort.Sort._selectionSort,
        shellSort:      sort.Sort._shellSort
    };
}));