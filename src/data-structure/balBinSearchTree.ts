import {SearchTree} from "./searchTree";
import {BalancedTreeNode} from "./node";
import {compare} from "../util/compare";

/*
 This is an implementation of a left leaning RED-BLACK (Self Balancing) Binary Search Tree with Key/Value Pairs data structure.
 */

export class BalancedBinSearchTree<V> extends SearchTree<V>{

    private static red: boolean = true;
    private static black: boolean = false;

    protected root: BalancedTreeNode<V>;

    constructor(){
        super();
    }

    put(key: number | string, value: V){
        super.put(key,value);
        this.root.color = BalancedBinSearchTree.black;
    }

    remove(key: number | string){
        if (key === null || key === undefined) throw new Error("Called delete() with a null key");
        if( !this.contains(key) ) return;

        if( !this.isNodeRed(<BalancedTreeNode<V>> this.root.left) && !this.isNodeRed(<BalancedTreeNode<V>> this.root.right) ) this.root.color = BalancedBinSearchTree.red;

        this.root = this.removeInNodeAtKey(this.root, key);

        if( !this.isEmpty() ) this.root.color = BalancedBinSearchTree.black;
    }

    removeMin(){
        if (this.isEmpty()) throw new Error("Tree underflow");

        if( !this.isNodeRed(<BalancedTreeNode<V>> this.root.left) && !this.isNodeRed(<BalancedTreeNode<V>> this.root.right) ) this.root.color = BalancedBinSearchTree.red;

        this.root = this.removeMinNodeFrom(this.root);

        if( !this.isEmpty() ) this.root.color = BalancedBinSearchTree.black;
    }

    removeMax(){
        if (this.isEmpty()) throw new Error("Tree underflow");

        if( !this.isNodeRed(<BalancedTreeNode<V>> this.root.left) && !this.isNodeRed(<BalancedTreeNode<V>> this.root.right) ) this.root.color = BalancedBinSearchTree.red;

        this.root = this.removeMaxNodeFrom(this.root);

        if( !this.isEmpty() ) this.root.color = BalancedBinSearchTree.black;
    }

    //todo: checks for binary tree assertions. will be static functions so can be used without instantiation

    //private / protected functions

    private isNodeRed(node: BalancedTreeNode<V>){
        if(node === null) return false;
        return node.color === BalancedBinSearchTree.red;
    }

    getFromNodeAtKey(node: BalancedTreeNode<V>, key: number | string): V{
        while(node !== null){
            let _compare = compare(key,node.key);

            if( _compare < 0 ) node = <BalancedTreeNode<V>> node.left;
            else if( _compare > 0 ) node = <BalancedTreeNode<V>> node.right;
            else return node.value;
        }
        return null;
    }

    removeInNodeAtKey(node: BalancedTreeNode<V>, key: number | string): BalancedTreeNode<V> {
        if ( compare(key,node.key) < 0 )  {
            if (!this.isNodeRed(<BalancedTreeNode<V>> node.left) && !this.isNodeRed(<BalancedTreeNode<V>> node.left.left))
                node = this.moveRedLeft(node);
            node.left = this.removeInNodeAtKey(<BalancedTreeNode<V>> node.left, key);
        }
        else {
            if (this.isNodeRed(<BalancedTreeNode<V>> node.left))
                node = this.rotateNodeRight(node);
            if (compare(key,node.key) == 0 && (node.right == null))
                return null;
            if (!this.isNodeRed(<BalancedTreeNode<V>> node.right) && !this.isNodeRed(<BalancedTreeNode<V>> node.right.left))
                node = this.moveRedRight(node);
            if (compare(key,node.key) == 0) {
                let minNode = this.getMinNodeFrom(node.right);
                node.key = minNode.key;
                node.value = minNode.value;
                node.right = this.removeMinNodeFrom(<BalancedTreeNode<V>> node.right);
            }
            else node.right = this.removeInNodeAtKey(<BalancedTreeNode<V>> node.right, key);
        }
        return this.balance(node);
    }

    putInNodeAtKey(node: BalancedTreeNode<V>, key: number | string, value: V) : BalancedTreeNode<V>{
        if(key === null || key === undefined) throw new Error("Called put() with a null key");
        if(node === null || node === undefined) return { key: key, value: value, left: null, right: null, color: BalancedBinSearchTree.red, size: 1 };

        let _compare = compare(key,node.key);

        if( _compare < 0 ) node.left = this.putInNodeAtKey(<BalancedTreeNode<V>> node.left,key,value);
        else if( _compare > 0 ) node.right =  this.putInNodeAtKey(<BalancedTreeNode<V>> node.right,key,value);
        else node.value = value;

        if( this.isNodeRed(<BalancedTreeNode<V>> node.right) && !this.isNodeRed(<BalancedTreeNode<V>> node.left) ) node = this.rotateNodeLeft(node);
        if( this.isNodeRed(<BalancedTreeNode<V>> node.left) && this.isNodeRed(<BalancedTreeNode<V>> node.left.left) ) node = this.rotateNodeRight(node);
        if( this.isNodeRed(<BalancedTreeNode<V>> node.left) && this.isNodeRed(<BalancedTreeNode<V>> node.right) ) this.flipColors(node);

        node.size = this.sizeOfNode(node.left) + this.sizeOfNode(node.right) + 1;

        return node;
    }

    removeMinNodeFrom(node: BalancedTreeNode<V>): BalancedTreeNode<V>{
        if(node.left === null) return null;

        if( !this.isNodeRed(<BalancedTreeNode<V>> node.left) && !this.isNodeRed(<BalancedTreeNode<V>> node.left.left) ) node = this.moveRedLeft(node);

        node.left = this.removeMinNodeFrom(<BalancedTreeNode<V>> node.left);
        return this.balance(node);
    }

    removeMaxNodeFrom(node: BalancedTreeNode<V>): BalancedTreeNode<V>{
        if( this.isNodeRed(<BalancedTreeNode<V>> node.left) ) node = this.rotateNodeRight(node);

        if(node.right === null) return null;

        if( !this.isNodeRed(<BalancedTreeNode<V>> node.right) && !this.isNodeRed(<BalancedTreeNode<V>> node.right.left) ) node = this.moveRedRight(node);

        node.right = this.removeMaxNodeFrom(<BalancedTreeNode<V>> node.right);
        return this.balance(node);
    }

    private rotateNodeRight(node: BalancedTreeNode<V>): BalancedTreeNode<V>{

        let leftToRightLeanNode = <BalancedTreeNode<V>> node.left;

        node.left = leftToRightLeanNode.right;
        leftToRightLeanNode.right = node;

        node.color = BalancedBinSearchTree.red;
        leftToRightLeanNode.color = node.color;

        leftToRightLeanNode.size = node.size;
        node.size = 1 + this.sizeOfNode(node.left) + this.sizeOfNode(node.right);

        return leftToRightLeanNode;
    }

    private  rotateNodeLeft(node: BalancedTreeNode<V>): BalancedTreeNode<V>{

        let rightToLeftLeanNode = <BalancedTreeNode<V>> node.right;

        node.right = rightToLeftLeanNode.left;
        rightToLeftLeanNode.left = node;

        node.color = BalancedBinSearchTree.red;
        rightToLeftLeanNode.color = node.color;

        rightToLeftLeanNode.size = node.size;
        node.size = 1 + this.sizeOfNode(node.left) + this.sizeOfNode(node.right);

        return rightToLeftLeanNode;
    }

    private flipColors(node: BalancedTreeNode<V>){
        node.color = !node.color;
        (<BalancedTreeNode<V>> node.left).color = !(<BalancedTreeNode<V>> node.left).color;
        (<BalancedTreeNode<V>> node.right).color = !(<BalancedTreeNode<V>> node.right).color;
    }

    private moveRedLeft(node: BalancedTreeNode<V>): BalancedTreeNode<V>{
        this.flipColors(node);
        if( this.isNodeRed(<BalancedTreeNode<V>> node.right.left) ){
            node.right = this.rotateNodeRight(<BalancedTreeNode<V>> node.right);
            node = this.rotateNodeLeft(node);
            this.flipColors(node);
        }
        return node;
    }

    private moveRedRight(node: BalancedTreeNode<V>): BalancedTreeNode<V>{
        this.flipColors(node);
        if( this.isNodeRed(<BalancedTreeNode<V>> node.left.left) ){
            node = this.rotateNodeRight(node);
            this.flipColors(node);
        }
        return node;
    }

    private balance(node: BalancedTreeNode<V>): BalancedTreeNode<V>{

        if (this.isNodeRed(<BalancedTreeNode<V>> node.right)) node = this.rotateNodeLeft(node);
        if (this.isNodeRed(<BalancedTreeNode<V>> node.left) && this.isNodeRed(<BalancedTreeNode<V>> node.left.left)) node = this.rotateNodeRight(node);
        if (this.isNodeRed(<BalancedTreeNode<V>> node.left) && this.isNodeRed(<BalancedTreeNode<V>> node.right))     this.flipColors(node);

        node.size = this.sizeOfNode(node.left) + this.sizeOfNode(node.right) + 1;
        return node;
    }
}