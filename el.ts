import * as utility from './utility-exports'

(function (root, factory) {

    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.ajs = factory();
    }

}(this, function () {
    return {
        //utilities
        arraySum:       utility.Utility._arraySum,
        average:        utility.Utility._average,
        compare:        utility.Utility._compare,
        inversions:     utility.Utility._inversions,
        isSorted:       utility.Utility._isSorted,
        shuffle:        utility.Utility._knuthShuffle,
        randSeq:        utility.Utility._randSeq,
        swapInArray:    utility.Utility._swapInArray,
        uniform:        utility.Utility._uniform
    };
}));