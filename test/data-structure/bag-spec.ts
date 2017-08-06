/// <reference path="../../typings/globals/node/index.d.ts" />
/// <reference path="../../typings/globals/mocha/index.d.ts" />

import assert = require('assert');
import {Bag} from "../../src/data-structure/bag";
import {isEqual} from "../../src/util/isEqual";

describe('bag data structure test', () =>{

    it('should test definition and functions of the bag structure with proper properties', () => {

        let bag = new Bag();

        assert.equal(bag.isEmpty(),true);
        assert.equal(bag.size(),0);

        bag.add(1);
        bag.add(2);
        bag.add(3);

        assert.notEqual(bag.isEmpty(),true);
        assert.equal(bag.size(),3);

        const it = bag.iterator();
        assert.equal(it.hasNext(), true);
        assert.equal(it.next(), 3);
        assert.equal(it.hasNext(), true);
        assert.equal(it.next(), 2);
        assert.equal(it.hasNext(), true);
        assert.equal(it.next(), 1);
        assert.equal(it.hasNext(), false);
        assert.throws( () => { it.next(); }, Error, 'iterator underflow' );

        const itr = bag.iterator();
        assert.equal(itr.next(), 3);
        assert.doesNotThrow( () => { itr.remove(); }, Error );
        assert.throws( () => { itr.remove(); }, Error, 'need to call next() before remove()' );
        assert.equal(itr.next(), 2);
        assert.equal(itr.next(), 1);
        assert.doesNotThrow( () => { itr.remove(); }, Error );

        const itl = bag.iterator();
        assert.equal(true,isEqual([3,2,1],itl.list()));

    });

});