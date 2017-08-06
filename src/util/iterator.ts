import { UniNode } from '../data-structure/node';

/*
 This file contains the various elements needed
 to implement a Uni and Bi Directional Iterator
 It houses the various functions defined in generic Iterators
*/


/*
 UniIterator Interface
 Extends es6 Iterator Interface
 */

export interface UniIterator<T> extends Iterator<T>{
    hasNext(): boolean;
    remove(): void;
    list(): T[];
}


/*
 BiIterator Interface
 Extends UniIterator Interface
 */

export interface BiIterator<T> extends UniIterator<T>{
    add(item: T);
    hasPrevious(): boolean;
    previous(): T;
    nextIndex(): number;
    previousIndex(): number;
    set(item: T);
}


/*
 UniIterator Interface Implementation
 */

export class UniIteratorImpl<T> implements UniIterator<T>{

    private current: UniNode<T>;
    private base: UniNode<T>;
    private size: number;
    private mayRemove: boolean;
    private currentIndex: number;

    constructor(node: UniNode<T>, size: number){

        if( node === null ) throw Error('node is null or undefined');
        if( size === null || size < 0 ) throw Error('node size is null or undefined');

        else {
            this.current = <UniNode<T>> new Object(node);
            this.base = <UniNode<T>> new Object(node);
            this.size = size;
            this.currentIndex = -1;
            this.mayRemove = false;
        }
    }

    next(): T{
        let item: T = null;
        if( this.hasNext() ){
            this.mayRemove = true;
            item = this.current.item;

            this.current = this.current.next;
            this.currentIndex += 1;

            return item;
        }else {
            this.currentIndex = -1;
            throw new Error('iterator underflow');
        }
    }

    hasNext(): boolean{
        return this.current !== null;
    }

    remove(): void{

        if( !this.mayRemove ){
            throw Error('need to call next() before remove()');
        }else if( this.currentIndex === -1 ){
            throw Error('nothing to iterate on hence nothing to remove');
        }else if( this.currentIndex === 0 ){
            this.base = this.base.next;
        }
        else {
            let count = 0;
            let newNode: UniNode<T> = null;

            let nodeToIterateOn: UniNode<T> = this.base;
            let potentialNodeToDelete: UniNode<T>;

            do{
                newNode ? newNode.next = { item: nodeToIterateOn.item , next: null } : newNode = { item: nodeToIterateOn.item , next: null };
                nodeToIterateOn = nodeToIterateOn.next;
                potentialNodeToDelete = { item: nodeToIterateOn.item , next: null };

                count++;
            }while( count < this.currentIndex - 1 );

            if( nodeToIterateOn.next !== null ){
                newNode.next = nodeToIterateOn.next;
            }

            potentialNodeToDelete = null;
            this.base = newNode;
            this.mayRemove = false;
        }

        this.currentIndex -= 1;
        this.size -= 1;

    }

    list(): T[] {

        let array: T[] = [];

        if( this.base !== null ){

            let nodeToIterateOn: UniNode<T> = this.base;

            for( let i = 0; i < this.size; i++ ){
                array[i] = nodeToIterateOn.item;
                nodeToIterateOn = nodeToIterateOn.next;
            }

        }

        return array;
    }

}