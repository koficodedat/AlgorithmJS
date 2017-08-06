/// <reference path="../../typings/globals/node/index.d.ts" />
/// <reference path="../../typings/globals/mocha/index.d.ts" />

import assert = require('assert');
import {BinSearchTree} from "../../src/data-structure/binSearchTree";
import {isEqual} from "../../src/util/isEqual";

describe('binary tree data structure test', () => {

    it('should test definition and functions of the binary tree structure with proper properties', () => {

        let bst = new BinSearchTree();

        assert.equal(bst.isEmpty(),true);
        assert.equal(bst.size(),0);
        assert.equal(bst.contains('10'),false);
        assert.equal(bst.get('10'),null);
        assert.throws( () => { bst.get(null); }, Error, 'called getFromNodeAtKey() with a null key');
        assert.throws( () => { bst.get(undefined); }, Error, 'called getFromNodeAtKey() with a null key');

        bst.put('10',10);
        assert.equal(bst.contains('10'),true);
        assert.equal(bst.get('10'),10);
        assert.equal(bst.isEmpty(),false);
        assert.equal(bst.size(),1);

        bst.put('10',10);
        assert.equal(bst.isEmpty(),false);
        assert.equal(bst.size(),1);

        bst.put('5',5);
        bst.put('3',3);
        assert.equal(bst.isEmpty(),false);
        assert.equal(bst.size(),3);
        assert.equal(bst.get('5'),5);

        bst.put('3',-3);
        assert.equal(bst.size(),3);
        bst.put('3',3);

        assert.notEqual(bst.get('3'),2);
        assert.equal(bst.get('3'),3);
        bst.put('2',2);
        assert.equal(bst.size(),4);

        bst.put('15',15);
        bst.put('17',17);
        assert.equal(bst.size(),6);

        assert.equal(bst.minKey(),'2');
        assert.equal(bst.maxKey(),'17');

        bst.removeMin();
        assert.notEqual(bst.minKey(),'2');
        assert.equal(bst.minKey(),'3');

        bst.removeMax();
        assert.notEqual(bst.maxKey(),'17');
        assert.equal(bst.maxKey(),'15');

        bst.remove('3');
        assert.notEqual(bst.minKey(),'3');
        assert.equal(bst.minKey(),'5');

        bst.put('3',3);
        bst.put('2',2);
        bst.put('4',4);
        bst.put('13',13);
        bst.put('14',14);
        bst.put('17',17);

        assert.equal(bst.size(),9);

        assert.equal(bst.floor('2.9'),'2');
        assert.equal(bst.floor('3.5'),'3');
        assert.equal(bst.floor('1.9'),null);
        assert.equal(bst.floor('13'),13);
        assert.equal(bst.ceil('2.9'),'3');
        assert.equal(bst.ceil('3.5'),'4');
        assert.equal(bst.ceil('5.5'),'10');
        assert.equal(bst.ceil('13'),'13');
        assert.equal(bst.ceil('17.8'),null);
        assert.equal(bst.ceil('17'),'17');

        assert.equal(bst.rank('10'),4);
        assert.equal(bst.rank('3'),1);
        assert.equal(bst.rank('2'),0);
        assert.equal(bst.rank('5'),3);
        assert.equal(bst.rank('13'),5);
        assert.equal(bst.rank('14'),6);
        assert.equal(bst.rank('17'),8);
        assert.throws( () => { bst.rank('18'); }, Error, 'key does not exist');


        assert.equal(bst.selectKeyForRank(4),10);
        assert.equal(bst.selectKeyForRank(8),17);
        assert.throws( () => { bst.selectKeyForRank(9); }, Error, 'called selectKeyForRank() with invalid argument');
        assert.throws( () => { bst.selectKeyForRank(-1); }, Error, 'called selectKeyForRank() with invalid argument');

        bst.remove('17');
        assert.equal(bst.selectKeyForRank(7),15);
        bst.remove('13');
        assert.equal(bst.selectKeyForRank(5),14);

        assert.equal(isEqual(bst.keys(),[ '2', '3', '4', '5', '10', '14', '15' ]),true);

        const it = bst.iterator();
        assert.equal(it.hasNext(), true);
        assert.equal(isEqual(it.next(),{ key: '2', value: 2, left: null, right: null, size: 1 }),true);
        assert.equal(it.hasNext(), true);
        assert.equal(
            isEqual(
                it.next(),
                    { key: '3',
                        value: 3,
                        left: { key: '2', value: 2, left: null, right: null, size: 1 },
                        right: { key: '4', value: 4, left: null, right: null, size: 1 },
                        size: 3
                    }
                ),true);

        assert.equal(isEqual(bst.keysInLevelOrder(),[ '10', '5', '15', '3', '14', '2', '4' ]),true);
        assert.equal(bst.height(),3);
    });

});