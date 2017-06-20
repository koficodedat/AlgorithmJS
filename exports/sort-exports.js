"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var binarySort_1 = require("../src/sort/binarySort");
var mergeSort_1 = require("../src/sort/mergeSort");
var optimizedInsertionSort_1 = require("../src/sort/optimizedInsertionSort");
var selectionSort_1 = require("../src/sort/selectionSort");
var shellSort_1 = require("../src/sort/shellSort");
var Sort;
(function (Sort) {
    Sort._binarySort = binarySort_1.binarySort;
    Sort._mergeSort = mergeSort_1.mergeSort;
    Sort._insertionSort = optimizedInsertionSort_1.optimizedInsertionSort;
    Sort._selectionSort = selectionSort_1.selectionSort;
    Sort._shellSort = shellSort_1.shellSort;
})(Sort = exports.Sort || (exports.Sort = {}));
