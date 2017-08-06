/// <reference path="../../typings/globals/node/index.d.ts" />
/// <reference path="../../typings/globals/mocha/index.d.ts" />

import assert = require('assert');
import {MatrixImpl} from "../../src/data-structure/matrix";
import {isEqual} from "../../src/util/isEqual";

describe('matrix data structure test', () => {

    it('should test definition and functions of the matrix structure with proper properties', () => {

        let m = new MatrixImpl();
        const m1 = new MatrixImpl(3,3,[1,2,3,4,5,6,7,8,9]);

        assert.equal(true, isEqual(m.mat(),{ rowLength: 0, columnLength: 0, data: [] }));
        assert.equal(true, isEqual(m1.mat(),{ rowLength: 3, columnLength: 3, data: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] }));
        assert.equal(true, isEqual(m.set(2,2,[1,2,2,1]).mat(),{ rowLength: 2, columnLength: 2, data: [ 1, 2, 2, 1 ] }));
        assert.equal(true, isEqual(m1.row(2).vec(),{ dimension: 3, data: [ 4, 5, 6 ] }));
        assert.equal(true, isEqual(m.col(2).vec(),{ dimension: 2, data: [ 2, 1 ] }));
        assert.throws( () => { m.set(3,2,[1,2,3,4,5]); }, Error, 'init(..) - Vertical dimensions mismatch: ( 1x2 vs 1x1 )' );
        assert.throws( () => { m.row(4); }, Error, 'row(..) - Row index out of bounds. Value 4 out of bound 2' );
        assert.throws( () => { m1.col(-1); }, Error, 'col(..) - Column index out of bounds. Indexing begins from 1' );
        m.set(3,2,[2,3,4,9,8,7]);
        assert.equal(true,isEqual(m.scale(4).mat(),{ rowLength: 3, columnLength: 2, data: [ 8, 12, 16, 36, 32, 28 ] }));
        assert.equal(true,isEqual(m.plus(m).mat(),{ rowLength: 3, columnLength: 2, data: [ 4, 6, 8, 18, 16, 14 ] }));
        assert.throws( () => { m.plus(m1); }, Error, 'plus(..) - Nonconformant arguments: 3x2 vs 3x3' );
        assert.equal(true,isEqual(m.minus(m).mat(),{ rowLength: 3, columnLength: 2, data: [ 0, 0, 0, 0, 0, 0 ] }));
        m1.set(3,2,[5,4,2,3,1,8]);
        assert.equal(true,isEqual(m.minus(m1).mat(),{ rowLength: 3, columnLength: 2, data: [ -3, -1, 2, 6, 7, -1 ] }));
        assert.equal(true,isEqual(m1.minus(m).mat(),{ rowLength: 3, columnLength: 2, data: [ 3, 1, -2, -6, -7, 1 ] }));
        assert.throws( () => { m1.times(m); }, Error, 'times(..) - Nonconformant arguments: 3x2 * 3x2' );
        m.set(2,3,[2,3,1,4,6,8]);
        assert.equal(true,isEqual(m.times(m1).mat(),{ rowLength: 2, columnLength: 2, data: [ 17, 25, 40, 98 ] }));
        assert.equal(true,isEqual(m1.times(m).mat(),{ rowLength: 3, columnLength: 3, data: [ 26, 39, 37, 16, 24, 26, 34, 51, 65 ] }));
        assert.equal(true,isEqual(m.val(2,3),8));
        assert.throws( () => { m.val(3,3); }, Error, 'val(..) - Row index out of bounds. Value 3 out of bound 2' );
        assert.throws( () => { m.val(2,4); }, Error, 'val(..) - Column index out of bounds. Value 4 out of bound 3' );
        assert.equal(true,isEqual(m.tpose().mat(),{ rowLength: 3, columnLength: 2, data: [ 2, 4, 3, 6, 1, 8 ] }));
        assert.equal(true,m.seek(3,2));
        assert.equal(false,m.seek(3,3));
        assert.throws( () => { m1.det(); }, Error, 'det() - Must be a square matrix' );
        m1.set(2,2,[2,1,4,3]);
        assert.equal(2,m1.det());
        assert.equal(true,isEqual(m1.diag(1,1).vec(),{ dimension: 2, data: [ 2, 3 ] }));
        assert.equal(true,isEqual(m1.diag(1,2).vec(),{ dimension: 1, data: [ 1 ] }));
        assert.throws( () => { m1.diag(1,3); }, Error, 'diag(..) - Column index out of bounds. Value 3 out of bound 2' );
        assert.equal(true,isEqual(m1.antiDiag(1,1).vec(),{ dimension: 1, data: [ 2 ] }));
        assert.equal(true,isEqual(m1.antiDiag(1,2).vec(),{ dimension: 2, data: [ 1, 4 ] }));
        assert.equal(true,isEqual(m.extendRow(m1).mat(),{ rowLength: 5, columnLength: 2, data: [ 2, 4, 3, 6, 1, 8, 2, 1, 4, 3 ] }));
        assert.throws( () => { m1.extendColumn(m); }, Error, 'extendColumn() - Row length mismatch: 2 vs 3' );
        m1.set(3,2,[2,1,4,3,5,2]);
        assert.equal(true,isEqual(m1.extendColumn(m).mat(),{ rowLength: 3, columnLength: 4, data: [ 2, 1, 2, 4, 4, 3, 3, 6, 5, 2, 1, 8 ] }));
        assert.equal(true,isEqual(m1.some(1,2,[1,1]).mat(),{ rowLength: 1, columnLength: 1, data: [ 1 ] }));
        assert.equal(true,isEqual(m1.some(1,1,[1,2]).mat(),{ rowLength: 1, columnLength: 2, data: [ 2, 1 ] }));
        assert.throws( () => { m1.some(1,1,[1,3]); }, Error, 'some(..) - Column dimension out of bounds' );
        assert.equal(false,m.isSquare());
        assert.equal(false,m.isIdentity());
        m = MatrixImpl.ident(5,5);
        assert.equal(true,m.isSquare());
        assert.equal(true,m.isIdentity());
        assert.equal(false,m1.isReversible());
        assert.equal(true,m.isReversible());
        assert.equal(false,m.isEmpty());
        m.createEmpty();
        assert.equal(true,m.isEmpty());
        assert.equal(true,isEqual(MatrixImpl.zeros(2,3).mat(),{ rowLength: 2, columnLength: 3, data: [ 0, 0, 0, 0, 0, 0 ] }));
        assert.equal(true,isEqual(MatrixImpl.ones(2,3).mat(),{ rowLength: 2, columnLength: 3, data: [ 1, 1, 1, 1, 1, 1 ] }));
        m = MatrixImpl.randBi(2,2);
        assert.equal(2,m.mat().rowLength);
        assert.equal(2,m.mat().columnLength);
        assert.equal(4,m.mat().data.length);
        assert.equal(true,m.mat().data[0] >= 0 && m.mat().data[0] <= 1);
        m = MatrixImpl.rand(2,3, 3);
        assert.equal(2,m.mat().rowLength);
        assert.equal(3,m.mat().columnLength);
        assert.equal(6,m.mat().data.length);
        assert.equal(true,m.mat().data[0] >= 0 && m.mat().data[0] <= 3);
        m.set(2,2,[2,4,1,6]);
        assert.equal(true,isEqual(MatrixImpl.inv(m).mat(),{ rowLength: 2, columnLength: 2, data: [ 0.75, -0.5, -0.125, 0.25 ] }));
        m.set(2,3,[2,4,1,6,3,0]);
        assert.throws( () => { MatrixImpl.inv(m); }, Error, 'inv() - Argument must be a square matrix' );
    });

});