import {randSeq} from "../util/randSeq";
import {uniform} from "../util/uniform";
import {VectorImpl} from "./vector";
import {isPositive} from "../util/isPositive";
import {isNeutral} from "../util/isNeutral";
import {arrayMin} from "../util/arrayMin";
import {arrayMax} from "../util/arrayMax";
import {arrayProduct} from "../util/arrayProduct";
import {arraySum} from "../util/arraySum";

/*
 @since 1.0.25
 This is an implementation of Matrix data structure.
 It implements:
     base vector functions:
         scale(..)
         plus(..)
         minus(..)
         times(..)
         tpose()
         det()

        static functions:
            ident(..)
            inv()

     added vector functions:
         mat(..)
         set(..)
         row(..)
         col(..)
         set(..)
         seek(..)
         val(..)
         diag(..)
         antiDiag(..)
         isSquare()
         extendRow(..)
         extendColumn(..)
         some(..)
         isIdentity(..)
         isReversible(..)
         isEmpty()

         static functions:
             zeros(..)
             ones(..)
             randBi(..)
             rand(..)
 */


interface Matrix{
    rowLength: number;
    columnLength: number;
    data: number[];
}

export class MatrixImpl{

    private matrix: Matrix = null;

    constructor();
    constructor(rowLength: number, columnLength: number, values: number[]);
    constructor(arg1?, arg2?, arg3?){

        if( arguments.length === 0 ){
            this.isEmpty(true);
        }
        else if( arguments.length !== 0 ){

            if( arguments.length === 3 ){

                if( typeof arg1 !== 'number' ) throw new TypeError("First argument is of wrong type. Needs a number");
                if( typeof arg2 !== 'number' ) throw new TypeError("Second argument is of wrong type. Needs a number");
                if( !(arg3 instanceof Array) ) throw new TypeError("Third argument is of wrong type. Needs an Array or Rest Parameter");

                this.set( Math.floor(arg1), Math.floor(arg2), arg3, true );

            }
            else{
                throw new TypeError("Unexpected arguments in Matrix constructor");
            }

        }

    }

    mat(): Matrix{
        return this.matrix;
    }

    set(rowLength: number, columnLength: number, data: number[], shouldNotReturn?: boolean ): MatrixImpl | void{
        if( rowLength * columnLength !== data.length ) throw new Error(`init(..) - Vertical dimensions mismatch: ( 1x${ columnLength } vs 1x${ data.length % columnLength } )`);
        this.matrix = { rowLength: rowLength, columnLength: columnLength, data: data }
        if( !shouldNotReturn ) return this;
    }

    // (row - 1) * (col dim)
    row(index: number): VectorImpl{

        if( index < 1 || index > this.matrix.rowLength ) throw new Error(`row(..) - Row index out of bounds. ${ ( index < 1 ? 'Indexing begins from 1' : `Value ${index} out of bound ${this.matrix.rowLength}` ) }`);

        let data: number[] = [];
        let currentRowIdx = (index - 1) * this.matrix.columnLength;

        for( let column = 0; column < this.matrix.columnLength; column++ ){
            data[column] = this.matrix.data[currentRowIdx];
            currentRowIdx++;
        }

        return new VectorImpl(data);
    }

    // (row - 1)
    col(index: number): VectorImpl{

        if( index < 1 || index > this.matrix.columnLength ) throw new Error(`col(..) - Column index out of bounds. ${ ( index < 1 ? 'Indexing begins from 1' : `Value ${index} out of bound ${this.matrix.columnLength}` ) }`);

        let data: number[] = [];
        let currentColumnIdx = (index - 1);

        for( let column = 0; column < this.matrix.rowLength; column++ ){
            data[column] = this.matrix.data[currentColumnIdx];
            currentColumnIdx += this.matrix.columnLength;
        }

        return new VectorImpl(data);
    }

    scale(scalar: number): MatrixImpl{


        let data: number[] = [];

        for( let rowIdx = 1; rowIdx <= this.matrix.rowLength; rowIdx++ ){

            data.push( ...this.row( rowIdx ).scale( scalar ).vec().data );

        }

        return new MatrixImpl(this.matrix.rowLength, this.matrix.columnLength, data);
    }

    plus(input: MatrixImpl): MatrixImpl{

        if( this.matrix.rowLength !== input.matrix.rowLength || this.matrix.columnLength != input.matrix.columnLength )
            throw new Error(`plus(..) - Nonconformant arguments: ${this.matrix.rowLength}x${this.matrix.columnLength} vs ${input.matrix.rowLength}x${input.matrix.columnLength}`);

        let data: number[] = [];

        for( let rowIdx = 1; rowIdx <= this.matrix.rowLength; rowIdx++ ){

            data.push( ...this.row( rowIdx ).plus( input.row(rowIdx) ).vec().data );

        }

        return new MatrixImpl(this.matrix.rowLength, this.matrix.columnLength, data);
    }

    minus(input: MatrixImpl): MatrixImpl{

        if( this.matrix.rowLength !== input.matrix.rowLength || this.matrix.columnLength != input.matrix.columnLength )
            throw new Error(`minus(..) - Nonconformant arguments: ${this.matrix.rowLength}x${this.matrix.columnLength} vs ${input.matrix.rowLength}x${input.matrix.columnLength}`);

        let data: number[] = [];

        for( let rowIdx = 1; rowIdx <= this.matrix.rowLength; rowIdx++ ){

            data.push( ...this.row( rowIdx ).minus( input.row(rowIdx) ).vec().data );

        }

        return new MatrixImpl(this.matrix.rowLength, this.matrix.columnLength, data);
    }

    times(input: MatrixImpl): MatrixImpl{

        if( this.matrix.columnLength !== input.matrix.rowLength ) throw new Error(`times(..) - Nonconformant arguments: ${this.matrix.rowLength}x${this.matrix.columnLength} * ${input.matrix.rowLength}x${input.matrix.columnLength}`);

        let data: number[] = [];

        let dataIdx = 0;

        for( let rowIdx = 1; rowIdx <= this.matrix.rowLength; rowIdx++ ){

            for( let colIdx = 1; colIdx <= input.matrix.columnLength; colIdx++ ){

                data[dataIdx] = this.row( rowIdx ).dot( input.col(colIdx) );
                dataIdx++;

            }
        }

        return new MatrixImpl(this.matrix.rowLength, input.matrix.columnLength, data);
    }

    val(rowIdx: number, columnIdx: number): number{
        if( rowIdx < 1 || rowIdx > this.matrix.rowLength ) throw new Error(`val(..) - Row index out of bounds. ${ ( rowIdx < 1 ? 'Indexing begins from 1' : `Value ${rowIdx} out of bound ${this.matrix.rowLength}` ) }`);
        if( columnIdx < 1 || columnIdx > this.matrix.columnLength ) throw new Error(`val(..) - Column index out of bounds. ${ ( columnIdx < 1 ? 'Indexing begins from 1' : `Value ${columnIdx} out of bound ${this.matrix.columnLength}` ) }`);

        return this.matrix.data[ ( this.matrix.columnLength * (rowIdx  - 1) ) + ( columnIdx - 1 ) ];
    }

    tpose(): MatrixImpl{
        let data: number[] = [];

        for( let colIdx = 1; colIdx <= this.matrix.columnLength; colIdx++ ){
            data.push( ...this.col( colIdx ).vec().data );
        }

        this.matrix.data = data;
        this.matrix.rowLength = this.matrix.rowLength + this.matrix.columnLength;
        this.matrix.columnLength = this.matrix.rowLength - this.matrix.columnLength;
        this.matrix.rowLength = this.matrix.rowLength - this.matrix.columnLength;

        return this;
    }

    seek(rowIdx: number, columnIdx: number): boolean{
        return ( 1 <= rowIdx && rowIdx <= this.matrix.rowLength ) && ( 1 <= columnIdx && columnIdx <= this.matrix.columnLength );
    }

    det(): number{

        if( !this.isSquare() ) throw new Error('det() - Must be a square matrix');

        let detMatrix: MatrixImpl = this;
        const isTwoByTwo = this.matrix.rowLength === 2;

        //if more than 2x2, append (col dim - 1) number of column vectors, column wise at the end of the matrix.
        if( !isTwoByTwo ) detMatrix = this.extendColumn( this.some(1,1,[ this.matrix.rowLength, this.matrix.columnLength -1 ]) );


        let firstSum: number = 0;
        let secondSum: number = 0;

        for( let colIdx = 1; isTwoByTwo ? colIdx < 2 : colIdx <= detMatrix.matrix.rowLength; colIdx++ ){
            firstSum += arrayProduct( detMatrix.diag( 1,colIdx ).vec().data );
        }

        for( let colIdx = detMatrix.matrix.columnLength; isTwoByTwo ? colIdx > 1 : colIdx > ( detMatrix.matrix.columnLength - detMatrix.matrix.rowLength ); colIdx-- ){
            secondSum += arrayProduct( detMatrix.antiDiag( 1,colIdx ).vec().data );
        }

        return firstSum - secondSum;
    }

    diag(rowIdx: number, columnIdx: number): VectorImpl{
        if( rowIdx < 1 || rowIdx > this.matrix.rowLength ) throw new Error(`diag(..) - Row index out of bounds. ${ ( rowIdx < 1 ? 'Indexing begins from 1' : `Value ${rowIdx} out of bound ${this.matrix.rowLength}` ) }`);
        if( columnIdx < 1 || columnIdx > this.matrix.columnLength ) throw new Error(`diag(..) - Column index out of bounds. ${ ( columnIdx < 1 ? 'Indexing begins from 1' : `Value ${columnIdx} out of bound ${this.matrix.columnLength}` ) }`);

        let data: number[] = [];

        while( this.seek(rowIdx,columnIdx) ){

            data.push( this.val(rowIdx,columnIdx) );

            rowIdx++;
            columnIdx++;

        }

        return new VectorImpl(data);
    }

    antiDiag(rowIdx: number, columnIdx: number): VectorImpl{
        if( rowIdx < 1 || rowIdx > this.matrix.rowLength ) throw new Error(`antiDiag(..) - Row index out of bounds. ${ ( rowIdx < 1 ? 'Indexing begins from 1' : `Value ${rowIdx} out of bound ${this.matrix.rowLength}` ) }`);
        if( columnIdx < 1 || columnIdx > this.matrix.columnLength ) throw new Error(`antiDiag(..) - Column index out of bounds. ${ ( columnIdx < 1 ? 'Indexing begins from 1' : `Value ${columnIdx} out of bound ${this.matrix.columnLength}` ) }`);

        let data: number[] = [];

        while( this.seek(rowIdx,columnIdx) ){

            data.push( this.val(rowIdx,columnIdx) );

            rowIdx++;
            columnIdx--;
        }

        return new VectorImpl(data);
    }

    extendRow(adjoinMatrix: MatrixImpl): MatrixImpl{

        if( this.matrix.columnLength !== adjoinMatrix.matrix.columnLength ) throw new Error(`extendRow() - Column length mismatch: ${this.matrix.columnLength} vs ${adjoinMatrix.matrix.columnLength}`);

        const rowDimensions = this.matrix.rowLength + adjoinMatrix.matrix.rowLength;
        let data: number[] = this.matrix.data;
        data.push( ...adjoinMatrix.matrix.data );

        return new MatrixImpl( rowDimensions, this.matrix.columnLength, data );
    }

    extendColumn(adjoinMatrix: MatrixImpl): MatrixImpl{

        if( this.matrix.rowLength !== adjoinMatrix.matrix.rowLength ) throw new Error(`extendColumn() - Row length mismatch: ${this.matrix.rowLength} vs ${adjoinMatrix.matrix.rowLength}`);

        const columnDimensions = this.matrix.columnLength + adjoinMatrix.matrix.columnLength;
        let data: number[] = [];

        for( let rowIdx = 1; rowIdx <= this.matrix.rowLength; rowIdx++ ){

            let row: number[] = this.row( rowIdx ).vec().data;
            row.push( ...adjoinMatrix.row( rowIdx ).vec().data );

            data.push( ...row );
        }

        return new MatrixImpl( this.matrix.rowLength, columnDimensions, data );
    }

    some(fromRow: number, fromColumn: number, dimension: number[]): MatrixImpl{

        if( fromRow === 1 && fromColumn === 1 && ( dimension && dimension instanceof Array && dimension.length === 2 && ( dimension[0] === this.matrix.rowLength && dimension[1] === this.matrix.columnLength ) ) )
            return this;

        if( fromRow < 1 || fromRow > this.matrix.rowLength )
            throw new Error(`some(..) - Row index out of bounds. ${ ( fromRow < 1 ? `Indexing begins from 1` : `${this.matrix.rowLength} vs ${fromRow}` ) }`);

        if( fromColumn < 1 || fromColumn > this.matrix.columnLength )
            throw new Error(`some(..) - Column index out of bounds. ${ ( fromColumn < 1 ? `Indexing begins from 1` : `${this.matrix.columnLength} vs ${fromColumn}` ) }`);

        if( !dimension || dimension instanceof Array && dimension.length !== 2 ) throw new Error('some(..) - Third argument must be an Array of only two (2) elements');

        if( fromRow + ( dimension[0] - 1 ) > this.matrix.rowLength ) throw new Error(`some(..) - Row dimension out of bounds`);

        if( fromColumn + ( dimension[1] - 1 ) > this.matrix.columnLength ) throw new Error(`some(..) - Column dimension out of bounds`);

        let data: number[] = [];

        for( let rowIdx = fromRow; rowIdx <= fromRow + ( dimension[0] - 1 ); rowIdx++ ){

            data.push( ...this.row( rowIdx ).vec().data.slice( fromColumn - 1, fromColumn + ( dimension[1] - 1 ) ) )

        }

        return new MatrixImpl( dimension[0], dimension[1], data );
    }

    isSquare(): boolean{
        return this.matrix.rowLength === this.matrix.columnLength;
    }

    isIdentity(fromRow?: number): boolean{

        if( !this.isSquare() ) return false;

        for( let row = fromRow ? fromRow : 1; row <= this.matrix.rowLength; ){

            const columnData = this.col( row ).vec().data;

            if( columnData.indexOf(1) === -1 ) return false;

            const minValue = arrayMin( columnData, 0 );
            const maxValue = arrayMax( columnData );

            if( maxValue.value > 1 ) return false;
            if( minValue.value === 1 && minValue.key !== columnData.lastIndexOf( minValue.value ) ) return false;

            row++;
        }


        return true;
    }

    isReversible(fromRow?: number): boolean{

        if( !this.isSquare() ) return false;

        for( let row = fromRow ? fromRow : 1; row <= this.matrix.rowLength; ){

            const columnData = this.row( row ).vec().data;

            if( arraySum( columnData ) === 0 ) return false;

            row++;
        }

        return true;
    }

    isEmpty(shouldNotReturn?: boolean): MatrixImpl | void{
        this.matrix = { rowLength: 0, columnLength: 0, data: [] };
        if( !shouldNotReturn ) return this;
    }



    //statics
    static zeros(rowLength: number, columnLength: number): MatrixImpl{
        let data: number[] = VectorImpl.setWithSingleValue( (rowLength * columnLength), 0).vec().data;
        return new MatrixImpl(rowLength, columnLength, data);
    }

    static ones(rowLength: number, columnLength: number): MatrixImpl{
        let data: number[] = VectorImpl.setWithSingleValue( (rowLength * columnLength), 1).vec().data;
        return new MatrixImpl(rowLength, columnLength, data);
    }

    static randBi(rowLength: number, columnLength: number): MatrixImpl{
        return new MatrixImpl(
            rowLength,
            columnLength,
            randSeq( ( Math.floor(rowLength) * Math.floor(columnLength) ), 0, 1, false ) );
    }

    static rand(rowLength: number, columnLength: number, upto?:number): MatrixImpl{

        const hasUpto = upto !== undefined && upto > 0;
        const mid = hasUpto ? upto / 2 : 1/2;

        return new MatrixImpl(
            rowLength,
            columnLength,
            randSeq( ( Math.floor(rowLength) * Math.floor(columnLength) ), uniform(0, mid), uniform(mid, hasUpto ? upto : 1), false )
        );
    }

    static ident(rowLength: number, columnLength: number): MatrixImpl{

        let data: number[] = [];

        for( let rowIdx = 0; rowIdx < rowLength; rowIdx++ ){

            let set = VectorImpl.zeros(columnLength).vec().data;
            set[rowIdx] = 1;

            data.push( ...set );

        }

        return new MatrixImpl(rowLength, columnLength, data);
    }

    static inv(matrix: MatrixImpl): string | MatrixImpl{

        if( !matrix.isSquare() ) throw new Error('inv() - Argument must be a square matrix');
        if( !matrix.isReversible() ) return 'Matrix is irreversible';

        if( matrix.matrix.rowLength === 2 ){
            matrix = MatrixImpl.inverseHelper(matrix);
            return matrix.scale( 1/matrix.det() );
        }else{
            const rowReduceMatrix = this.guassElim( matrix, MatrixImpl.ident( matrix.matrix.rowLength, matrix.matrix.rowLength ) );
            return rowReduceMatrix.some(1,matrix.matrix.rowLength + 1,[matrix.matrix.rowLength,matrix.matrix.rowLength]);
        }

    }

    private static guassElim(input: MatrixImpl, output: MatrixImpl): MatrixImpl{ //TODO: have to make this function generalized and not for just inverse and open it up

        if( !input.isSquare() ) throw new Error('guassElim(..) - Argument 1 must be a square matrix');
        if( input.matrix.rowLength !== output.matrix.rowLength ) throw new Error('guassElim(..) - Arguments do not have matching Row dimensions');

        let combinedMatrix = input.extendColumn( output );

        combinedMatrix.forwardPivot(1);
        return combinedMatrix;
    }




    //privates
    private rowSquareMatrixFromIndex(rowIdx: number): MatrixImpl{

        if( rowIdx < 1 || this.matrix.rowLength - rowIdx > this.matrix.columnLength )
            throw new Error(`rowSquareMatrixFromIndex(..) - Row index out of bounds. ${ ( rowIdx < 1 ? `Indexing begins from 1` : `Cannot form a ${this.matrix.columnLength}x${this.matrix.columnLength} square matrix from row ${rowIdx} ` ) }`);

        let data: number[] = [];

        for( let row = rowIdx; row <= this.matrix.columnLength + 1; row++ ){
            data.push( ...this.row( row ).vec().data );
        }

        return new MatrixImpl(this.matrix.columnLength, this.matrix.columnLength, data);
    }

    private columnSquareMatrixFromIndex(colIdx: number): MatrixImpl{

        if( colIdx < 1 || this.matrix.columnLength - colIdx > this.matrix.rowLength )
            throw new Error(`columnSquareMatrixFromIndex(..) - Column index out of bounds. ${ ( colIdx < 1 ? `Indexing begins from 1` : `Cannot form a ${this.matrix.rowLength}x${this.matrix.rowLength} square matrix from column ${colIdx} ` ) }`);

        let data: number[] = [];

        for( let col = colIdx; col <= this.matrix.rowLength + 1; col++ ){
            data.push( ...this.col( col ).vec().data );
        }

        return new MatrixImpl(this.matrix.rowLength, this.matrix.rowLength, data).tpose();
    }

    private forwardPivot(pivotRowIdx: number){

        if( this.isIdentity( pivotRowIdx ) ) return;

        this.makeAllApplicablePositive(pivotRowIdx - 1);

        if( pivotRowIdx > this.matrix.rowLength ) this.backwardPivot( pivotRowIdx - 1 );
        else{
            const rowValue = this.row( pivotRowIdx ).vec().data[ pivotRowIdx - 1 ];

            if( isNeutral( rowValue ) ) this.createUnitValue( pivotRowIdx );
            if( !isNeutral( rowValue ) ) this.scaleByPivot( pivotRowIdx, rowValue );

            this.zeroAllBeneath( pivotRowIdx, pivotRowIdx + 1 );
        }
    }

    private backwardPivot(pivotRowIdx: number){

        if( this.isIdentity( pivotRowIdx ) ) return;

        this.makeAllApplicablePositive(pivotRowIdx + 1);

        if( pivotRowIdx < 1 ) return;
        else this.zeroAllAbove(pivotRowIdx, pivotRowIdx - 1);
    }

    private makePositive(rowIdx: number){
        this.matrix.data.splice( (rowIdx - 1) * this.matrix.columnLength, this.matrix.columnLength, ...this.row( rowIdx ).scale( -1 ).vec().data );
    }

    private makeAllApplicablePositive( rowIdx ){
        if( rowIdx <= 0 || rowIdx > this.matrix.rowLength ) return;

        const rowValue = this.row( rowIdx ).vec().data[ rowIdx - 1 ];

        if( rowValue === -1  ) this.makePositive( rowIdx );

        this.makeAllApplicablePositive( rowIdx + 1 );
    }

    private scaleByPivot(rowIdx: number, pivotValue: number){
        //scale by pivot value by 1/value and make positive
        let currentRowData = isPositive( pivotValue ) ? this.row( rowIdx ).scale( 1/( pivotValue ) ).vec().data : this.row( rowIdx ).scale( -1/( pivotValue ) ).vec().data;
        //insert new row at location
        this.matrix.data.splice( (rowIdx - 1) * this.matrix.columnLength, this.matrix.columnLength, ...currentRowData );

        this.makeAllApplicablePositive(rowIdx);
    }

    private createUnitValue(rowIdx: number){

        const columnData = this.col( rowIdx ).vec().data;
        const leastValue = arrayMin(columnData);

        const rowWithLowest = leastValue.key + 1;
        const currentRowVector = this.row( rowIdx );
        const helperRowVector = isPositive(leastValue.value) ? this.row( rowWithLowest ).scale( 1/leastValue.value ) : this.row( rowWithLowest ).scale( -1/leastValue.value );

        const currentRowData = helperRowVector.minus( currentRowVector ).vec().data; //scaled lower -  upper

        this.matrix.data.splice( (rowIdx - 1) * this.matrix.columnLength, this.matrix.columnLength, ...currentRowData );

        this.makeAllApplicablePositive(rowIdx);
    }

    private zeroAllBeneath(pivotRowIdx: number, iterRowIdx: number){

        if( iterRowIdx > this.matrix.rowLength ) this.forwardPivot( pivotRowIdx + 1 );
        else{

            const rowValue = this.row( iterRowIdx ).vec().data[ pivotRowIdx - 1 ];

            if( isNeutral( rowValue ) ) this.zeroAllBeneath( pivotRowIdx, iterRowIdx + 1 );
            else{
                let currentRowVector = this.row( iterRowIdx );
                let zeroingVector = this.row( pivotRowIdx );

                let currentRowData = zeroingVector.scale( rowValue ).minus( currentRowVector ).vec().data;

                this.matrix.data.splice( (iterRowIdx - 1) * this.matrix.columnLength, this.matrix.columnLength, ...currentRowData );

                this.makeAllApplicablePositive(iterRowIdx);

                this.zeroAllBeneath( pivotRowIdx, iterRowIdx + 1 );
            }
        }
    }

    private zeroAllAbove(pivotRowIdx: number, iterRowIdx: number){

        if( iterRowIdx < 1 ) this.backwardPivot( pivotRowIdx - 1 );
        else{

            const rowValue = this.row( iterRowIdx ).vec().data[ pivotRowIdx - 1 ];

            if( isNeutral( rowValue ) ) this.zeroAllAbove( pivotRowIdx, iterRowIdx - 1 );
            else{
                let currentRowVector = this.row( iterRowIdx );
                let zeroingVector = this.row( pivotRowIdx );

                let currentRowData = zeroingVector.scale( rowValue ).minus( currentRowVector ).vec().data;

                this.matrix.data.splice( (iterRowIdx - 1) * this.matrix.columnLength, this.matrix.columnLength, ...currentRowData );

                this.makeAllApplicablePositive(iterRowIdx);

                this.zeroAllAbove( pivotRowIdx, iterRowIdx - 1 );
            }
        }
    }



    //private static
    private static inverseHelper(matrix: MatrixImpl){

        let reverseLToRDiagonalVector = matrix.diag(1,1).vec().data.reverse();

        let diagIndx = 0;
        let antiDiagIndx = matrix.matrix.rowLength - 1;

        for( let i = 0; i < reverseLToRDiagonalVector.length; i++ , diagIndx += matrix.matrix.rowLength + 1  ){
            matrix.matrix.data[diagIndx] = reverseLToRDiagonalVector[i];
        }

        for( let i = 0; i < reverseLToRDiagonalVector.length; i++, antiDiagIndx += matrix.matrix.rowLength - 1 ){
            matrix.matrix.data[antiDiagIndx] = - matrix.matrix.data[antiDiagIndx];
        }

        return matrix;
    }

}