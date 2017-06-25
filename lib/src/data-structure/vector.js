"use strict";
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
        initVec(..)
        initVecWithArray(..)
        zeroVec(..)
        isSameLength(..)
 */
exports.__esModule = true;
var VectorImpl = (function () {
    function VectorImpl() {
        this.vector = { dimension: 0, data: [] };
    }
    ;
    VectorImpl.prototype.vec = function () {
        return this.vector;
    };
    VectorImpl.prototype.initVec = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        this.vector = { dimension: values.length, data: values };
        return this;
    };
    VectorImpl.prototype.initVecWithArray = function (values) {
        this.vector = { dimension: values.length, data: values };
        return this;
    };
    VectorImpl.prototype.zeroVec = function (dimension) {
        this.vector = { dimension: dimension, data: [] };
        for (var i = 0; i < dimension; i++) {
            this.vector.data[i] = 0;
        }
        return this;
    };
    VectorImpl.prototype.dot = function (vector) {
        if (!this.isSameLength([this, vector]))
            throw new Error('Vectors must be of the same length');
        var sum = 0;
        for (var i = 0; i < this.vector.dimension; i++) {
            sum += (this.vector.data[i] * vector.vector.data[i]);
        }
        return sum;
    };
    VectorImpl.prototype.plus = function (vector) {
        if (!this.isSameLength([this, vector]))
            throw new Error('Vectors must be of the same length');
        var newVector = new VectorImpl();
        for (var i = 0; i < this.vector.dimension; i++) {
            newVector.vector.data[i] = this.vector.data[i] + vector.vector.data[i];
        }
        return newVector;
    };
    VectorImpl.prototype.minus = function (vector) {
        if (!this.isSameLength([this, vector]))
            throw new Error('Vectors must be of the same length');
        var newVector = new VectorImpl();
        for (var i = 0; i < this.vector.dimension; i++) {
            newVector.vector.data[i] = this.vector.data[i] - vector.vector.data[i];
        }
        return newVector;
    };
    VectorImpl.prototype.magnitude = function () {
        return Math.sqrt(this.dot(this));
    };
    VectorImpl.prototype.distance = function (vector) {
        if (!this.isSameLength([this, vector]))
            throw new Error('Vectors must be of the same length');
        return this.minus(vector).magnitude();
    };
    VectorImpl.prototype.cartesian = function (index) {
        return this.vector.data[index];
    };
    VectorImpl.prototype.scale = function (scalar) {
        var newVector = new VectorImpl();
        newVector.vector.dimension = this.vector.dimension;
        for (var i = 0; i < this.vector.dimension; i++) {
            newVector.vector.data[i] = scalar * this.vector.data[i];
        }
        return newVector;
    };
    VectorImpl.prototype.unit = function () {
        if (this.magnitude() === 0)
            throw new Error('Zero-vector has no direction');
        return this.scale(1.0 / this.magnitude());
    };
    VectorImpl.prototype.isSameLength = function (x) {
        if (x instanceof VectorImpl) {
            return this.vector.dimension === x.vector.dimension;
        }
        if (x instanceof Array && x[0] instanceof VectorImpl) {
            if (x.length < 1)
                throw new Error('Need at least one vectors to check for length equivalency');
            for (var i = 0; i < x.length; i++) {
                if (this.vector.dimension !== x[i].vector.dimension)
                    return false;
            }
            return true;
        }
    };
    return VectorImpl;
}());
exports.VectorImpl = VectorImpl;
