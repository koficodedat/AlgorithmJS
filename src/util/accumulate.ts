/*
 @since 1.0.28
 accumulate(..)
 calculates the mean, variance and standard deviation of a series of numbers from an array or a file system path
 @param: { source } string | number[]
 @param: { callback } Function
 */

import {isNothing} from "./isNothing";
import {ICallback} from "../interfaces/iCallback";

const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const Rx = require('rxjs/Rx');


export function accumulate(source: number[] | string, callback: ICallback ): void {

    let data : IAccumulator = {
        processed: 0,
        mu: 0,
        sum: 0
    };

    if (!isNothing(source)) {

        if (source instanceof Array) {

            Rx.Observable
                .from(source)
                .do(
                    value => {
                        data = run(value, data);
                    },
                    err => {
                        callback(new Error(err));
                    },
                    () => {
                        callback(null, {
                            mean: data.mu,
                            variance: variance(data),
                            std: std(data),
                            processed: data.processed
                        });
                    }
                )
                .subscribe();

        } else {
            const readStream = fs.createReadStream(source, 'utf8');
            const rl = readline.createInterface(readStream, {});

            Rx.Observable
                .fromEvent(rl, 'line')
                .takeUntil(Rx.Observable.fromEvent(rl, 'close'))
                .do(
                    value => {
                        const splits = value.split(/[^0-9]/g);

                        splits.forEach(
                            (number) => {
                                if (!isNaN(parseFloat(number))) {
                                    data = run(parseFloat(number), data);
                                }
                            }
                        );
                    },
                    err => {
                        callback(new Error(err));
                    },
                    () => {
                        callback(null, {
                            mean: data.mu,
                            variance: variance(data),
                            std: std(data),
                            processed: data.processed
                        });
                    }
                )
                .subscribe();
        }
    }
}

function run( value: number, data: IAccumulator ): IAccumulator{

    const delta = value - data.mu;
    data.processed++;
    data.mu = delta / data.processed;
    data.sum = data.sum + (data.processed - 1) / data.processed * delta * delta;

    return data;
}

function variance( data: IAccumulator ): number{
    if (data.processed <= 1) return NaN;
    return data.sum / (data.processed - 1);
}

function std( data ): number{
    return Math.sqrt(variance(data));
}

interface IAccumulator{
    processed: number,
    mu: number,
    sum: number
}