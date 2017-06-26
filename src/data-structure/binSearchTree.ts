import { TreeNode } from "./node";
import {compare} from "../util/compare";
import {SearchTree} from "./searchTree";

/*
 This is an implementation of a Binary Search Tree with Key/Value Pairs data structure.
 */

export class BinSearchTree<V> extends SearchTree<V>{

    protected root:TreeNode<V>;

    constructor(){
        super();
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

    //todo: checks for binary tree assertions. will be static functions so can be used without instantiation

    //private / protected functions

    getFromNodeAtKey(node: TreeNode<V>, key: number | string): V{
        if (key === null || key === undefined) throw new Error("Called getFromNodeAtKey() with a null key");
        if(this.root !== null && typeof key === this.root.key) throw new Error('Key is of different type than root');
        if (node === null || node === undefined) return null;

        let _compare = compare(key,node.key);

        if( _compare < 0 ) return this.getFromNodeAtKey(node.left,key);
        if( _compare > 0 ) return this.getFromNodeAtKey(node.right,key);

        return node.value;
    }

    putInNodeAtKey(node: TreeNode<V>, key: number | string, value: V) : TreeNode<V>{
        if(key === null || key === undefined) throw new Error("Called put() with a null key");
        if(node === null || node === undefined) return { key: key, value: value, left: null, right: null, size: 1 };

        let _compare = compare(key,node.key);

        if( _compare < 0 ) node.left = this.putInNodeAtKey(node.left,key,value);
        else if( _compare > 0 ) node.right =  this.putInNodeAtKey(node.right,key,value);
        else node.value = value;
        node.size = this.sizeOfNode(node.left) + this.sizeOfNode(node.right) + 1;

        return node;
    }

    removeInNodeAtKey(node: TreeNode<V>, key: number | string): TreeNode<V>{
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

    removeMinNodeFrom(node: TreeNode<V>): TreeNode<V>{
        if(node.left === null) return node.right;
        node.left = this.removeMinNodeFrom(node.left);
        node.size = this.sizeOfNode(node.left) + this.sizeOfNode(node.right) + 1;
        return node;
    }

    removeMaxNodeFrom(node: TreeNode<V>): TreeNode<V>{
        if(node.right === null) return node.left;
        node.right = this.removeMaxNodeFrom(node.right);
        node.size = this.sizeOfNode(node.left) + this.sizeOfNode(node.right) + 1;
        return node;
    }
}