import { UniNode } from './node';
import { UniIteratorImpl } from "../util/iterator";

/*
 This is an implementation of a Queue data structure.
 It implements:
     createEmpty()
     size()
     peek()
     enqueue(..)
     dequeue()
     iterator()
 */

export class Queue<T>{

    private first: UniNode<T>;
    private last: UniNode<T>;
    private queueSize: number;

    constructor(){
        this.first = null;
        this.last = null;
        this.queueSize = 0;
    }

    isEmpty(): boolean{
        return this.first === undefined || this.first === null;
    }

    size(): number{
        return this.queueSize;
    }

    peek(): T{
        if( this.isEmpty() ) throw new Error('queue underflow exception');
        return this.first.item;
    }

    enqueue(item: T): void{
        let oldLast: UniNode<T> = this.last;
        this.last = { item: item, next: null };

        if( this.isEmpty() ) this.first = this.last;
        else oldLast.next = this.last;

        this.queueSize += 1;
    }

    dequeue(): T{
        let itemToDequeue: T;
        if( this.isEmpty() ) throw new Error('queue underflow exception');

        itemToDequeue = this.first.item;
        this.first = this.first.next;

        if( this.isEmpty() ) this.last = null;

        this.queueSize -= 1;

        return itemToDequeue;
    }

    iterator(): UniIteratorImpl<T>{
        return new UniIteratorImpl(this.first, this.queueSize);
    }
}