"use strict";
exports.__esModule = true;
var binarySort_1 = require("../src/sort/binarySort");
var mergeSort_1 = require("../src/sort/mergeSort");
var selectionSort_1 = require("../src/sort/selectionSort");
var shellSort_1 = require("../src/sort/shellSort");
var insertionSort_1 = require("../src/sort/insertionSort");
var Sort;
(function (Sort) {
    Sort._binarySort = binarySort_1.binarySort;
    Sort._mergeSort = mergeSort_1.mergeSort;
    Sort._insertionSort = insertionSort_1.insertionSort;
    Sort._selectionSort = selectionSort_1.selectionSort;
    Sort._shellSort = shellSort_1.shellSort;
})(Sort = exports.Sort || (exports.Sort = {}));
