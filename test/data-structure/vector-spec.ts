/// <reference path="../../typings/globals/node/index.d.ts" />
/// <reference path="../../typings/globals/mocha/index.d.ts" />

import assert = require('assert');
import {VectorImpl} from "../../src/data-structure/vector";
import {isEqual} from "../../src/util/isEqual";
import {round} from "../../src/util/round";

describe('vector data structure test', () => {

    it('should test definition and functions of the vector structure with proper properties', () => {

        const v = new VectorImpl();
        const v1 = new VectorImpl([1,2,3,4]);

        assert.equal(true, isEqual(v.vec(),{ dimension: 0, data: [] } ));
        assert.equal(true, isEqual(v1.vec(),{ dimension: 4, data: [1,2,3,4] } ));
        assert.throws( () => { v.dot(v1); }, Error, 'vectors must be of the same length');
        assert.equal(0,v.dot(v));
        assert.equal(30,v1.dot(v1));
        v.set([5,6,7,8]);
        assert.equal(true, isEqual(v.vec(),{ dimension: 4, data: [5,6,7,8] }));
        assert.equal(true,isEqual(v1.set([10,11,12,13]),{ vector: { dimension: 4, data: [ 10, 11, 12, 13 ] } }));
        assert.equal(534,v1.dot(v1));
        v.set([5,6,7,8,9]);
        assert.throws( () => { v.dot(v1); }, Error, 'vectors must be of the same length');
        v.set([12,09,23,98]);
        assert.equal(true, isEqual(v.plus(v1).vec(),{ dimension: 4, data: [ 22, 20, 35, 111 ] }));
        assert.equal(true, isEqual(v.minus(v1).vec(),{ dimension: 4, data: [ 2, -2, 11, 85 ] }));
        assert.equal(v.cartesian(0),12);
        v.put(0,24);
        assert.equal(v.cartesian(0),24);
        assert.equal(true, isEqual(v.vec(),{ dimension: 4, data: [24,09,23,98] }));
        assert.equal(true, isEqual(round(v.magnitude(),2),103.87));
        assert.equal(true, isEqual(v.distance(v),0));
        assert.equal(true, isEqual(round(v.distance(v1),2),86.87));
        v.scale(2);
        assert.equal(true, isEqual(v.vec(),{ dimension: 4, data: [ 24, 9, 23, 98 ] }));
        assert.equal(true, isEqual(v.unit().vec(),{ dimension: 4, data: [ 0.23105, 0.08664, 0.22142, 0.94344 ] }));
        assert.equal(true,v.isSameLength(v1));
        v.set([5,6,7,8,9]);
        assert.equal(false,v.isSameLength(v1));
        assert.equal(true, isEqual(VectorImpl.setWithSingleValue(3,2).vec(),{ dimension: 3, data: [ 2,2,2 ] }));
        assert.equal(true, isEqual(VectorImpl.zeros(3).vec(),{ dimension: 3, data: [ 0,0,0 ] }));
        assert.equal(true, isEqual(VectorImpl.ones(4).vec(),{ dimension: 4, data: [ 1,1,1,1 ] }));
        assert.equal(true, isEqual(VectorImpl.gen(0,5,2).vec(),{ dimension: 3, data: [ 0,2,4 ] }));
        assert.equal(true, isEqual(VectorImpl.gen(0,5).vec(),{ dimension: 6, data: [ 0, 1, 2, 3, 4, 5 ] }));
    });

});