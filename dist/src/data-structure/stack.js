"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var bag_1 = require("./bag");
/*
 This is an implementation of a Stack data structure.
 It implements:
     isEmpty()
     size()
     push(..)
     pop()
     peek()
     iterator()
 */
var Stack = (function (_super) {
    __extends(Stack, _super);
    function Stack() {
        return _super.call(this) || this;
    }
    Stack.prototype.isEmpty = function () {
        return _super.prototype.isEmpty.call(this);
    };
    Stack.prototype.size = function () {
        return _super.prototype.size.call(this);
    };
    Stack.prototype.push = function (item) {
        _super.prototype.add.call(this, item);
    };
    Stack.prototype.pop = function () {
        if (this.isEmpty()) {
            console.log('Stack underflow exception');
        }
        var itemToReturn = this.first.item;
        this.first = this.first.next;
        return itemToReturn;
    };
    Stack.prototype.peek = function () {
        if (this.isEmpty()) {
            console.log('Stack underflow exception');
        }
        return this.first.item;
    };
    Stack.prototype.iterator = function () {
        return _super.prototype.iterator.call(this);
    };
    return Stack;
}(bag_1.Bag));
exports.Stack = Stack;
//# sourceMappingURL=stack.js.map