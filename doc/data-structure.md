#### Data Structure
    This package consiste of simple to complex data structures that can be used to 
    build/use medium to large sets of data in an efficient way.
    
    All class instantiations extend from root: el.
    
#### Class
    All but the Vector, Matrix and Dictionary data structure defined below implement 
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
        var v = new el.Vector([1,2,3]);
    Fuctions:
    
        Removed Functions:
        - initVecWithArray([ number, ]): void @since 1.0.25
        - zeroVec(number): void @since 1.0.25
    
        Added Functions:
        - set([ number, ]): Vector. formerly initVecWithArray(..). initialize a vector with an Array parameter.
        - vec(): Vector returns the Vector
        - put(index, value): void
        - isSameLength( Vector | Vector[] ): void. checks to see if the Vectors parameters have the same length as the current vector
        
                    var v = el.Vector;
                    var v1 = v.zeros(2); // { vector: { dimension: 2, data: [ 0, 0 ] } }
                    var v2 = v.ones(2); // { vector: { dimension: 2, data: [ 1, 1 ] } }
                    var v3 = v.setWithSingleValue(2, 3); // { vector: { dimension: 2, data: [ 2, 2, 2 ] } }
                    var v4 = v.gen(1,5,2); // { vector: { dimension: 2, data: [ 1, 3, 5 ] } }
                    var v5 = new el.Vector([ 3, 4, 5 ]); // { vector: { dimension: 3, data: [ 3, 4, 5 ] } }
                    var v4 = new el.Vector();  // { vector: { dimension: 0, data: [ ] } }
                    
                    v1.isSameLength(v2) // true
                    v1.isSameLength([v2,v3]) // false
                 
        - @static zeros(number): Vector. formerly zeroVec(..). initialize an n dimensional vector with zero values. n is the number of dimensions
        - @static ones(number): Vector. initialize an n dimensional vector with all values being 1. n is the number of dimensions
        - @static setWithSingleValue(number, dimension): Vector. initialize an n dimensional vector with a single number.
        - @static gen(from, to, by?): Vector. initialize a vector by generating a series of number inclusive between two numbers in increment of either 1 or the ooptional by provided.

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
        
_Matrix_
    
    Instantiation:
        var m = new el.Matrix();                : empty initilization
        var m = new el.Matrix(2,2,[1,0,0,1]);   : initialize a 2x2 matrix with array values 1,0,0,1
    Fuctions:
    
        Added Functions:
        - mat(): Matrix. returns the Matrix
        - createEmpty(): Matrix. initialize a 0 x 0 empty matrix
        - set( rowDim, colDim, [ number, ]): Matrix. initialize a rowDim x colDim matrix with array values provided.
        - row( number ): Vector. returns a row vector of the row number passed.
        - col( number ): Vector. returns a column vector of the row number passed.
        - val(row, col  ): number. returns the value situated at the row x col index in the current matrix.
        - seek( row, col ): boolean. 'seeks' for the existence of a value a particular row x column combination in the current matrix.
        - diag( row, col  ): Vector. returns a left to right diagonal vector from the row number passed in of teh current matrix.
        - antiDiag(row, col ): Vector. returns a right to left diagonal vector from the row number passed in of teh current matrix.
        - isSquare(): boolean. checks if the current matrix is a square matrix.
        - isIdentity(): boolean. checks if the current matrix is an indentity matrix.
        - isReversible(): boolean. checks if the current matrix is reversible.
        - isEmpty(): boolean. checks if the current matrix is empty.
        - extendRow( Matrix ): Matrix. appends the passed matrix row wise to the current matrix.
        - extendColumn( Matrix ): Matrix. appends the passed matrix column wise to the current matrix.
        - some( fromRow, fromColumn, dimension: [ number, number ] ): Matrix. returns a matrix from index fromRow and fromColumn by the passed in dimension of the current dimension.
        
        - @static zeros( row, col ): Matrix. returns a row x col matrix with zero values.
        - @static ones( row, col ): Matrix. returns a row x col matrix with all values being 1.
        - @static randBi( row, col ): Matrix. returns a row x col matrix with all values between 0 and 1.
        - @static rand( row, col, upto ): Matrix. returns a row x col matrix with uniform values between 0 and the optional upto. upto is 1 by defualt.
        - @static ident( row, col ): Matrix. returns a row x col (sometimes pseudo) identity matrix. it does not have to be a square matrix. 
          the dimensions do not have to conform to a square matrix. however, it will fail the isIdentity check if the dimensions are not the same.
        - @static inv( Matrix ): Matrix. returns the inverse of a square matrix passed in. 
        
    Base Functions:
        - scale( number ): Matrix. returns a scaled version of the Matrix by the number passed.
        - plus( Matrix ): Matrix. returns a matrix sum of the current matrix and the one passed.
        - minus( Matrix ): Matrix. returns a matrix difference between the current matrix and the one passed.
        - times( Matrix ): Matrix. returns a matrix multiplication of the current matrix and the one passed.
        - tpose(): Matrix. returns a transpose of the current matrix.
        - det(): number. returns a determinant of the current matrix.
        
_Dictionary_
    
    Instantiation:
        var d = new el.Dictionary();       : empty initilization
        var d = new el.Dictionary(1);      : empty initilization with 1 element restriction
        var d = new el.Dictionary(10);     : empty initilization with 10 elements restriction
    Fuctions:
        hasKey(key: number | string | boolean): boolean.
        add(key: number | string | boolean, value: any): void.
        remove(key:  number | string | boolean): void.
        get(key:  number | string | boolean): any.
        keys(): any. nb. any can be either number, string or  boolean.
        values(): any.
        clear(): void.
        size(): number.
        isEmpty(): boolean.
        setRestrict(restrict: number): void