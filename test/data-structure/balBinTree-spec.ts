// /// <reference path="../../typings/globals/node/index.d.ts" />
// /// <reference path="../../typings/globals/mocha/index.d.ts" />
//
// import assert = require('assert');
// import {BalancedBinSearchTree} from "../../src/data-structure/balBinSearchTree";
// import {isEqual} from "../../src/util/isEqual";
//
// describe('balanced binary tree data structure test', () => {
//
//     it('should test definition and functions of the balanced binary tree structure with proper properties', () => {
//
//         let bbst = new BalancedBinSearchTree();
//
//         assert.equal(bbst.isEmpty(),true);
//         assert.equal(bbst.size(),0);
//         assert.equal(bbst.contains('10'),false);
//         assert.equal(bbst.get('10'),null);
//         assert.throws( () => { bbst.get(null); }, Error, 'called getFromNodeAtKey() with a null key');
//         assert.throws( () => { bbst.get(undefined); }, Error, 'called getFromNodeAtKey() with a null key');
//
//         bbst.put('10',10);
//         assert.equal(bbst.contains('10'),true);
//         assert.equal(bbst.get('10'),10);
//         assert.equal(bbst.isEmpty(),false);
//         assert.equal(bbst.size(),1);
//
//         bbst.put('10',10);
//         assert.equal(bbst.isEmpty(),false);
//         assert.equal(bbst.size(),1);
//
//         bbst.put('5',5);
//         bbst.put('3',3);
//         assert.equal(bbst.isEmpty(),false);
//         assert.equal(bbst.size(),3);
//         assert.equal(bbst.get('5'),5);
//
//         bbst.put('3',-3);
//         assert.equal(bbst.size(),3);
//         bbst.put('3',3);
//
//         assert.notEqual(bbst.get('3'),2);
//         assert.equal(bbst.get('3'),3);
//         bbst.put('2',2);
//         assert.equal(bbst.size(),4);
//
//         bbst.put('15',15);
//         bbst.put('17',17);
//         assert.equal(bbst.size(),6);
//
//         assert.equal(bbst.minKey(),'2');
//         assert.equal(bbst.maxKey(),'17');
//
//         bbst.removeMin();
//         assert.notEqual(bbst.minKey(),'2');
//         assert.equal(bbst.minKey(),'3');
//
//         bbst.removeMax();
//         assert.notEqual(bbst.maxKey(),'17');
//         assert.equal(bbst.maxKey(),'15');
//
//         bbst.remove('3');
//         assert.notEqual(bbst.minKey(),'3');
//         assert.equal(bbst.minKey(),'5');
//
//         bbst.put('3',3);
//         bbst.put('2',2);
//         bbst.put('4',4);
//         bbst.put('13',13);
//         bbst.put('14',14);
//         bbst.put('17',17);
//
//         assert.equal(bbst.size(),9);
//
//         assert.equal(bbst.floor('2.9'),'2');
//         assert.equal(bbst.floor('3.5'),'3');
//         assert.equal(bbst.floor('1.9'),null);
//         assert.equal(bbst.floor('13'),13);
//         assert.equal(bbst.ceil('2.9'),'3');
//         assert.equal(bbst.ceil('3.5'),'4');
//         assert.equal(bbst.ceil('5.5'),'10');
//         assert.equal(bbst.ceil('13'),'13');
//         assert.equal(bbst.ceil('17.8'),null);
//         assert.equal(bbst.ceil('17'),'17');
//
//         assert.equal(bbst.rank('10'),4);
//         assert.equal(bbst.rank('3'),1);
//         assert.equal(bbst.rank('2'),0);
//         assert.equal(bbst.rank('5'),3);
//         assert.equal(bbst.rank('13'),5);
//         assert.equal(bbst.rank('14'),6);
//         assert.equal(bbst.rank('17'),8);
//         assert.throws( () => { bbst.rank('18'); }, Error, 'key does not exist');
//
//         assert.equal(bbst.selectKeyForRank(4),10);
//         assert.equal(bbst.selectKeyForRank(8),17);
//         assert.throws( () => { bbst.selectKeyForRank(9); }, Error, 'called selectKeyForRank() with invalid argument');
//         assert.throws( () => { bbst.selectKeyForRank(-1); }, Error, 'called selectKeyForRank() with invalid argument');
//
//         bbst.remove('17');
//         // assert.equal(bbst.selectKeyForRank(7),15);
//         // bbst.remove('13');
//         // assert.equal(bbst.selectKeyForRank(5),14);
//         //
//         // assert.equal(isEqual(bbst.keys(),[ '2', '3', '4', '5', '10', '14', '15' ]),true);
//         //
//         // const it = bbst.iterator();
//         // assert.equal(it.hasNext(), true);
//         // assert.equal(isEqual(it.next(),{ key: '2', value: 2, left: null, right: null, size: 1 }),true);
//         // assert.equal(it.hasNext(), true);
//         // assert.equal(
//         //     isEqual(
//         //         it.next(),
//         //         { key: '3',
//         //             value: 3,
//         //             left: { key: '2', value: 2, left: null, right: null, size: 1 },
//         //             right: { key: '4', value: 4, left: null, right: null, size: 1 },
//         //             size: 3
//         //         }
//         //     ),true);
//         //
//         // assert.equal(isEqual(bbst.keysInLevelOrder(),[ '10', '5', '15', '3', '14', '2', '4' ]),true);
//         // assert.equal(bbst.height(),3);
//
//         // console.log(bbst.keysInLevelOrder());
//
//     });
//
// });
