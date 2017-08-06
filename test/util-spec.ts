/// <reference path="../typings/globals/node/index.d.ts" />
/// <reference path="../typings/globals/mocha/index.d.ts" />

import assert = require('assert');
import {isEqual} from "../src/util/isEqual";
import {contains} from "../src/util/contains";
import {hasType} from "../src/util/hasType";
import {hasSameType} from "../src/util/hasSameType";
import {arraySum,} from "../src/util/arraySum";
import {average} from "../src/util/average";
import {compare} from "../src/util/compare";
import {inversions} from "../src/util/inversions";
import {isSorted} from "../src/util/isSorted";
import {knuthShuffle} from "../src/util/knuthShuffle";
import {clone} from "../src/util/clone";
import {randSeq} from "../src/util/randSeq";
import {swapInArray} from "../src/util/swapInArray";
import {isPositive} from "../src/util/isPositive";
import {isNegative} from "../src/util/isNegative";
import {isNeutral} from "../src/util/isNeutral";
import {round} from "../src/util/round";
import {arrayProduct} from "../src/util/arrayProduct";
import {arrayMin} from "../src/util/arrayMin";
import {arrayMax} from "../src/util/arrayMax";

describe('utility function test', () =>{

    describe('isEqual(..)', () => {

        it('should return true for primitive test', () => {
            assert.equal(true,isEqual(3,3));
            assert.equal(true,isEqual(23.89,23.89));
            assert.equal(true,isEqual(0.5,1/2));
            assert.equal(true,isEqual(false,false));
            assert.equal(true,isEqual('true','true'));
        });

        it('should return false for primitive test', () => {
            assert.equal(false,isEqual(3,4));
            assert.equal(false,isEqual(23.89,23.88));
            assert.equal(false,isEqual(0.6,1/2));
            assert.equal(false,isEqual(false,true));
            assert.equal(false,isEqual('true','false'));
        });

        it('should return true for array test', () => {
            assert.equal(true,isEqual([],[]));
            assert.equal(true,isEqual([1,2,3,4],[1,2,3,4]));
            assert.equal(true,isEqual(['the','array','is','similar'],['the','array','is','similar']));
            assert.equal(true,isEqual([{},2,true,{ first: 'first', array: [true,false] }],[{},2,true,{ first: 'first', array: [true,false] }]));
        });

        it('should return false for array test', () => {
            assert.equal(false,isEqual([],[{}]));
            assert.equal(false,isEqual([1,2,3,4],[1,2,3,5]));
            assert.equal(false,isEqual(['the','array','is','not', 'similar'],['the','array','is', 'not similar']));
            assert.equal(false,isEqual([{},2,true,{ first: 'first', array: [true,false] }],[{},2,true,{ first: 'first', array: [false,false] }]));
        });

        it('should return true for object test', () => {
            assert.equal(true,isEqual({},{}));
            assert.equal(true,
                isEqual(
                    { first: 'first', name: 'Fred Nedjoh', age: 30, job: { name: 'some job', years: 5, salary: '$1', array: [{},{ projects: ['elgorithm', 'awareness', { entanglements: 'N/A'}] }]} },
                    { first: 'first', name: 'Fred Nedjoh', age: 30, job: { name: 'some job', years: 5, salary: '$1', array: [{},{ projects: ['elgorithm', 'awareness', { entanglements: 'N/A'}] }]} }));
        });

        it('should return false for object test', () => {
            assert.equal(false,isEqual({},{one:1}));
            assert.equal(false,
                isEqual(
                    { first: 'first', name: 'Fred Nedjoh', age: 30, job: { name: 'some job', years: 5, salary: '$1', array: [{},{ projects: ['elgorithm', 'awareness', { entanglements: 'N/A'}] }]} },
                    { first: 'first', name: 'Fred Nedjoh', age: 30, job: { name: 'some job', years: 5, salary: '$0', array: [{},{ projects: ['elgorithm', 'awareness', { entanglements: 'N/A'}] }]} }));
        });

        it('should return true for null and undefined test', () => {
            assert.equal(true,isEqual(null,null));
            assert.equal(true,isEqual(undefined,undefined));
        });

        it('should return false for null and undefined test', () => {
            assert.equal(false,isEqual(null,undefined));
            assert.equal(false,isEqual(undefined,'test'));
        });

    });

    describe('clone(..)', () => {

        it('should clone array', () => {
            let numberArray = [1,2,3,4,5];
            let stringArray = ['this','is','an','array'];

            let numberClone = clone(numberArray);
            let stringClone = clone(stringArray);

            numberClone[4] = 10;
            stringClone[0] = 'it';

            assert.equal(5,numberArray[4]);
            assert.equal(10,numberClone[4]);

            assert.equal('this',stringArray[0]);
            assert.equal('it',stringClone[0]);
        });

        it('should clone object', () => {
            let object = {
                name: 'Kofi Nedjoh',
                age: 30,
                gender: 'M',
                canCode: true,
                schedule: ['monday','wednesday','friday']
            };

            let objClone = clone(object);

            object.age = 29;

            assert.equal(29,object.age);
            assert.equal(30,objClone.age);
        });

    });

    describe('contains(..)', () =>{

        it('should return true', () => {
            assert.equal(true,contains([1,2,3,-5],3));
        });

        it('should return false', () => {
            assert.equal(false,contains([1,2,'three',-5],3));
        });

        it('should return true', () => {
            assert.equal(true,contains([1,2,3,'minus five'],'minus five'));
        });

        it('should return true', () => {
            assert.equal(true,contains([1,null,3,'minus five'],null));
        });

        it('should assert true and then false based on condition', () => {
            const obj = {
                one: 1,
                two: 'two',
                three: true,
                array: [1,2,3,4],
                complex: { z: 'zed', isZ: true }
            };

            assert.equal(true,contains(obj,'two'));
            assert.equal(false,contains(obj,2));
            assert.equal(true,contains(obj,[1,2,3,4]));
            assert.equal(false,contains(obj,[1,2,4]));
            assert.equal(true,contains(obj,{ z: 'zed', isZ: true }));
            assert.equal(false,contains(obj,{ z: 'zed', isZ: false }));
        });

    });

    describe('hasType(..)', () =>{

        it('should return true', () => {
            assert.equal(true,hasType([1,2,3,-5],'number'));
        });

        it('should return false', () => {
            assert.equal(false,hasType([1,2,3,-5],'string'));
        });

        it('should return true', () => {
            assert.equal(true,hasType([1,2,3,-5,true],'boolean'));
        });

        it('should return false', () => {
            assert.equal(false,hasType([1,2,3,-5,true],'string'));
        });

        it('should return true', () => {
            assert.equal(true,hasType([1,2,null,-5,true],'object'));
        });

    });

    describe('hasSameType(..)', () =>{

        it('should return true', () => {
            assert.equal(true,hasSameType([1,2,3,-5]));
        });

        it('should return false', () => {
            assert.equal(false,hasSameType([1,2,'three',-5]));
        });

    });

    describe('arraySum(..)', () => {

        it('should return 6', () => {
            assert.equal(6,arraySum([1,2,3]));
        });

        it('should return 0', () => {
            assert.equal(0,arraySum([-1,-2,3]));
        });

        it('should return 1', () => {
            assert.equal(1,arraySum([-1,-2,4]));
        });

        it('should return undefined', () => {
            assert.equal(undefined,arraySum([-1,-2,null]));
        });

    });

    describe('average(..)', () =>{

        it('should return 4.5', () => {
            assert.equal(4.5,average([2,3,4,5,6,7]));
        });

        it('should return -2', () => {
            assert.equal(-2,average([-2,-10,3,4,5,-12]));
        });

        it('should return undefined', () => {
            assert.equal(undefined,average([-2,-10,3,4,5,null]));
        });

    });

    describe('compare(..)', () =>{

        it('should return -1', () => {
            assert.equal(-1,compare(1,2));
        });

        it('should return 0', () => {
            assert.equal(0,compare(2,2));
        });

        it('should return 1', () => {
            assert.equal(1,compare(2,1));
        });

        it('should return undefined', () => {
            assert.equal(undefined,compare(1,null));
        });

    });

    describe('inversions(..)', () =>{

        it('should return 3', () => {
            assert.equal(3,inversions(['c','b','a']));
        });

        it('should return 5', () => {
            assert.equal(5,inversions([3,2,2,1]));
        });

        it('should return undefined', () => {
            assert.equal(undefined,inversions([3,2,null,1]));
        });

    });

    describe('isSorted(..)', () =>{

        it('should return true', () => {
            assert.equal(true,isSorted([1,2,3]));
        });

        it('should return false', () => {
            assert.equal(false,isSorted(['c','b','a']));
        });

        it('should return undefined', () => {
            assert.equal(undefined,isSorted(['c','b',3]));
        });

    });

    describe('swapInArray(..)', () =>{

        it('should swap values at index 0 and 1', () => {
            let array = [1,2,3,4];

            swapInArray(0,1,array);

            assert.equal(2,array[0]);
            assert.equal(1,array[1]);
        });

    });

    describe('knuthShuffle(..)', () =>{

        it('should not have a deep copy', () => {

            let unshuffled = ['a',2,true];
            let shuffled = knuthShuffle(unshuffled);

            assert.notDeepEqual(unshuffled,shuffled);
        });

    });

    describe('randSeq(..)', () =>{

        it('should have 2 elements', () => {
            let seq = randSeq(2,2,5);
            assert.equal(2,seq.length);
        });

        it('should have 5 elements', () => {
            let seq = randSeq(5,2,5);
            assert.equal(5,seq.length);
        });

    });

    describe('isPositive(..), isNegative(..), isNeutral(..)', () =>{

        it('should return true and then false based on conditions', () => {
            assert.equal(true,isPositive(1));
            assert.equal(false,isPositive(-1));
        });

        it('should return true and then false based on conditions', () => {
            assert.equal(true,isNegative(-1));
            assert.equal(false,isNegative(1));
        });

        it('should return true and then false based on conditions', () => {
            assert.equal(true,isNeutral(0));
            assert.equal(false,isNeutral(1));
        });
    });

    describe('round(..)', () => {

        it('should round to 3 decimal places', () => {
            assert.equal(1.235,round(1.23456, 3));
        });

        it('should round to 2 decimal places', () => {
            assert.equal(1.23,round(1.23456, 2));
        });

        it('should round to 1 decimal places', () => {
            assert.equal(1.2,round(1.23456));
        });
    });

    describe('arrayProduct(..)', () =>{

        it('should return 6', () => {
            assert.equal(6,arrayProduct([1,2,3]));
        });

        it('should return 18', () => {
            assert.equal(18,arrayProduct([3,2,3]));
        });

    });

    describe('arrayMin(..)', () =>{

        it('should return { key: 0, value: 1 }', () => {
            assert.deepEqual({ key: 0, value: 1 },arrayMin([1,2,3]));
        });

        it('should return { key: 2, value: 3 }', () => {
            assert.deepEqual({ key: 2, value: 3 },arrayMin([1,2,3],2));
        });

        it('should return { key: 3, value: 3 }', () => {
            assert.deepEqual({ key: 3, value: 3 },arrayMin([4,1,5,3],1));
        });

        it('should return null', () => {
            assert.deepEqual(null,arrayMin([4,1,5,3],7));
        });

        it("should return  { key: 0, value: 'one' }", () => {
            assert.deepEqual( { key: 0, value: 'one' },arrayMin(['one','two','three']));
        });

        it('should return undefined', () => {
            assert.deepEqual(null,arrayMin([4,1,5,3,'one'],7));
        });

    });

    describe('arrayMax(..)', () =>{

        it('should return { key: 2, value: 3 }', () => {
            assert.deepEqual({ key: 2, value: 3 },arrayMax([1,2,3,3]));
        });

        it('should return { key: 0, value: 1 }', () => {
            assert.deepEqual({ key: 0, value: 1 },arrayMax([1,2,3],2));
        });

        it('should return { key: 1, value: 1 }', () => {
            assert.deepEqual({ key: 1, value: 1 },arrayMax([4,1,5,3],7));
        });

        it('should return null', () => {
            assert.deepEqual(null,arrayMax([4,1,5,3],0));
        });

        it("should return  { key: 0, value: 'one' }", () => {
            assert.deepEqual( { key: 1, value: 'two' },arrayMax(['one','two','three']));
        });

        it('should return undefined', () => {
            assert.deepEqual(null,arrayMax([4,1,5,3,'one'],7));
        });

    });

});