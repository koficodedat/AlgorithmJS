/// <reference path="../../typings/globals/node/index.d.ts" />
/// <reference path="../../typings/globals/mocha/index.d.ts" />

import assert = require('assert');
import {Queue} from "../../src/data-structure/queue";

describe('queue data structure test', () => {

    it('should test definition and functions of the queue structure with proper properties', () => {

        let queue = new Queue();

        assert.equal(queue.isEmpty(),true);
        assert.equal(queue.size(),0);

        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);

        assert.notEqual(queue.isEmpty(),true);
        assert.equal(queue.size(),3);

        assert.equal(queue.peek(),1);
        assert.equal(queue.dequeue(),1);
        assert.equal(queue.peek(),2);
        assert.equal(queue.dequeue(),2);
        assert.notEqual(queue.peek(),1);
        assert.equal(queue.dequeue(),3);
        assert.throws( () => { queue.peek()  }, Error, 'queue underflow exception');
        assert.throws( () => { queue.dequeue()  }, Error, 'queue underflow exception');

        queue.enqueue(3);
        assert.doesNotThrow( () => { queue.peek()  }, Error );
        assert.doesNotThrow( () => { queue.dequeue()  }, Error );
        assert.throws( () => { queue.peek()  }, Error, 'queue underflow exception');
        assert.throws( () => { queue.dequeue()  }, Error, 'queue underflow exception');

    });

});