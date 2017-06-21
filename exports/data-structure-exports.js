"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bag_1 = require("../src/data-structure/bag");
var queue_1 = require("../src/data-structure/queue");
var stack_1 = require("../src/data-structure/stack");
var vector_1 = require("../src/data-structure/vector");
var DataStructure;
(function (DataStructure) {
    DataStructure._bag = bag_1.Bag;
    DataStructure._queue = queue_1.Queue;
    DataStructure._stack = stack_1.Stack;
    DataStructure._vector = vector_1.VectorImpl;
})(DataStructure = exports.DataStructure || (exports.DataStructure = {}));
