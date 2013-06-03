LazyCollection 
==============

Lazy implementation of JavaScript's array iteration functions.

##Usage

```javascript

// Callback for filter
function equal(item) {
  return item % 2 === 0;
}

// Callback for map
function doubleItem(item) {
  return item * 2;
}

// Source array
var source = [];
for (var i = 0; i < 10000000; i++) {
  source.push(i);
}

// Create new Lazy Collection with the source to use.
var myCollection = new LazyCollection(source);

// Use toArray to create an array from a LazyCollection...
var filteredArray = myCollection.filter(equal).map(doubleItem).take(100).toArray();

// ...or use next() to get the next element from the collection.
// next() will return a LazyItem or undefined when no more items are found.
var item;
do {
  item = y.next();
  if (item === undefined) { break; }
  console.log(item.value);
} while (item !== undefined);
 
```

##Quick performance benchmark (Chrome 27)

```javascript

console.time("lazy");
var x = new LazyCollection(source);
var y = x.filter(equal).map(doubleItem).take(100).toArray();
console.timeEnd("lazy");
// lazy: 4.000 ms

console.time("native");
var y2 = source.filter(equal).map(doubleItem).splice(0, 100);
console.timeEnd("native");
// native: 2336.000 ms
 
```

##API

```javascript

LazyCollection:

Constructor: LazyCollection(source:Array)
Methods:
  filter(callback:Function) - Filters the collection to only include elements where the callback returns true.
  map(callback:Function) - Maps each value according to the callback. 
  take(num:Number) - Take the number of elements specified by num.
  next() - Returns the next element in the collection or undefined if no more elements exist.
  
  
LazyItem:
Constructor: LazyItem(value)
Properties:
  value - Get the value of the lazy item.


```

#License

The MIT License (MIT)

Copyright (c) 2013 Stefan Matsson (https://plus.google.com/u/0/111634125071893193016/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
