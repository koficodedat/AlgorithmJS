# El-gorithm 
Library for algorithms used to manipulate data:

It will contain many useful tools for data manipulation:
  Data Structures
  Search Algorithms
  Sort Algorithms
  Other useful utilities
  
 ## Start:
 	npm install el-gorithm
	....
	var el = require('el-gorithm');
	
 ##### [Run El-gorithm Demo](https://npm.runkit.com/el-gorithm)

 ##### [El-gorithm NPM](https://www.npmjs.com/package/el-gorithm)
  
 ## Utility
 #### _arraySum([ number, ])_: Function{} 
 	sums the data in a numeric array
 #### _average([ number, ])_: Function{} 
 	averages the data in a numeric array
 #### _compare( first: T, second: T)_: Function{} T = number | string
 	compares two arguments for equality
 #### _inversions([ T, ])_: Function{} T = number | string
 	determines the number of swaps required to sort an array of number or string objects
 #### _isSorted([ T, ])_: Function{} T = number | string
 	check if an array of numbers or strings are sorted
 #### _shuffle([ T, ])_: Function{} T = number | string
 	uniformly shuffles an array of numbers or strings
 #### _ranSeq(howMany: number, from: number, to: number, shouldExcludeEnds (default = false): boolean?)_: Function{} 
 	gives a sequence of uniform randomly generated numbers in an array based on how many is requested
 #### _swapInArray(firstIndex: number, secondIndex: number, array: [ T, ])_: Function{} T = number | string. *Returns nothing.
 	swaps the values at given index in an array
	* might take this out if feedback of usage is less to none
 #### _uniform(first: number, second: number)_: Function{}
 	gives a uniform random number between two numbers
 		
 	
 ## Sort
 #### _binarySort([ T, ])_: Function{} T = number | string
    sorts an array of elements using binary sort, O(nlogn) in worst case
 #### _insertionSort([ T, ])_: Function{} T = number | string
    sorts an array of elements using insertion sort, O(nlog(n)) in worst case and O(1/2 n^2) on average
 #### _mergeSort([ T, ])_: Function{} T = number | string
    sorts an array of elements using merge sort, O(n2) in worst case and O(nlog(n)) on average
 #### _selectionSort([ T, ])_: Function{} T = number | string
    sorts an array of elements using selection sort, O(n2) in worst case
 #### _shellSort([ T, ])_: Function{} T = number | string
    sorts an array of elements using shell sort, O(n2) in worst case and O(nlog(n)) on average
         
 ## Data Structure
 ###	NOTE: 	All data structures defined below implement the Unidirectional Iterator except for _Vector_
 		It is done throug the .iterator() call of the respective data structures.
		The .iterator call further implements the following listed functions:
			- hasNext()
			- next()
			- remove()
			- list()
			
 ## _Bag_ : Class{} 
 ####   _Bag Data Strcuture:_
      + Implements 
        1. isEmpty() -> checks to see if there Bag has any item. returns a boolean
        2. size() -> gets the count of items in the Bag. returns a number
        3. add( T ) -> adds an item into the Bag. T = any
        4. iterator() -> iterates over the items in the Bag
 ## _Queue_ : Class{} 
 ####  _Queue Data Strcuture:_
      + Implements 
        1. isEmpty() -> checks to see if there Queue has any item. returns a boolean
        2. size() -> gets the count of items in the Queue. returns a number
        3. peek() -> 'peeks' the Queue and gives you the first element if any
        4. enqueue(T) -> adds an item to the Queue in a FIFO manner. T = any
        5. dequeue() -> removes an item from the Queue in a FIFO manner
        4. iterator() -> iterates over the items in the Queue
 ## _Stack_ : Class{} 
 ####   _Stack Data Strcuture:_
      + Implements 
        1. isEmpty() -> checks to see if there Stack has any item. returns a boolean
        2. size() -> gets the count of items in the Stack. returns a number
        3. push(T) -> adds an item to the Stack in a FILO manner. T = any
        4. pop() -> removes an item from the Stack in a FIFO manner
        5. peek() -> 'peeks' the Stack and gives you the last element if any
        6. iterator() -> iterates over the items in the Stack
 ## _Vector_ : Class{} 
 ####   _Vector Data Structure:_
 #####        added vector functions:
        1. initVec(...number) -> initialize a vector with a Rest parameter
        2. initVecWithArray(number[]) -> initialize a vector with an Array parameter
        3. zeroVec(number) -> initialize an n dimension vector with zero values. n is the number of dimensions
        4. isSameLength( Vector | Vector[] ) -> checks to see if the Vectors parameters have the same length as the current vector
        5. vec() -> returns the Vector
 #####        base vector functions:
        6. dot() -> calculates the dot product of the current vector and the one passed in
        7. plus( Vector ) -> calculates the sum of the current vector and the one passed in
        8. minus( Vector ) -> calculates the difference of the current vector and the one passed in
        9. magnitude() -> calculates the magnitude of the current vector
        10.distance() -> calculates the distance of the current vector
        11.cartesian( index ) -> gets the item at index of the current vector
        12.scale( scalar ) -> calculates the scalar value of the current vector with the scalar passed
        13.unit() -> creates a unit vector or direction of the current vector
