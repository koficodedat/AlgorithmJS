import * as rand from '../util/randSeq';

/*
 This file contains a simple implementation of a one by n dimensional vector.
 */
/*
 This is an implementation of a 1 by N dimensional Vector data structure.
 It implements:
    base vector functions:
        dot(..)
        plus(..)
        minus(..)
        magnitude()
        distance()
        cartesian(..)
        unit(..)
        scale(..)

    added vector functions:
        vec()
        initVec(..)
        initVecWithArray(..)
        zeroVec(..)
        isSameLength(..)
 */

interface Vector {
    dimension: number;
    data: number[];
}

export class VectorImpl{

    private vector: Vector = { dimension: 0, data: [] };

    constructor(){};

    vec(): Vector{
        return this.vector;
    }

    initVec(...values: number[]): VectorImpl{
        this.vector = { dimension: values.length, data: values };
        return this;
    }

    initVecWithArray(values: number[]): VectorImpl{
        this.vector = { dimension: values.length, data: values };
        return this;
    }

    zeroVec(dimension: number): VectorImpl{

        this.vector = { dimension: dimension, data: [] };

        for( let i = 0; i < dimension; i++ ){
            this.vector.data[i] = 0;
        }

        return this;
    }

    dot(vector: VectorImpl): number{

        if( !this.isSameLength([this,vector]) ) throw new Error('Vectors must be of the same length');

        let sum: number = 0;

        for( let i = 0; i < this.vector.dimension; i++ ){
            sum += ( this.vector.data[i] * vector.vector.data[i] );
        }

        return sum;
    }

    plus(vector: VectorImpl): VectorImpl{

        if( !this.isSameLength([this,vector])) throw new Error('Vectors must be of the same length');

        let newVector: VectorImpl = new VectorImpl();

        for( let i = 0; i < this.vector.dimension; i++ ){
            newVector.vector.data[i] = this.vector.data[i] + vector.vector.data[i];
        }

        return newVector;
    }

    minus(vector: VectorImpl): VectorImpl{

        if( !this.isSameLength([this,vector])) throw new Error('Vectors must be of the same length');

        let newVector: VectorImpl = new VectorImpl();

        for( let i = 0; i < this.vector.dimension; i++ ){
            newVector.vector.data[i] = this.vector.data[i] - vector.vector.data[i];
        }

        return newVector;
    }

    magnitude(): number{
        return Math.sqrt( this.dot(this) );
    }

    distance(): number{
        return  this.minus(this).magnitude();
    }

    cartesian(index: number): number{
        return this.vector.data[index];
    }

    scale(scalar: number): VectorImpl{
        let newVector: VectorImpl = new VectorImpl();
        newVector.vector.dimension = this.vector.dimension;

        for( let i = 0; i < this.vector.dimension; i++ ){
            console.log('vector',this.vector);
            console.log('index',i);
            console.log('vector at index',this.vector.data[i]);
            newVector.vector.data[i] = scalar * this.vector.data[i];
        }

        return newVector;
    }

    unit(): VectorImpl{
        if( this.magnitude() === 0 ) throw new Error('Zero-vector has no direction');
        return this.scale( 1.0 / this.magnitude() );
    }

    isSameLength(x: VectorImpl): boolean;
    isSameLength(x: VectorImpl[]): boolean;

    isSameLength(x: VectorImpl | VectorImpl[]): boolean{

        if( x instanceof VectorImpl ){
            return this.vector.dimension === x.vector.dimension;
        }

        if( x instanceof Array && x[0] instanceof VectorImpl ){

            if( x.length < 1 ) throw new Error('Need at least one vectors to check for length equivalency');

            for( let i = 0; i < x.length; i++ ){
                if( this.vector.dimension !== x[i].vector.dimension ) return false;
            }

            return true;
        }

    }

}