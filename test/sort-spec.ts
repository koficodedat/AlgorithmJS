/// <reference path="../typings/globals/node/index.d.ts" />
/// <reference path="../typings/globals/mocha/index.d.ts" />

import assert = require('assert');
import {isEqual} from "../src/util/isEqual";
import {binarySort} from "../src/sort/binarySort";
import {insertionSort} from "../src/sort/insertionSort";
import {mergeSort} from "../src/sort/mergeSort";
import {shellSort} from "../src/sort/shellSort";
import {selectionSort} from "../src/sort/selectionSort";
import {optInsertionSort} from "../src/sort/optInsertionSort";

describe('sort function test', () =>{

    describe('binarySort(..)', () => {

        it('should test various array sizes', () =>{
            const a = [9,0,8,1,2,7,6,3,5,4];
            const b = [0,1,2,3,4,5,6,7,8,9];
            assert.equal(true,isEqual(b,binarySort(a)));

            const c = [52,43,48,28,59,45,4,24,16,14,49,12,39,9,13,56,18,22,17,42];
            const d = [4,9,12,13,14,16,17,18,22,24,28,39,42,43,45,48,49,52,56,59];
            assert.equal(true,isEqual(d,binarySort(c)));

            const e = [4,49,80,35,92,97,19,74,12,82,58,34,17,66,51,46,59,88,30,55,68,25,91,45,90,16,70,100,57,44,62,43,77,37,76,23,24,13,78,1,32,87,39,52,38,36,48,11,28,47];
            const f = [1,4,11,12,13,16,17,19,23,24,25,28,30,32,34,35,36,37,38,39,43,44,45,46,47,48,49,51,52,55,57,58,59,62,66,68,70,74,76,77,78,80,82,87,88,90,91,92,97,100];
            assert.equal(true,isEqual(f,binarySort(e)));

            const g = ['curry','paste','flax','seed','spinach','half-and-half','potato','chips','chili','powder','chai','chicken','liver','peas','poultry','seasoning'];
            const h = ['chai','chicken','chili','chips','curry','flax','half-and-half','liver','paste','peas','potato','poultry','powder','seasoning','seed','spinach'];
            assert.equal(true,isEqual(h,binarySort(g)));

            assert.equal([undefined],isEqual(['curry',undefined],binarySort(['curry',undefined])));
            assert.equal([undefined],isEqual(['curry',null],binarySort(['curry',null])));
        });

    });

    describe('insertionSort(..)', () => {

        it('should test various array sizes', () =>{
            const a = [9,0,8,1,2,7,6,3,5,4];
            const b = [0,1,2,3,4,5,6,7,8,9];
            assert.equal(true,isEqual(b,insertionSort(a)));

            const c = [52,43,48,28,59,45,4,24,16,14,49,12,39,9,13,56,18,22,17,42];
            const d = [4,9,12,13,14,16,17,18,22,24,28,39,42,43,45,48,49,52,56,59];
            assert.equal(true,isEqual(d,insertionSort(c)));

            const e = [4,49,80,35,92,97,19,74,12,82,58,34,17,66,51,46,59,88,30,55,68,25,91,45,90,16,70,100,57,44,62,43,77,37,76,23,24,13,78,1,32,87,39,52,38,36,48,11,28,47];
            const f = [1,4,11,12,13,16,17,19,23,24,25,28,30,32,34,35,36,37,38,39,43,44,45,46,47,48,49,51,52,55,57,58,59,62,66,68,70,74,76,77,78,80,82,87,88,90,91,92,97,100];
            assert.equal(true,isEqual(f,insertionSort(e)));

            const g = ['curry','paste','flax','seed','spinach','half-and-half','potato','chips','chili','powder','chai','chicken','liver','peas','poultry','seasoning'];
            const h = ['chai','chicken','chili','chips','curry','flax','half-and-half','liver','paste','peas','potato','poultry','powder','seasoning','seed','spinach'];
            assert.equal(true,isEqual(h,insertionSort(g)));

            assert.equal([undefined],isEqual(['curry',undefined],insertionSort(['curry',undefined])));
            assert.equal([undefined],isEqual(['curry',null],insertionSort(['curry',null])));
        });

    });

    describe('mergeSort(..)', () => {

        it('should test various array sizes', () =>{
            const a = [9,0,8,1,2,7,6,3,5,4];
            const b = [0,1,2,3,4,5,6,7,8,9];
            assert.equal(true,isEqual(b,mergeSort(a)));

            const c = [52,43,48,28,59,45,4,24,16,14,49,12,39,9,13,56,18,22,17,42];
            const d = [4,9,12,13,14,16,17,18,22,24,28,39,42,43,45,48,49,52,56,59];
            assert.equal(true,isEqual(d,mergeSort(c)));

            const e = [4,49,80,35,92,97,19,74,12,82,58,34,17,66,51,46,59,88,30,55,68,25,91,45,90,16,70,100,57,44,62,43,77,37,76,23,24,13,78,1,32,87,39,52,38,36,48,11,28,47];
            const f = [1,4,11,12,13,16,17,19,23,24,25,28,30,32,34,35,36,37,38,39,43,44,45,46,47,48,49,51,52,55,57,58,59,62,66,68,70,74,76,77,78,80,82,87,88,90,91,92,97,100];
            assert.equal(true,isEqual(f,mergeSort(e)));

            const g = ['curry','paste','flax','seed','spinach','half-and-half','potato','chips','chili','powder','chai','chicken','liver','peas','poultry','seasoning'];
            const h = ['chai','chicken','chili','chips','curry','flax','half-and-half','liver','paste','peas','potato','poultry','powder','seasoning','seed','spinach'];
            assert.equal(true,isEqual(h,mergeSort(g)));

            assert.equal([undefined],isEqual(['curry',undefined],mergeSort(['curry',undefined])));
            assert.equal([undefined],isEqual(['curry',null],mergeSort(['curry',null])));
        });

    });

    describe('optInsertionSort(..)', () => {

        it('should test various array sizes', () =>{
            const a = [9,0,8,1,2,7,6,3,5,4];
            const b = [0,1,2,3,4,5,6,7,8,9];
            assert.equal(true,isEqual(b,optInsertionSort(a)));

            const c = [52,43,48,28,59,45,4,24,16,14,49,12,39,9,13,56,18,22,17,42];
            const d = [4,9,12,13,14,16,17,18,22,24,28,39,42,43,45,48,49,52,56,59];
            assert.equal(true,isEqual(d,optInsertionSort(c)));

            const e = [4,49,80,35,92,97,19,74,12,82,58,34,17,66,51,46,59,88,30,55,68,25,91,45,90,16,70,100,57,44,62,43,77,37,76,23,24,13,78,1,32,87,39,52,38,36,48,11,28,47];
            const f = [1,4,11,12,13,16,17,19,23,24,25,28,30,32,34,35,36,37,38,39,43,44,45,46,47,48,49,51,52,55,57,58,59,62,66,68,70,74,76,77,78,80,82,87,88,90,91,92,97,100];
            assert.equal(true,isEqual(f,optInsertionSort(e)));

            const g = ['curry','paste','flax','seed','spinach','half-and-half','potato','chips','chili','powder','chai','chicken','liver','peas','poultry','seasoning'];
            const h = ['chai','chicken','chili','chips','curry','flax','half-and-half','liver','paste','peas','potato','poultry','powder','seasoning','seed','spinach'];
            assert.equal(true,isEqual(h,optInsertionSort(g)));

            assert.equal([undefined],isEqual(['curry',undefined],optInsertionSort(['curry',undefined])));
            assert.equal([undefined],isEqual(['curry',null],optInsertionSort(['curry',null])));
        });

    });

    describe('selectionSort(..)', () => {

        it('should test various array sizes', () =>{
            const a = [9,0,8,1,2,7,6,3,5,4];
            const b = [0,1,2,3,4,5,6,7,8,9];
            assert.equal(true,isEqual(b,selectionSort(a)));

            const c = [52,43,48,28,59,45,4,24,16,14,49,12,39,9,13,56,18,22,17,42];
            const d = [4,9,12,13,14,16,17,18,22,24,28,39,42,43,45,48,49,52,56,59];
            assert.equal(true,isEqual(d,selectionSort(c)));

            const e = [4,49,80,35,92,97,19,74,12,82,58,34,17,66,51,46,59,88,30,55,68,25,91,45,90,16,70,100,57,44,62,43,77,37,76,23,24,13,78,1,32,87,39,52,38,36,48,11,28,47];
            const f = [1,4,11,12,13,16,17,19,23,24,25,28,30,32,34,35,36,37,38,39,43,44,45,46,47,48,49,51,52,55,57,58,59,62,66,68,70,74,76,77,78,80,82,87,88,90,91,92,97,100];
            assert.equal(true,isEqual(f,selectionSort(e)));

            const g = ['curry','paste','flax','seed','spinach','half-and-half','potato','chips','chili','powder','chai','chicken','liver','peas','poultry','seasoning'];
            const h = ['chai','chicken','chili','chips','curry','flax','half-and-half','liver','paste','peas','potato','poultry','powder','seasoning','seed','spinach'];
            assert.equal(true,isEqual(h,selectionSort(g)));

            assert.equal([undefined],isEqual(['curry',undefined],selectionSort(['curry',undefined])));
            assert.equal([undefined],isEqual(['curry',null],selectionSort(['curry',null])));
        });

    });

    describe('shellSort(..)', () => {

        it('should test various array sizes', () =>{
            const a = [9,0,8,1,2,7,6,3,5,4];
            const b = [0,1,2,3,4,5,6,7,8,9];
            assert.equal(true,isEqual(b,shellSort(a)));

            const c = [52,43,48,28,59,45,4,24,16,14,49,12,39,9,13,56,18,22,17,42];
            const d = [4,9,12,13,14,16,17,18,22,24,28,39,42,43,45,48,49,52,56,59];
            assert.equal(true,isEqual(d,shellSort(c)));

            const e = [4,49,80,35,92,97,19,74,12,82,58,34,17,66,51,46,59,88,30,55,68,25,91,45,90,16,70,100,57,44,62,43,77,37,76,23,24,13,78,1,32,87,39,52,38,36,48,11,28,47];
            const f = [1,4,11,12,13,16,17,19,23,24,25,28,30,32,34,35,36,37,38,39,43,44,45,46,47,48,49,51,52,55,57,58,59,62,66,68,70,74,76,77,78,80,82,87,88,90,91,92,97,100];
            assert.equal(true,isEqual(f,shellSort(e)));

            const g = ['curry','paste','flax','seed','spinach','half-and-half','potato','chips','chili','powder','chai','chicken','liver','peas','poultry','seasoning'];
            const h = ['chai','chicken','chili','chips','curry','flax','half-and-half','liver','paste','peas','potato','poultry','powder','seasoning','seed','spinach'];
            assert.equal(true,isEqual(h,shellSort(g)));

            assert.equal([undefined],isEqual(['curry',undefined],shellSort(['curry',undefined])));
            assert.equal([undefined],isEqual(['curry',null],shellSort(['curry',null])));
        });

    });

});