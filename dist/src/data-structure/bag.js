"use strict";
exports.__esModule = true;
var iterator_1 = require("../util/iterator");
/*
This is an implementation of a Bag data structure.
It implements:
    isEmpty()
    size()
    add(..)
    iterator()
 */
var Bag = (function () {
    function Bag() {
        this.first = null;
        this.collectionSize = 0;
    }
    Bag.prototype.isEmpty = function () {
        return this.first === null;
    };
    Bag.prototype.size = function () {
        return this.collectionSize;
    };
    Bag.prototype.add = function (item) {
        var oldFirst = this.first;
        this.first = { item: item, next: oldFirst };
        this.collectionSize += 1;
    };
    Bag.prototype.iterator = function () {
        return new iterator_1.UniIteratorImpl(this.first, this.collectionSize);
    };
    return Bag;
}());
exports.Bag = Bag;
//# sourceMappingURL=bag.js.map