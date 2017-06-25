#### Utility
    This package consists of several simple to complex rudimentary functions
    used in create a manipulate data.
    Why recreate the wheel when you can get it out of the box?
    
    All function examples extend from root: el.
    
##### Functions
- _arraySum([ number, ]): number_
    > el.arraySum([1,2,3]) // 5
- _average([ number, ]): number_
    > el.average([1,2,3]) //2
- _compare(T,T): number_. nb: T = number | string 
    > el.compare([3,1]) //-1
- _inversions([ number, ]): number_. nb: returns the number of swaps necessary for the list to be sorted
    > el.inversions(['c','b','a']) //2
- _isSorted([ T, ]): boolean_. nb: T = number | string 
    > el.isSorted([1,2,3]) //true
- _shuffle([ T, ]): boolean_. nb: t1, t2 = number | string. returns a randomly shuffled list using knuth shuffle.
    > el.shuffle(['c','b','a']) //[ 'b', 'a', 'c' ]
- _randSeq([ howMany, from, to, shouldExcludeEnds ? ]): [ number, ]_. nb: shouldExcludeEnds defaults to false. returns an array of a sequence of randomly generated numbers based on how many is requested. 
    > el.randSeq(5,2,5) // [ 1.4225897688487965, 2.363004834625378 ]
- _swapInArray(firstIndex, secondIndex, array): void_. 
    > el.swapInArray([ 3, 5, 7, 9 ]) //void
- _uniform(from, to): number_.. nb: returns a uniformly generated random number between two numbers 
    > el.uniform(1,3) //2.332162893374789