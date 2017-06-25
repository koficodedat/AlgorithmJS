import { UniIteratorImpl } from "../util/iterator";
import {Bag} from "./bag";

/*
 This is an implementation of a Stack data structure.
 It implements:
     isEmpty()
     size()
     push(..)
     pop()
     peek()
     iterator()
 */

export class Stack<T> extends Bag<T>{

    constructor(){
        super();
    }

    isEmpty(): boolean{
        return super.isEmpty();
    }

    size(): number{
        return super.size();
    }

    push(item: T): void{
        super.add(item);
    }

    pop(): T{
        if( this.isEmpty() ){ console.log( 'Stack underflow exception' ); }
        let itemToReturn: T = this.first.item;
        this.first = this.first.next;
        return itemToReturn;
    }

    peek(): T{
        if( this.isEmpty() ){ console.log( 'Stack underflow exception' ); }
        return this.first.item;
    }

    iterator(): UniIteratorImpl<T>{
        return super.iterator();
    }

}