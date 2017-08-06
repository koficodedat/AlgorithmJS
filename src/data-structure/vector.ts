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
        distance(..)
        cartesian(..)
        unit()
        scale(..)

    added vector functions:
        vec()
        set(..) changed from set(..) @since 1.0.25
        put(..) @since 1.0.25
        isSameLength(..)

        static functions:
            ones(..) @since 1.0.25
            setWithSingleValue(..) @since 1.0.25
            gen(..) @since 1.0.25
            zeros(..) @since 1.0.25
 */

import {round} from "../util/round";
interface Vector {
    dimension: number;
    data: number[];
}

export class VectorImpl{

    private vector: Vector = { dimension: 0, data: [] };

    constructor();
    constructor(values: number[]);
    constructor(arg?){

        if( arguments.length === 0 ){
            this.createEmpty();
        }
        else if( arguments.length === 1 ){

            if( !(arg instanceof Array) ) throw new TypeError("third argument is of wrong type. Needs an Array");

            this.set( arg );
        }
        else{
            throw new TypeError("unexpected arguments in Matrix constructor");
        }

    }

    vec(): Vector{
        return this.vector;
    }

    set(values: number[]): VectorImpl{
        this.vector = { dimension: values.length, data: values };
        return this;
    }

    dot(vector: VectorImpl): number{

        if( !this.isSameLength([this,vector]) ) throw new Error('vectors must be of the same length');

        let sum: number = 0;

        for( let i = 0; i < this.vector.dimension; i++ ){
            sum += ( this.vector.data[i] * vector.vector.data[i] );
        }

        return sum;
    }

    plus(vector: VectorImpl): VectorImpl{

        if( !this.isSameLength([this,vector])) throw new Error('vectors must be of the same length');

        let newVector: VectorImpl = new VectorImpl();

        newVector.vector.dimension = this.vector.dimension;

        for( let i = 0; i < this.vector.dimension; i++ ){
            newVector.vector.data[i] = this.vector.data[i] + vector.vector.data[i];
        }

        return newVector;
    }

    minus(vector: VectorImpl): VectorImpl{

        if( !this.isSameLength([this,vector])) throw new Error('vectors must be of the same length');

        let newVector: VectorImpl = new VectorImpl();

        newVector.vector.dimension = this.vector.dimension;

        for( let i = 0; i < this.vector.dimension; i++ ){
            newVector.vector.data[i] = this.vector.data[i] - vector.vector.data[i];
        }

        return newVector;
    }

    put(index: number, value: number){
        if( index < 0 || index > this.vector.dimension  ) throw new Error('illegal index');
        this.vector.data[index] = value;
    }

    magnitude(): number{
        return Math.sqrt( this.dot(this) );
    }

    distance(vector: VectorImpl): number{
        if( !this.isSameLength([this,vector])) throw new Error('vectors must be of the same length');
        return  this.minus(vector).magnitude();
    }

    cartesian(index: number): number{
        return this.vector.data[index];
    }

    scale(scalar: number): VectorImpl{
        let newVector: VectorImpl = new VectorImpl();
        newVector.vector.dimension = this.vector.dimension;

        for( let i = 0; i < this.vector.dimension; i++ ){
            newVector.vector.data[i] = round(scalar * this.vector.data[i] ,5);
        }

        return newVector;
    }

    unit(): VectorImpl{
        if( this.magnitude() === 0 ) throw new Error('zero-vector has no direction');
        return this.scale( 1.0 / this.magnitude() );
    }

    isSameLength(x: VectorImpl): boolean;
    isSameLength(x: VectorImpl[]): boolean;

    isSameLength(x: VectorImpl | VectorImpl[]): boolean{

        if( x instanceof VectorImpl ){
            return this.vector.dimension === x.vector.dimension;
        }

        if( x instanceof Array && x[0] instanceof VectorImpl ){

            if( x.length < 1 ) throw new Error('need at least one vector to check for length equivalency');

            for( let i = 0; i < x.length; i++ ){
                if( this.vector.dimension !== x[i].vector.dimension ) return false;
            }

            return true;
        }

    }


    //statics
    static setWithSingleValue(dimension: number, value: number): VectorImpl{
        let data: number[] = [];

        for( let i = 0; i < dimension; i++ ){
            data[i] = value;
        }

        return new VectorImpl(data);
    }

    static zeros(dimension: number): VectorImpl{
        return VectorImpl.setWithSingleValue(dimension,0);
    }

    static ones(dimension: number): VectorImpl{
        return VectorImpl.setWithSingleValue(dimension,1);
    }

    static gen(from: number, to: number, by?: number): VectorImpl{
        let data: number[] = [];
        let currentValue: number = from;
        let index = 0;

        const decimalPart = by ? by.toString().split('.')[1] : '';
        const precision = by !== null && by !== undefined ? ( decimalPart ? decimalPart.length : 1 ) : 0;

        while( currentValue < to ){

            let value = index === 0 ? round(currentValue, 0) :
                ( precision !== 0 ? round(currentValue += by, precision) : round(currentValue += 1, precision) );

            if( value > to ) break;

            data[index] = value;

            index++;
        }

        return new VectorImpl(data);
    }


    //privates
    private createEmpty(){
        this.vector = { dimension: 0, data: [] };
    }

}