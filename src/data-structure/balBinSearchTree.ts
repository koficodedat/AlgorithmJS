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
        if ( key === null || key === undefined ) throw new Error("called remove() with a null key");
        if ( this.root !== null && (typeof key) !== (typeof this.root.key) ) throw new Error('remove(..): key is of different type than root');
        if ( !this.contains(key) ) return;

        if( !BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> this.root.left) && !BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> this.root.right) ) this.root.color = BalancedBinSearchTree.red;

        this.root = this.removeInNodeAtKey(this.root, key);

        if( !this.isEmpty() ) this.root.color = BalancedBinSearchTree.black;
    }

    removeMin(){
        if (this.isEmpty()) throw new Error("tree underflow");

        if( !BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> this.root.left) && !BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> this.root.right) ) this.root.color = BalancedBinSearchTree.red;

        this.root = this.removeMinNodeFrom(this.root);

        if( !this.isEmpty() ) this.root.color = BalancedBinSearchTree.black;
    }

    removeMax(){
        if (this.isEmpty()) throw new Error("tree underflow");

        if( !BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> this.root.left) && !BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> this.root.right) ) this.root.color = BalancedBinSearchTree.red;

        this.root = this.removeMaxNodeFrom(this.root);

        if( !this.isEmpty() ) this.root.color = BalancedBinSearchTree.black;
    }

    //todo: checks for binary tree assertions. will be static functions so can be used without instantiation

    //private / protected functions

    private static isNodeRed<V>(node: BalancedTreeNode<V>){
        if(node === null) return false;
        return node.color === BalancedBinSearchTree.red;
    }

    getFromNodeAtKey(node: BalancedTreeNode<V>, key: number | string): V{
        if (key === null || key === undefined) throw new Error("called getFromNodeAtKey() with a null key");
        if (this.root !== null && typeof key === this.root.key) throw new Error('key is of different type than root');
        if (node === null || node === undefined) return null;

        let _compare = !this.shouldParseToFloat ? compare(key,node.key) : compare(BalancedBinSearchTree.parseFloat(key),BalancedBinSearchTree.parseFloat(node.key));

        if( _compare < 0 ) return this.getFromNodeAtKey(<BalancedTreeNode<V>> node.left,key);
        if( _compare > 0 ) return this.getFromNodeAtKey(<BalancedTreeNode<V>> node.right,key);

        return node.value;
    }

    removeInNodeAtKey(node: BalancedTreeNode<V>, key: number | string): BalancedTreeNode<V> {
        if(node === null || node === undefined) return null;

        const _compare = !this.shouldParseToFloat ? compare(key,node.key) : compare(BalancedBinSearchTree.parseFloat(key),BalancedBinSearchTree.parseFloat(node.key));

        if ( _compare < 0 )  {
            if (!BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> node.left) && !BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> node.left.left))
                node = BalancedBinSearchTree.moveRedLeft(node);
            node.left = this.removeInNodeAtKey(<BalancedTreeNode<V>> node.left, key);
        }
        else {

            if (BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> node.left)) node = BalancedBinSearchTree.rotateNodeRight(node);
            if (_compare === 0 && node.right === null) return null;
            if (!BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> node.right) && !BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> node.right.left))
                node = BalancedBinSearchTree.moveRedRight(node);
            if (_compare === 0) {
                let minNode = this.getMinNodeFrom(node.right);
                node.key = minNode.key;
                node.value = minNode.value;
                node.right = this.removeMinNodeFrom(<BalancedTreeNode<V>> node.right);
            }
            else node.right = this.removeInNodeAtKey(<BalancedTreeNode<V>> node.right, key);
        }
        return BalancedBinSearchTree.balance(node);
    }

    putInNodeAtKey(node: BalancedTreeNode<V>, key: number | string, value: V) : BalancedTreeNode<V>{
        if(node === null || node === undefined) return { key: key, value: value, left: null, right: null, color: BalancedBinSearchTree.red, size: 1 };

        let _compare = !this.shouldParseToFloat ? compare(key,node.key) : compare(BalancedBinSearchTree.parseFloat(key),BalancedBinSearchTree.parseFloat(node.key));

        if( _compare < 0 ) node.left = this.putInNodeAtKey(<BalancedTreeNode<V>> node.left,key,value);
        else if( _compare > 0 ) node.right =  this.putInNodeAtKey(<BalancedTreeNode<V>> node.right,key,value);
        else node.value = value;

        if( BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> node.right) && !BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> node.left) ) node = BalancedBinSearchTree.rotateNodeLeft(node);
        if( BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> node.left) && BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> node.left.left) ) node = BalancedBinSearchTree.rotateNodeRight(node);
        if( BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> node.left) && BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> node.right) ) BalancedBinSearchTree.flipColors(node);

        node.size = BalancedBinSearchTree.sizeOfNode(node.left) + BalancedBinSearchTree.sizeOfNode(node.right) + 1;

        return node;
    }

    removeMinNodeFrom(node: BalancedTreeNode<V>): BalancedTreeNode<V>{
        if(node.left === null) return null;

        if( !BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> node.left) && !BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> node.left.left) ) node = BalancedBinSearchTree.moveRedLeft(node);

        node.left = this.removeMinNodeFrom(<BalancedTreeNode<V>> node.left);
        return BalancedBinSearchTree.balance(node);
    }

    removeMaxNodeFrom(node: BalancedTreeNode<V>): BalancedTreeNode<V>{
        if( BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> node.left) ) node = BalancedBinSearchTree.rotateNodeRight(node);

        if(node.right === null) return null;

        if( !BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> node.right) && !BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> node.right.left) ) node = BalancedBinSearchTree.moveRedRight(node);

        node.right = this.removeMaxNodeFrom(<BalancedTreeNode<V>> node.right);
        return BalancedBinSearchTree.balance(node);
    }

    private static rotateNodeRight<V>(node: BalancedTreeNode<V>): BalancedTreeNode<V>{
        if( node === null || node === undefined ) throw new Error("called rotateNodeRight(..) with a null key");

        let leftToRightLeanNode = <BalancedTreeNode<V>> node.left;
        node.left = leftToRightLeanNode.right;
        leftToRightLeanNode.right = node;
        leftToRightLeanNode.color = (<BalancedTreeNode<V>> leftToRightLeanNode.right).color;
        (<BalancedTreeNode<V>> leftToRightLeanNode.right).color = BalancedBinSearchTree.red;
        leftToRightLeanNode.size = node.size;
        node.size = BalancedBinSearchTree.sizeOfNode(node.left) + BalancedBinSearchTree.sizeOfNode(node.right) + 1;

        return leftToRightLeanNode;
    }

    private static rotateNodeLeft<V>(node: BalancedTreeNode<V>): BalancedTreeNode<V>{
        if( node === null || node === undefined ) throw new Error("called rotateNodeLeft(..) with a null key");

        let rightToLeftLeanNode = <BalancedTreeNode<V>> node.right;
        node.right = rightToLeftLeanNode.left;
        rightToLeftLeanNode.left = node;
        rightToLeftLeanNode.color = (<BalancedTreeNode<V>> rightToLeftLeanNode.left).color;
        (<BalancedTreeNode<V>> rightToLeftLeanNode.left).color = BalancedBinSearchTree.red;
        rightToLeftLeanNode.size = node.size;
        node.size = BalancedBinSearchTree.sizeOfNode(node.left) + BalancedBinSearchTree.sizeOfNode(node.right) + 1;

        return rightToLeftLeanNode;
    }

    private static flipColors<V>(node: BalancedTreeNode<V>){
        node.color = !node.color;
        (<BalancedTreeNode<V>> node.left).color = !(<BalancedTreeNode<V>> node.left).color;
        (<BalancedTreeNode<V>> node.right).color = !(<BalancedTreeNode<V>> node.right).color;
    }

    private static moveRedLeft<V>(node: BalancedTreeNode<V>): BalancedTreeNode<V>{
        if( node === null || node === undefined ) throw new Error("called moveRedLeft(..) with a null key");
        if( BalancedBinSearchTree.isNodeRed(node) &&
            !BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> node.left) &&
            !BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> node.left.left) ){

            BalancedBinSearchTree.flipColors(node);
            if( BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> node.right.left) ){
                node.right = BalancedBinSearchTree.rotateNodeRight(<BalancedTreeNode<V>> node.right);
                node = BalancedBinSearchTree.rotateNodeLeft(node);
                BalancedBinSearchTree.flipColors(node);
            }

        }

        return node;
    }

    private static moveRedRight<V>(node: BalancedTreeNode<V>): BalancedTreeNode<V>{
        if( node === null || node === undefined ) throw new Error("called moveRedRight(..) with a null key");
        if( BalancedBinSearchTree.isNodeRed(node) &&
            !BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> node.right) &&
            !BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> node.right.left) ){

            BalancedBinSearchTree.flipColors(node);
            if( BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> node.left.left) ){
                node = BalancedBinSearchTree.rotateNodeRight(node);
                BalancedBinSearchTree.flipColors(node);
            }

        }

        return node;
    }

    private static balance<V>(node: BalancedTreeNode<V>): BalancedTreeNode<V>{
        if( node === null || node === undefined ) throw new Error("called moveRedRight(..) with a null key");

        if (BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> node.right)) node = BalancedBinSearchTree.rotateNodeLeft(node);
        if (BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> node.left) && BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> node.left.left)) node = BalancedBinSearchTree.rotateNodeRight(node);
        if (BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> node.left) && BalancedBinSearchTree.isNodeRed(<BalancedTreeNode<V>> node.right))     BalancedBinSearchTree.flipColors(node);

        node.size = BalancedBinSearchTree.sizeOfNode(node.left) + BalancedBinSearchTree.sizeOfNode(node.right) + 1;
        return node;
    }
}