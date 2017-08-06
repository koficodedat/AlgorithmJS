/// <reference path="../../typings/globals/node/index.d.ts" />
/// <reference path="../../typings/globals/mocha/index.d.ts" />

import assert = require('assert');
import {Stack} from "../../src/data-structure/stack";

describe('stack data structure test', () => {

    it('should test definition and functions of the stack structure with proper properties', () => {

        let stack = new Stack();

        assert.equal(stack.isEmpty(),true);
        assert.equal(stack.size(),0);

        stack.push(1);
        stack.push(2);
        stack.push(3);

        assert.notEqual(stack.isEmpty(),true);
        assert.equal(stack.size(),3);

        assert.equal(stack.peek(),3);
        assert.equal(stack.pop(),3);
        assert.equal(stack.peek(),2);
        assert.equal(stack.pop(),2);
        assert.notEqual(stack.peek(),3);
        assert.equal(stack.pop(),1);
        assert.throws( () => { stack.peek()  }, Error, 'stack underflow exception');
        assert.throws( () => { stack.pop()  }, Error, 'stack underflow exception');

        stack.push(3);
        assert.doesNotThrow( () => { stack.peek()  }, Error );
        assert.doesNotThrow( () => { stack.pop()  }, Error );
        assert.throws( () => { stack.peek()  }, Error, 'stack underflow exception');
        assert.throws( () => { stack.pop()  }, Error, 'stack underflow exception');

    });

});