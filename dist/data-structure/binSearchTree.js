"use strict";
exports.__esModule = true;
var compare_1 = require("../util/compare");
var queue_1 = require("./queue");
/*
 This is an implementation of a Binary Search Tree with Key/Value Pairs data structure.
 It implements:
     isEmpty()
     size()
     contains(..)
     get()
     put(..)
     remove(..)
     removeMin()
     removeMax()
     minKey()
     maxKey()
     floor(..)
     ceil(..)
     rank(..)
     selectKeyForRank(..)
     keys()
     iterator()
     keysInLevelOrder()
     height()
 */
var BinSearchTree = (function () {
    function BinSearchTree() {
        this.root = null;
    }
    BinSearchTree.prototype.isEmpty = function () {
        return this.size() === 0;
    };
    BinSearchTree.prototype.size = function () {
        return this.sizeOfNode(this.root);
    };
    BinSearchTree.prototype.contains = function (key) {
        if (key === null || key === undefined)
            throw new Error('Argument to contains() is null');
        if (this.root !== null && typeof key === this.root.key)
            throw new Error('Key is of different type than root');
        return this.get(key) !== null;
    };
    BinSearchTree.prototype.get = function (key) {
        return this.getFromNodeAtKey(this.root, key);
    };
    BinSearchTree.prototype.put = function (key, value) {
        //Test
        if (key === null || key === undefined)
            throw new Error("Called put() with a null key");
        if (this.root !== null && typeof key === this.root.key)
            throw new Error('Key is of different type than root');
        if (value === null) {
            this.remove(key);
            return;
        }
        this.root = this.putInNodeAtKey(this.root, key, value);
    };
    BinSearchTree.prototype.remove = function (key) {
        if (key === null || key === undefined)
            throw new Error("Called delete() with a null key");
        if (this.root !== null && typeof key === this.root.key)
            throw new Error('Key is of different type than root');
        this.root = this.removeInNodeAtKey(this.root, key);
    };
    BinSearchTree.prototype.removeMin = function () {
        if (this.isEmpty())
            throw new Error("Tree underflow");
        return this.removeMinNodeFrom(this.root);
    };
    BinSearchTree.prototype.removeMax = function () {
        if (this.isEmpty())
            throw new Error("Tree underflow");
        this.root = this.removeMaxNodeFrom(this.root);
    };
    BinSearchTree.prototype.minKey = function () {
        if (this.isEmpty())
            throw new Error("Called min() with empty tree");
        else
            return this.getMinNodeFrom(this.root).key;
    };
    BinSearchTree.prototype.maxKey = function () {
        if (this.isEmpty())
            throw new Error("Called min() with empty tree");
        else
            return this.getMaxNodeFrom(this.root).key;
    };
    BinSearchTree.prototype.floor = function (key) {
        if (key === null || key === undefined)
            throw new Error("Argument to floor() is null");
        if (this.isEmpty())
            throw new Error("Called min() with empty tree");
        var floorNode = this.floorFromNodeToKey(this.root, key);
        return floorNode === null || floorNode === undefined ? null : floorNode.key;
    };
    BinSearchTree.prototype.ceil = function (key) {
        if (key === null || key === undefined)
            throw new Error("Argument to floor() is null");
        if (this.isEmpty())
            throw new Error("Called min() with empty tree");
        var ceilNode = this.ceilFromNodeToKey(this.root, key);
        return ceilNode === null || ceilNode === undefined ? null : ceilNode.key;
    };
    BinSearchTree.prototype.rank = function (key) {
        if (key === null || key === undefined)
            throw new Error("Argument to rank() is null");
        return this.rankOfKeyFromNode(key, this.root);
    };
    BinSearchTree.prototype.selectKeyForRank = function (rank) {
        if (rank < 0 || rank > this.size() || rank === null)
            throw new Error("Called selectKeyForRank() with invalid argument");
        return this.nodeAtRankFromNode(rank, this.root).key;
    };
    BinSearchTree.prototype.keys = function () {
        return this.getKeysInRange(this.minKey(), this.maxKey());
    };
    BinSearchTree.prototype.iterator = function () {
        return this.getNodesInRange(this.minKey(), this.maxKey());
    };
    BinSearchTree.prototype.keysInLevelOrder = function () {
        var keys = new queue_1.Queue();
        var nodes = new queue_1.Queue();
        nodes.enqueue(this.root);
        while (!nodes.isEmpty()) {
            var currentNode = nodes.dequeue();
            if (currentNode === null || currentNode === undefined)
                continue;
            keys.enqueue(currentNode.key);
            nodes.enqueue(currentNode.left);
            nodes.enqueue(currentNode.right);
        }
        return keys.iterator().list();
    };
    BinSearchTree.prototype.height = function () {
        return this.heightFromNode(this.root);
    };
    //todo: checks for binary tree assertions. will be static functions so can be used without instantiation
    //private functions
    BinSearchTree.prototype.sizeOfNode = function (node) {
        if (node === null || node === undefined)
            return 0;
        return node.size;
    };
    BinSearchTree.prototype.getFromNodeAtKey = function (node, key) {
        if (key === null || key === undefined)
            throw new Error("Called getFromNodeAtKey() with a null key");
        if (this.root !== null && typeof key === this.root.key)
            throw new Error('Key is of different type than root');
        if (node === null || node === undefined)
            return null;
        var _compare = compare_1.compare(key, node.key);
        if (_compare < 0)
            return this.getFromNodeAtKey(node.left, key);
        if (_compare > 0)
            return this.getFromNodeAtKey(node.right, key);
        return node.value;
    };
    BinSearchTree.prototype.putInNodeAtKey = function (node, key, value) {
        if (key === null || key === undefined)
            throw new Error("Called put() with a null key");
        if (node === null || node === undefined)
            return { key: key, value: value, left: null, right: null, size: 1 };
        var _compare = compare_1.compare(key, node.key);
        if (_compare < 0)
            node.left = this.putInNodeAtKey(node.left, key, value);
        else if (_compare > 0)
            node.right = this.putInNodeAtKey(node.right, key, value);
        else
            node.value = value;
        node.size = this.sizeOfNode(node.left) + this.sizeOfNode(node.right) + 1;
        return node;
    };
    BinSearchTree.prototype.removeInNodeAtKey = function (node, key) {
        if (node === null || node === undefined)
            return null;
        var _compare = compare_1.compare(key, node.key);
        if (_compare < 0)
            node.left = this.removeInNodeAtKey(node.left, key);
        else if (_compare > 0)
            node.right = this.removeInNodeAtKey(node.right, key);
        else {
            if (node.right === null)
                return node.left;
            if (node.left === null)
                return node.right;
            var nodeToRemove = node;
            node = this.getMinNodeFrom(node.right);
            node.right = this.removeMinNodeFrom(node.right);
            node.left = nodeToRemove.left;
        }
        node.size = this.sizeOfNode(node.left) + this.sizeOfNode(node.right) + 1;
        return node;
    };
    BinSearchTree.prototype.getMinNodeFrom = function (node) {
        if (node.left === null)
            return node;
        else
            return this.getMinNodeFrom(node.left);
    };
    BinSearchTree.prototype.getMaxNodeFrom = function (node) {
        if (node.right === null)
            return node;
        else
            return this.getMaxNodeFrom(node.right);
    };
    BinSearchTree.prototype.removeMinNodeFrom = function (node) {
        if (node.left === null)
            return node.right;
        node.left = this.removeMinNodeFrom(node.left);
        node.size = this.sizeOfNode(node.left) + this.sizeOfNode(node.right) + 1;
        return node;
    };
    BinSearchTree.prototype.removeMaxNodeFrom = function (node) {
        if (node.right === null)
            return node.left;
        node.right = this.removeMaxNodeFrom(node.right);
        node.size = this.sizeOfNode(node.left) + this.sizeOfNode(node.right) + 1;
        return node;
    };
    BinSearchTree.prototype.floorFromNodeToKey = function (node, key) {
        if (node === null || node === undefined)
            return null;
        var _compare = compare_1.compare(key, node.key);
        if (_compare === 0)
            return node;
        if (_compare < 0)
            return this.floorFromNodeToKey(node.left, key);
        var potentialFloorNode = this.floorFromNodeToKey(node.right, key);
        if (potentialFloorNode !== null)
            return potentialFloorNode;
        return node;
    };
    BinSearchTree.prototype.ceilFromNodeToKey = function (node, key) {
        if (node === null || node === undefined)
            return null;
        var _compare = compare_1.compare(key, node.key);
        if (_compare === 0)
            return node;
        if (_compare > 0)
            return this.ceilFromNodeToKey(node.right, key);
        var potentialCeilNode = this.ceilFromNodeToKey(node.left, key);
        if (potentialCeilNode !== null)
            return potentialCeilNode;
        return node;
    };
    BinSearchTree.prototype.rankOfKeyFromNode = function (key, node) {
        if (node === null || node === undefined)
            return 0;
        var _compare = compare_1.compare(key, node.key);
        if (_compare < 0)
            return this.rankOfKeyFromNode(key, node.left);
        if (_compare > 0)
            return 1 + this.sizeOfNode(node.left) + this.rankOfKeyFromNode(key, node.right);
        else
            return this.sizeOfNode(node.left);
    };
    BinSearchTree.prototype.nodeAtRankFromNode = function (rank, node) {
        if (node === null || node === undefined)
            return null;
        var leftSize = this.sizeOfNode(node.left);
        if (leftSize < rank)
            return this.nodeAtRankFromNode(rank - leftSize - 1, node.right);
        if (leftSize > rank)
            return this.nodeAtRankFromNode(rank, node.left);
        return node;
    };
    BinSearchTree.prototype.getKeysInRange = function (from, to) {
        if (from === null || from === undefined)
            throw new Error("first argument to getKeysInRange() is null");
        if (to === null || to === undefined)
            throw new Error("second argument to getKeysInRange() is null");
        var queue = new queue_1.Queue();
        this.addKeysToQueue(this.root, queue, from, to);
        return queue.iterator().list();
    };
    BinSearchTree.prototype.addKeysToQueue = function (node, queue, lo, hi) {
        if (node === null || node === undefined)
            return;
        var _comparelo = compare_1.compare(lo, node.key);
        var _comparehi = compare_1.compare(hi, node.key);
        if (_comparelo < 0)
            this.addKeysToQueue(node.left, queue, lo, hi);
        if (_comparelo <= 0 && _comparehi >= 0)
            queue.enqueue(node.key);
        if (_comparehi > 0)
            this.addKeysToQueue(node.right, queue, lo, hi);
    };
    BinSearchTree.prototype.getNodesInRange = function (from, to) {
        if (from === null || from === undefined)
            throw new Error("first argument to getNodesInRange() is null");
        if (to === null || to === undefined)
            throw new Error("second argument to getNodesInRange() is null");
        var queue = new queue_1.Queue();
        this.addNodesToQueue(this.root, queue, from, to);
        return queue.iterator();
    };
    BinSearchTree.prototype.addNodesToQueue = function (node, queue, lo, hi) {
        if (node === null || node === undefined)
            return;
        var _comparelo = compare_1.compare(lo, node.key);
        var _comparehi = compare_1.compare(hi, node.key);
        if (_comparelo < 0)
            this.addNodesToQueue(node.left, queue, lo, hi);
        if (_comparelo <= 0 && _comparehi >= 0)
            queue.enqueue(node);
        if (_comparehi > 0)
            this.addNodesToQueue(node.right, queue, lo, hi);
    };
    BinSearchTree.prototype.heightFromNode = function (node) {
        if (node === null || node === undefined)
            return -1;
        return 1 + Math.max(this.heightFromNode(node.left), this.heightFromNode(node.right));
    };
    return BinSearchTree;
}());
exports.BinSearchTree = BinSearchTree;