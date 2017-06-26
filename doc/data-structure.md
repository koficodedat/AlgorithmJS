#### Data Structure
    This package consiste of simple to complex data structures that can be used to 
    build/use medium to large sets of data in an efficient way.
    
    All class instantiations extend from root: el.
    
#### Class
    All but the Vector data structure defined below implement 
    the Unidirectional Iterator.
    The Iterator implements the following functions:
        - hasNext() : boolean
        - next(): T
        - remove(): void
        - list(): [T,]
                
_Bag_
    
    Instantiation:
        var bg = new el.Bag();
    Fuctions:
        isEmpty(): boolean
        size(): number
        add(T): void
        iterator(): UniIteratorImpl<T>{}
        
_Queue_
    
    Instantiation:
        var qu = new el.Queue();
    Fuctions:
        isEmpty(): boolean
        size(): number
        peek(): T. nb: 'peeks' the Queue and gives you the first element if any.
        enqueue(T): void
        dequeue(): void
        iterator(): UniIteratorImpl<T>{}
        
_Stack_
    
    Instantiation:
        var st = new el.Statck();
    Fuctions:
        isEmpty(): boolean
        size(): number
        push(T): void
        pop(): void
        peek(): T. nb: 'peeks' the Stack and gives you the first element if any.
        iterator(): UniIteratorImpl<T>{}
        
_Vector_
    
    Instantiation:
        var v = new el.Vector();
    Fuctions:
    
        Added Functions:
        - initVec(...number): void. initialize a vector with a Rest parameter
        - initVecWithArray([ number, ]): void. initialize a vector with an Array parameter
        - zeroVec(number): void. initialize an n dimensional vector with zero values. n is the number of dimensions
        - isSameLength( Vector | Vector[] ): void. checks to see if the Vectors parameters have the same length as the current vector
        
            var v1 = new el.Vector();
            var v2 = new el.Vector();
            var v3 = new el.Vector();
            
            v1.zeroVec(2) // { vector: { dimension: 2, data: [ 0, 0 ] } }
            v2.initVec(1,2) // { vector: { dimension: 2, data: [ 1, 2 ] } }
            v2.initVecWithArray([3,4,5]) // { vector: { dimension: 3, data: [ 3, 4, 5 ] } }
            
            v1.isSameLength(v2) // true
            v1.isSameLength([v2,v3]) // false
        
        - vec(): Vector returns the Vector
        
    Base Functions:
        - dot( Vector ): number
        - plus( Vector ): Vector
        - minus( Vector ): Vector
        - magnitude(): number
        - distance( Vector ): number
        - cartesian( index ): number
        - scale( scalar ): Vector
        - unit(): Vector
            
_Binary Search Tree_

    Note:
        All operations take O(logn) on average and O(n) at worst.
        It takes a memory space of O(n)
        
        This data structure is a key/value pair structure. Keys are either numbers or string and values can be any object.
    
    Instantiation:
        var bst = new el.BSearchTree();
    Fuctions:
        isEmpty(): boolean
        size(): number
        contains( key ): boolean. nb: key = number | string
        get( key ): TreeNode. nb: key = number | string
        put( key ): void. nb: key = number | string
        remove( key ): void. nb: key = number | string
        removeMin(): void
        removeMax(): void
        minKey(): number | string
        maxKey(): number | string
        floor( key ): number | string. nb: returns the closest key (less than or eqaul to) in a tree to the key passed
        ceil( key ): number | string. nb: returns the closest key (greater than or eqaul to) in a tree to the key passed
        rank( key ): number
        selectKeyForRank( rank ): number | string
        keys(): [ (number | string), ]. nb: return all keys in tree in an bottom left to right traversal (ordered)
        iterator(): UniIteratorImpl<TreeNode>{}
        keysInLevelOrder(): [ (number | string), ]. nb: return all keys in tree in a top down traversal
        height(): number
        
_Balanced Binary Search Tree_

    Note:
        This class implements a variation of the RED-BLACK (Self Balancing) Binary Search Tree.
        It is a left leaning binary tree; the height of the left side is always at most more than the right side.
        All operations take O(logn) all the time.
        It takes a memory space of O(n).
        
        This data structure is a key/value pair structure. Keys are either numbers or string and values can be any object.
        
    Instantiation:
        var bbst = new el.BBSearchTree();
    Fuctions:
        Implements all functions in the default Binary Search Tree.
        