import { UniIteratorImpl } from "../util/iterator";
import { UniNode } from './node';

/*
This is an implementation of a Bag data structure.
It implements:
    createEmpty()
    size()
    add(..)
    iterator()
 */

export class Bag<T>{

    protected first: UniNode<T>;
    private collectionSize: number;

    constructor(){
        this.first = null;
        this.collectionSize = 0;
    }

    isEmpty(): boolean{
        return this.first === null;
    }

    size(): number{
        return this.collectionSize;
    }

    add(item: T): void{
        let oldFirst: UniNode<T> = this.first;
        this.first = { item: item, next: oldFirst };
        this.collectionSize += 1;
    }

    iterator(): UniIteratorImpl<T>{
        return new UniIteratorImpl(this.first, this.collectionSize);
    }

}