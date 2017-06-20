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
	var el require('el-gorithm');
	
 ##### [Run El-gorithm Demo](https://npm.runkit.com/el-gorithm)

 ##### [El-gorithmn NPM](https://www.npmjs.com/package/el-gorithm)
  
 ## Utility
 #### _arraySum([ number, ])_: 
 	sums the data in a numeric array
 #### _average([ number, ])_:
 	averages the data in a numeric array
 #### _compare( first: T, second: T)_: T = number | string
 	compares two arguments for equality
 #### _inversions([ T, ])_: T = number | string
 	determines the number of swaps required to sort an array of number or string objects
 #### _isSorted([ T, ])_: T = number | string
 	check if an array of numbers or strings are sorted
 #### _shuffle([ T, ])_: T = number | string
 	uniformly shuffles an array of numbers or strings
 #### _ranSeq(howMany: number, from: number, to: number, shouldExcludeEnds (default = false): boolean?)_: 
 	gives a sequence of uniform randomly generated numbers in an array based on how many is requested
 #### _swapInArray(firstIndex: number, secondIndex: number, array: [ T, ])_: T = number | string. *Returns nothing.
 	swaps the values at given index in an array
	* might take this out if feedback of usage is less to none
 #### _uniform(first: number, second: number)_:
 	gives a uniform random number between two numbers
