#### Utility
    This package consists of several simple to complex rudimentary functions
    used in create a manipulate data.
    Why recreate the wheel when you can get it out of the box?
    
    All function examples extend from root: el.
    
##### Functions
- _arraySum([ number, ]): number_
    > el.arraySum([1,2,3]) // 6
- _average([ number, ]): number_
    > el.average([1,2,3]) //2
- _compare(T,T): number_. nb: T = number | string 
    > el.compare(3,1) //1
- _inversions([ number, ]): number_. nb: returns the number of swaps necessary for the list to be sorted
    > el.inversions(['c','b','a']) //3
- _isSorted([ T, ]): boolean_. nb: T = number | string 
    > el.isSorted([1,2,3]) //true
- _shuffle([ T, ]): [ T, ]_. nb: t1, t2 = number | string. returns a randomly shuffled list using knuth shuffle.
    > el.shuffle(['c','b','a']) //[ 'b', 'a', 'c' ]
- _randSeq([ howMany, from, to, shouldExcludeEnds ? ]): [ number, ]_. nb: shouldExcludeEnds defaults to false. returns an array of a sequence of randomly generated numbers based on how many is requested. 
    > el.randSeq(5,2,5) // [ 4.323407772822972, 4.86791198325756, 2.672361528233111, 3.668736433386714, 4.919291748362203 ]
- _swapInArray(firstIndex, secondIndex, array): void_. 
    > el.swapInArray([ 3, 5, 7, 9 ]) //void
- _uniform(from, to): number_.. nb: returns a uniformly generated random number between two numbers 
    > el.uniform(1,3) //2.332162893374789
- _isPositive(number): boolean_. nb: checks to see if the number is positive 
    > el.isPositive(1) //true
- _isNegative(number): boolean_. nb: checks to see if the number is negative
    > el.isNegative(1) //false
- _isNeutral(number): boolean_. nb: checks to see if the number is zero
    > el.isNeutral(1) //false
- _round(number, precision?): boolean_. nb: rounds a number to the optional precision provided. precision is 1 by default
    > el.round(1.23456, 2) //1.23
- _arrayProduct([ number, ]): boolean_.
    > el.arrayProduct([1,2,3]) //6
- _arrayMin([ number, ], after?): boolean_. nb: get the first occurrence of the minimum value as _value_ and index of that value as _key_ in an array starting from the optional _after value_ clause.
    > el.arrayMin([4,3,-4,25,45,23,-1,6,20], 20) //{ key: 5, value: 23 }
- _arrayMax([ number, ], before?): boolean_. nb: get the first occurrence of the maximum value as _value_ and  index of that value as _key_ in an array starting after the optional _before value_ clause.
    > el.arrayMax([4,3,-4,25,45,23,-1,6,20], 3) //{ key: 6, value: -1 }
- _clone( source: any ): any_. nb: returns a deep copy of the source object. does not clone primitive types from the head: number, string and boolean.
    > el.clone([1,2]) //[1,2]
- _contains( object: any, value: any): boolean_. nb: does a deep equality check to determining if an object of values contains a specific value. it only checks for the object's own properties
    > el.contains([1,2], 2) //true
- _isEqual( ...object: any ): boolean_. nb: determines the value by value deep equality of two or more objects. it only checks for the objects own properties
    > el.isEqual([1,2],[1,2]) //true
- _isEmpty( object: any ): boolean_. nb: determines if an object is empty
    > el.isEmpty([]) //true
- _accumulate(source: number[] | string, callback)_ nb: calculates the running mean, mean, variance and standard deviation of a series of numbers from an array or a file system path
```ecmascript 6
    //from array
    el.accumulate([1,2,3,4],(err, data) => {
        if( err ) console.log('err: ', err);
        console.log(data); //{ mean: 2.5, runningMean: 0.7916666666666666, variance: 4.0625, std: 2.0155644370746373, processed: 4 }
    });

    //from file
    //will take only numbers in the file one line at a time. all other characters are ignored
    //example formats are:
    //  1,2,3,4
    //  5 6 7 8
    //  [9 10 11 12]
    //  ...
    el.accumulate( 'absolute/path/to/some/file/on/file/system', callback );
```
