"use strict";
exports.__esModule = true;
/*
 UniIterator Interface Implementation
 */
var UniIteratorImpl = (function () {
    function UniIteratorImpl(node, size) {
        if (node === null)
            throw Error('Node is null or undefined');
        if (size === null || size < 0)
            throw Error('Node size is null or undefined');
        else {
            this.current = new Object(node);
            this.base = new Object(node);
            this.size = size;
            this.currentIndex = -1;
            this.mayRemove = false;
        }
    }
    UniIteratorImpl.prototype.next = function (value) {
        var item = null;
        if (this.hasNext()) {
            item = this.current.item;
            this.current = this.current.next;
            this.currentIndex += 1;
        }
        else
            this.currentIndex = -1;
        this.mayRemove = true;
        return item;
    };
    UniIteratorImpl.prototype.hasNext = function () {
        return this.current !== null;
    };
    UniIteratorImpl.prototype.remove = function () {
        if (!this.mayRemove) {
            throw Error('Need to call next() before remove()');
        }
        else if (this.currentIndex === -1) {
            throw Error('Nothing to iterate on hence nothing to remove');
        }
        else if (this.currentIndex === 0) {
            this.base = this.base.next;
        }
        else {
            var count = 0;
            var newNode = null;
            var nodeToIterateOn = this.base;
            var potentialNodeToDelete = void 0;
            do {
                newNode ? newNode.next = { item: nodeToIterateOn.item, next: null } : newNode = { item: nodeToIterateOn.item, next: null };
                nodeToIterateOn = nodeToIterateOn.next;
                potentialNodeToDelete = { item: nodeToIterateOn.item, next: null };
                count++;
            } while (count < this.currentIndex - 1);
            if (nodeToIterateOn.next !== null) {
                newNode.next = nodeToIterateOn.next;
            }
            potentialNodeToDelete = null;
            this.base = newNode;
            this.mayRemove = false;
        }
        this.currentIndex -= 1;
        this.size -= 1;
    };
    UniIteratorImpl.prototype.list = function () {
        var array = [];
        if (this.base !== null) {
            var nodeToIterateOn = this.base;
            for (var i = 0; i < this.size; i++) {
                array[i] = nodeToIterateOn.item;
                nodeToIterateOn = nodeToIterateOn.next;
            }
        }
        return array;
    };
    return UniIteratorImpl;
}());
exports.UniIteratorImpl = UniIteratorImpl;
//# sourceMappingURL=iterator.js.map