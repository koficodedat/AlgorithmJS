import { TreeNode } from "./node";
import {compare} from "../util/compare";
import {Queue} from "./queue";
import {UniIteratorImpl} from "../util/iterator";

/*
 This is an implementation of a Binary Search Tree with Key/Value Pairs data structure.
 It implements:
     isEmpty()
     size()
     contains(..)
     get(..)
     put(..)
     remove(..)
     removeMin()
     removeMax()
     minKey()
     maxKey()
     floor(..)
     ceil(..)
     rank(..)
     selectKeyForRank(..)
     keys()
     iterator()
     keysInLevelOrder()
     height()
 */


export class BinSearchTree<V>{

    private root:TreeNode<V>;

    constructor(){
        this.root = null;
    }

    isEmpty(): boolean{
        return this.size() === 0;
    }

    size(): number{
        return this.sizeOfNode(this.root);
    }

    contains(key: number | string): boolean{
        if(key === null || key === undefined) throw new Error('Argument to contains() is null');
        if(this.root !== null && typeof key === this.root.key) throw new Error('Key is of different type than root');
        return this.get(key) !== null;
    }

    get(key: number | string): V{
        return this.getFromNodeAtKey(this.root,key);
    }

    put(key: number | string, value: V){
        //Test
        if(key === null || key === undefined) throw new Error("Called put() with a null key");
        if(this.root !== null && typeof key === this.root.key) throw new Error('Key is of different type than root');
        if(value === null) {
            this.remove(key);
            return;
        }
        this.root = this.putInNodeAtKey(this.root,key,value);
    }

    remove(key: number | string){
        if (key === null || key === undefined) throw new Error("Called delete() with a null key");
        if(this.root !== null && typeof key === this.root.key) throw new Error('Key is of different type than root');
        this.root = this.removeInNodeAtKey(this.root,key);
    }

    removeMin(){
        if (this.isEmpty()) throw new Error("Tree underflow");
        return this.removeMinNodeFrom(this.root);
    }

    removeMax(){
        if (this.isEmpty()) throw new Error("Tree underflow");
        this.root = this.removeMaxNodeFrom(this.root);
    }

    minKey(): number | string{
        if (this.isEmpty()) throw new Error("Called min() with empty tree");
        else return this.getMinNodeFrom(this.root).key;
    }

    maxKey(): number | string{
        if (this.isEmpty()) throw new Error("Called min() with empty tree");
        else return this.getMaxNodeFrom(this.root).key;
    }

    floor(key: number | string): number | string{
        if(key === null || key === undefined) throw new Error("Argument to floor() is null");
        if(this.isEmpty()) throw new Error("Called min() with empty tree");

        const floorNode =  this.floorFromNodeToKey(this.root,key);

        return floorNode === null || floorNode === undefined ? null : floorNode.key;
    }

    ceil(key: number | string): number | string{
        if(key === null || key === undefined) throw new Error("Argument to floor() is null");
        if(this.isEmpty()) throw new Error("Called min() with empty tree");

        const ceilNode =  this.ceilFromNodeToKey(this.root,key);

        return ceilNode === null || ceilNode === undefined ? null : ceilNode.key;
    }

    rank(key: number | string): number{
        if (key === null || key === undefined) throw new Error("Argument to rank() is null");
        return this.rankOfKeyFromNode(key, this.root);
    }

    selectKeyForRank(rank: number): string | number{
        if( rank < 0 || rank > this.size() || rank === null ) throw new Error("Called selectKeyForRank() with invalid argument");
        return this.nodeAtRankFromNode(rank, this.root).key;
    }

    keys(): (number | string)[]{
        return this.getKeysInRange( this.minKey(), this.maxKey() );
    }

    iterator(): UniIteratorImpl<TreeNode<V>>{
        return this.getNodesInRange(this.minKey(), this.maxKey());
    }

    keysInLevelOrder(): (number | string)[]{

        let keys: Queue<number | string> = new Queue<number | string>();
        let nodes: Queue<TreeNode<V>> = new Queue<TreeNode<V>>();

        nodes.enqueue(this.root);

        while( !nodes.isEmpty() ){
            let currentNode = nodes.dequeue();

            if(currentNode === null || currentNode === undefined) continue;

            keys.enqueue( currentNode.key );
            nodes.enqueue( currentNode.left );
            nodes.enqueue( currentNode.right );
        }

        return keys.iterator().list();
    }

    height(): number{
        return this.heightFromNode( this.root );
    }

    //todo: checks for binary tree assertions. will be static functions so can be used without instantiation

    //private functions

    private sizeOfNode(node: TreeNode<V>): number{
        if(node === null || node === undefined) return 0;
        return node.size;
    }

    private getFromNodeAtKey(node: TreeNode<V>, key: number | string): V{
        if (key === null || key === undefined) throw new Error("Called getFromNodeAtKey() with a null key");
        if(this.root !== null && typeof key === this.root.key) throw new Error('Key is of different type than root');
        if (node === null || node === undefined) return null;

        let _compare = compare(key,node.key);

        if( _compare < 0 ) return this.getFromNodeAtKey(node.left,key);
        if( _compare > 0 ) return this.getFromNodeAtKey(node.right,key);

        return node.value;
    }

    private putInNodeAtKey(node: TreeNode<V>, key: number | string, value: V) : TreeNode<V>{
        if(key === null || key === undefined) throw new Error("Called put() with a null key");
        if(node === null || node === undefined) return { key: key, value: value, left: null, right: null, size: 1 };

        let _compare = compare(key,node.key);

        if( _compare < 0 ) node.left = this.putInNodeAtKey(node.left,key,value);
        else if( _compare > 0 ) node.right =  this.putInNodeAtKey(node.right,key,value);
        else node.value = value;
        node.size = this.sizeOfNode(node.left) + this.sizeOfNode(node.right) + 1;

        return node;
    }

    private removeInNodeAtKey(node: TreeNode<V>, key: number | string): TreeNode<V>{
        if(node === null || node === undefined) return null;

        let _compare = compare(key,node.key);

        if( _compare < 0 ) node.left =  this.removeInNodeAtKey(node.left,key)
        else if( _compare > 0 ) node.right =  this.removeInNodeAtKey(node.right,key);
        else{
            if( node.right === null) return node.left;
            if( node.left === null) return node.right;

            let nodeToRemove = node;
            node = this.getMinNodeFrom(node.right);
            node.right = this.removeMinNodeFrom(node.right);
            node.left = nodeToRemove.left;

        }

        node.size = this.sizeOfNode(node.left) + this.sizeOfNode(node.right) + 1;

        return node;
    }

    private getMinNodeFrom(node: TreeNode<V>): TreeNode<V>{
        if(node.left === null) return node;
        else return this.getMinNodeFrom(node.left);
    }

    private getMaxNodeFrom(node: TreeNode<V>): TreeNode<V>{
        if(node.right === null) return node;
        else return this.getMaxNodeFrom(node.right);
    }

    private removeMinNodeFrom(node: TreeNode<V>): TreeNode<V>{
        if(node.left === null) return node.right;
        node.left = this.removeMinNodeFrom(node.left);
        node.size = this.sizeOfNode(node.left) + this.sizeOfNode(node.right) + 1;
        return node;
    }

    private removeMaxNodeFrom(node: TreeNode<V>): TreeNode<V>{
        if(node.right === null) return node.left;
        node.right = this.removeMaxNodeFrom(node.right);
        node.size = this.sizeOfNode(node.left) + this.sizeOfNode(node.right) + 1;
        return node;
    }

    private floorFromNodeToKey(node: TreeNode<V>, key: number | string): TreeNode<V>{
        if(node === null || node === undefined) return null;

        let _compare = compare(key,node.key);

        if( _compare === 0 ) return node;
        if( _compare < 0 ) return this.floorFromNodeToKey(node.left, key);

        let potentialFloorNode = this.floorFromNodeToKey(node.right,key);
        if(potentialFloorNode !== null) return potentialFloorNode;

        return node;
    }

    private ceilFromNodeToKey(node: TreeNode<V>, key: number | string): TreeNode<V>{
        if(node === null || node === undefined) return null;

        let _compare = compare(key,node.key);

        if( _compare === 0 ) return node;
        if( _compare > 0 ) return this.ceilFromNodeToKey(node.right, key);

        let potentialCeilNode = this.ceilFromNodeToKey(node.left,key);
        if(potentialCeilNode !== null) return potentialCeilNode;

        return node;
    }

    private rankOfKeyFromNode(key: number | string, node: TreeNode<V>): number {
        if(node === null || node === undefined) return 0;

        let _compare = compare(key,node.key);

        if( _compare < 0 ) return this.rankOfKeyFromNode(key, node.left);
        if( _compare > 0 ) return 1 + this.sizeOfNode(node.left) + this.rankOfKeyFromNode(key, node.right);
        else return this.sizeOfNode(node.left);
    }

    private nodeAtRankFromNode(rank: number, node: TreeNode<V>): TreeNode<V>{
        if(node === null || node === undefined) return null;
        let leftSize = this.sizeOfNode(node.left);

        if( leftSize < rank ) return this.nodeAtRankFromNode(rank - leftSize - 1, node.right);
        if( leftSize > rank ) return this.nodeAtRankFromNode(rank, node.left);

        return node;

    }

    private getKeysInRange(from: number | string, to: number | string): (number | string)[]{
        if(from === null || from === undefined ) throw new Error("first argument to getKeysInRange() is null");
        if(to === null || to === undefined ) throw new Error("second argument to getKeysInRange() is null");

        let queue: Queue<number | string> = new Queue<number | string>()

        this.addKeysToQueue(this.root, queue, from, to);

        return queue.iterator().list()
    }

    private addKeysToQueue(node: TreeNode<V>, queue: Queue<number | string>, lo: number | string, hi: number | string ): void{
        if(node === null || node === undefined) return;

        let _comparelo = compare(lo, node.key);
        let _comparehi = compare(hi, node.key);

        if( _comparelo < 0 ) this.addKeysToQueue(node.left, queue, lo, hi);
        if( _comparelo <= 0 && _comparehi >= 0) queue.enqueue(node.key);
        if( _comparehi > 0 ) this.addKeysToQueue(node.right, queue, lo, hi);
    }

    private getNodesInRange(from: number | string, to: number | string): UniIteratorImpl<TreeNode<V>>{
        if( from === null || from === undefined) throw new Error("first argument to getNodesInRange() is null");
        if( to === null || to === undefined) throw new Error("second argument to getNodesInRange() is null");

        let queue: Queue<TreeNode<V>> = new Queue<TreeNode<V>>()

        this.addNodesToQueue(this.root, queue, from, to);

        return queue.iterator();
    }

    private addNodesToQueue(node: TreeNode<V>, queue: Queue<TreeNode<V>>, lo: number | string, hi: number | string ): void{
        if(node === null || node === undefined) return;

        let _comparelo = compare(lo, node.key);
        let _comparehi = compare(hi, node.key);

        if( _comparelo < 0 ) this.addNodesToQueue(node.left, queue, lo, hi);
        if( _comparelo <= 0 && _comparehi >= 0) queue.enqueue(node);
        if( _comparehi > 0 ) this.addNodesToQueue(node.right, queue, lo, hi);
    }

    private heightFromNode(node: TreeNode<V>): number{
        if(node === null || node === undefined) return -1;
        return 1 + Math.max( this.heightFromNode(node.left), this.heightFromNode(node.right) );
    }

}