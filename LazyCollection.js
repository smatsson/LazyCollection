
/**
Copyright 2013 by Stefan Matsson.
Licensed under the MIT license.
https://github.com/smatsson/LazyCollection
*/

(function (window, undefined) {
    "use strict";

    function LazyItem(value) {
        this.value = value instanceof LazyItem ? value.value : value;
    }

    function LazyCollection(source) {
        this._source = source instanceof Array ?
                       new MapIterator(source, function (item) { return item; }) :
                       source;
    }

    function Iterator(source) {
        this._source = source;
        this._position = 0;
    }

    Iterator.prototype._next = function () {
        var res = this._source instanceof Array ?
                  this._source[this._position++] :
                  this._source.next();

        if (res !== undefined) {
            res = new LazyItem(res);
        }

        return res;
    };

    function FilterIterator(source, callback) {
        Iterator.call(this, source);
        this._callback = callback;
    }
    FilterIterator.prototype = new Iterator();
    FilterIterator.prototype.next = function () {

        var res,
            item;

        do {
            item = this._next();
            if (item === undefined) {
                break;
            }
            res = this._callback(item.value);
            if (res === true) {
                break;
            }
        } while (item !== undefined);

        return item;
    };

    function MapIterator(source, callback) {
        this._callback = callback;
        Iterator.call(this, source);
    }
    MapIterator.prototype = new Iterator();
    MapIterator.prototype.next = function () {
        var item = this._next();
        return item === undefined ? undefined : new LazyItem(this._callback(item.value));
    };

    function TakeIterator(source, num) {
        Iterator.call(this, source);
        this._num = num;
        this._count = 0;
    }
    TakeIterator.prototype = new Iterator();
    TakeIterator.prototype.next = function () {
        if (this._count < this._num) {
            this._count++;
            return this._next();
        }

        return undefined;
    };

    LazyCollection.prototype = {
        constructor: LazyCollection,
        filter: function (callback) {
            return new LazyCollection(new FilterIterator(this._source, callback));
        },
        map: function (callback) {
            return new LazyCollection(new MapIterator(this._source, callback));
        },
        take: function (num) {
            return new LazyCollection(new TakeIterator(this._source, num));
        },
        next: function () {
            return this._source.next();
        },
        toArray: function () {
            var arr = [],
                res;

            do {
                res = this.next();

                if (res !== undefined) {
                    arr.push(res.value);
                }
            }
            while (res !== undefined);

            return arr;
        }
    };

    window.LazyCollection = LazyCollection;

} (this));