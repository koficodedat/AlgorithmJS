"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iterator_1 = require("../util/iterator");
/*
 This is an implementation of a Queue data structure.
 It implements:
     isEmpty()
     size()
     peek()
     enqueue(..)
     dequeue()
     iterator()
 */
var Queue = (function () {
    function Queue() {
        this.first = null;
        this.last = null;
        this.queueSize = 0;
    }
    Queue.prototype.isEmpty = function () {
        return this.first === undefined || this.first === null;
    };
    Queue.prototype.size = function () {
        return this.queueSize;
    };
    Queue.prototype.peek = function () {
        if (this.isEmpty())
            throw new Error('Queue underflow exception');
        return this.first.item;
    };
    Queue.prototype.enqueue = function (item) {
        var oldLast = this.last;
        this.last = { item: item, next: null };
        if (this.isEmpty())
            this.first = this.last;
        else
            oldLast.next = this.last;
        this.queueSize += 1;
    };
    Queue.prototype.dequeue = function () {
        var itemToDequeue;
        if (this.isEmpty())
            throw new Error('Queue underflow exception');
        itemToDequeue = this.first.item;
        this.first = this.first.next;
        if (this.isEmpty())
            this.last = null;
        this.queueSize -= 1;
        return itemToDequeue;
    };
    Queue.prototype.iterator = function () {
        return new iterator_1.UniIteratorImpl(this.first, this.queueSize);
    };
    return Queue;
}());
exports.Queue = Queue;
