var sys;
(function (sys) {
    var ArrayList = (function () {
        function ArrayList(items) {
            if (items === undefined) {
                this._data = new Array();
            }
            else {
                this._data = items.slice();
            }
        }
        Object.defineProperty(ArrayList.prototype, "length", {
            get: function () {
                return this._data.length;
            },
            enumerable: true,
            configurable: true
        });
        ArrayList.prototype.get = function (n) {
            return this._data[n];
        };
        ArrayList.prototype.has = function (item) {
            return this._data.indexOf(item) != -1;
        };
        ArrayList.prototype.find = function (item) {
            return this._data.indexOf(item);
        };
        ArrayList.prototype.empty = function () {
            return this._data.length == 0;
        };
        ArrayList.prototype.foreach = function (f) {
            for (var i = 0; i < this.length; ++i) {
                f(this._data[i]);
            }
        };
        // untested
        //public insert(index : number, ...items : T[]) : void {
        //    if (items.length === 1) {
        //        this._data.splice(index, 0, items[0]);
        //    } else {
        //        var newarray = new Array<T>();
        //        newarray.concat(this._data.slice(0, index));
        //        newarray.concat(items);
        //        newarray.concat(this._data.slice(index));
        //        this._data = newarray;
        //    }
        //}
        ArrayList.prototype.append = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i - 0] = arguments[_i];
            }
            this._data = this._data.concat(items);
        };
        // untested
        ArrayList.prototype.prepend = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i - 0] = arguments[_i];
            }
            this._data = items.concat(this._data);
        };
        // untested
        ArrayList.prototype.remove = function (index) {
            this._data.splice(index, 1);
        };
        ArrayList.prototype.map = function (f) {
            var n = new ArrayList();
            for (var i = 0; i < this.length; ++i) {
                n.append(f(this.get(i)));
            }
            return n;
        };
        ArrayList.prototype.foldr = function (f, init) {
            if (this.length == 0)
                return init;
            var result = init;
            for (var i = this._data.length - 1; i >= 0; --i) {
                result = f(this._data[i], result);
            }
            return result;
        };
        ArrayList.prototype.foldl = function (f, init) {
            if (this.length == 0)
                return init;
            var result = init;
            for (var i = 0; i < this._data.length; ++i)
                result = f(result, this._data[i]);
            return result;
        };
        ArrayList.prototype.foldr1 = function (f) {
            if (this.length == 0)
                throw new Error("foldr1 requires a non-empty list");
            var result = this._data[this._data.length - 1]; // last entry
            for (var i = this._data.length - 2; i >= 0; --i) {
                result = f(this._data[i], result);
            }
            return result;
        };
        ArrayList.prototype.foldl1 = function (f) {
            if (this.length == 0)
                throw new Error("foldl1 requires a non-empty list");
            var result = this._data[0];
            for (var i = 1; i < this._data.length; ++i)
                result = f(result, this._data[i]);
            return result;
        };
        ArrayList.prototype.filter = function (f) {
            var array = new ArrayList();
            this.foreach(function (x) {
                if (f(x))
                    array.append(x);
            });
            return array;
        };
        return ArrayList;
    })();
    sys.ArrayList = ArrayList;
})(sys || (sys = {}));
var sys;
(function (sys) {
    var Node = (function () {
        function Node(data) {
            this.data = data;
            this.prev = null;
            this.next = null;
        }
        return Node;
    })();
    var LinkedList = (function () {
        function LinkedList() {
            this.head = null;
            this.tail = null;
        }
        LinkedList.prototype.length = function () {
            return this.foldr(function (x, y) { return 1 + y; }, 0);
        };
        LinkedList.prototype.empty = function () {
            return this.head === null;
        };
        LinkedList.prototype.pushFront = function (item) {
            var x = new Node(item);
            if (this.head === null) {
                this.head = x;
                this.tail = this.head;
            }
            else {
                x.next = this.head;
                this.head.prev = x;
                this.head = x;
            }
        };
        LinkedList.prototype.popFront = function () {
            if (this.head === null) {
                return undefined;
            }
            else if (this.head.next === null) {
                var x = this.head;
                this.head = null;
                this.tail = null;
                return x.data;
            }
            else {
                var x = this.head;
                this.head = this.head.next;
                this.head.prev = null;
                return x.data;
            }
        };
        LinkedList.prototype.pushBack = function (item) {
            var x = new Node(item);
            if (this.head === null) {
                this.head = x;
                this.tail = x;
            }
            else {
                this.tail.next = x;
                x.prev = this.tail;
                this.tail = x;
            }
        };
        LinkedList.prototype.popBack = function () {
            if (this.head === null)
                return undefined;
            else if (this.head.next === null) {
                var x = this.head;
                this.head = null;
                this.tail = null;
                return x.data;
            }
            else {
                var x = this.tail;
                this.tail = x.prev;
                this.tail.next = null;
                return x.data;
            }
        };
        LinkedList.prototype.findNodeByIndex = function (index) {
            if (index < 0)
                return undefined;
            var start = this.head;
            for (var i = 0; start != null && i <= index; ++i) {
                start = start.next;
            }
            if (i == index)
                return start;
            else
                return undefined;
        };
        /*
        public insertAt(index : number, data : T) {
            var node = this.findNodeByIndex(index);

            if (node !== undefined) {
                var x = new Node<T>(data);

                if (node.prev !== null) { // has a previous element
                    if (node.prev === this.head) { // previous element is head
                }
            }
        }*/
        LinkedList.prototype.foreach = function (f) {
            var item = this.head;
            while (item != null) {
                f(item.data);
            }
        };
        LinkedList.prototype.map = function (f) {
            var x = new LinkedList();
            var item = this.head;
            while (item != null) {
                var y = f(item.data);
                x.pushBack(y);
            }
            return x;
        };
        LinkedList.prototype.foldr = function (f, init) {
            var result = init;
            var item = this.tail;
            while (item != null) {
                result = f(item.data, result);
                item = item.prev;
            }
            return result;
        };
        LinkedList.prototype.foldl = function (f, init) {
            var result = init;
            var item = this.head;
            while (item != null) {
                result = f(result, item.data);
                item = item.next;
            }
            return result;
        };
        LinkedList.prototype.foldr1 = function (f) {
            if (this.head === null)
                throw new Error("foldr1 requires a non-empty list");
            var item = this.tail;
            var result = item.data;
            item = item.prev;
            while (item != null) {
                result = f(item.data, result);
                item = item.prev;
            }
            return result;
        };
        LinkedList.prototype.foldl1 = function (f) {
            if (this.head === null)
                throw new Error("foldl1 requires a non-empty list");
            var item = this.head;
            var result = item.data;
            item = item.next;
            while (item != null) {
                result = f(result, item.data);
                item = item.next;
            }
            return result;
        };
        LinkedList.prototype.filter = function (f) {
            var list = new LinkedList();
            this.foreach(function (x) {
                if (f(x))
                    list.pushBack(x);
            });
            return list;
        };
        return LinkedList;
    })();
    sys.LinkedList = LinkedList;
})(sys || (sys = {}));
/// <reference path="qunit.d.ts"/>
/// <reference path="../sys/ArrayList.ts"/>
/// <reference path="../sys/LinkedList.ts"/>
QUnit.test("ArrayList Empty Conditions", function (assert) {
    var array = new sys.ArrayList();
    assert.strictEqual(array.length, 0, "Initial ArrayList length is 0");
    assert.strictEqual(array.get(0), undefined, "Non-existent value is undefined");
    assert.strictEqual(array.has(5), false, "Does not have a non-existant element");
    assert.strictEqual(array.find(5), -1, "Non-existant element with find returns -1");
    assert.strictEqual(array.empty(), true, "Empty() returns true");
    var value = 0;
    array.foreach(function (i) { return value = 5; });
    assert.strictEqual(value, 0, "foreach does nothing on an empty array");
    assert.strictEqual(array.map(function (i) { return i + 1; }).length, 0, "map on an empty array returns an empty array");
    assert.strictEqual(array.foldr(function (x, y) { return x + y; }, 5), 5, "foldr on an empty list returns init value");
    assert.strictEqual(array.foldl(function (x, y) { return x + y; }, 5), 5, "foldl on an empty list returns init value");
    assert.throws(function () { return array.foldr1(function (x, y) { return x + y; }); }, function (x) { return x.message === "foldr1 requires a non-empty list"; }, "foldr1 throws the right error on empty list");
    assert.throws(function () { return array.foldl1(function (x, y) { return x + y; }); }, function (x) { return x.message === "foldl1 requires a non-empty list"; }, "foldl1 throws the right error on empty list");
    assert.strictEqual(array.filter(function (x) { return true; }).length, 0, "filter on an empty list returns an empty list");
});
QUnit.test("ArrayList With Items", function (assert) {
    var array = new sys.ArrayList();
    array.append(5, 3, 4, 7);
    assert.strictEqual(array.length, 4, "Array length is 4");
    assert.strictEqual(array.get(0), 5, "First item is 5");
    assert.strictEqual(array.get(1), 3, "Second item is 3");
    assert.strictEqual(array.get(2), 4, "Third item is 4");
    assert.strictEqual(array.get(3), 7, "Fourth item is 7");
    assert.strictEqual(array.get(4), undefined, "Fifth item is undefined, non-existent");
    assert.strictEqual(array.has(7), true, "Array has a 7");
    assert.strictEqual(array.has(4), true, "Array has a 4");
    assert.strictEqual(array.has(2), false, "Array does not have a 2");
    assert.strictEqual(array.find(4), 2, "Array has an element 4 at index 2");
    var array2 = array.map(function (f) { return f + 1; });
    assert.strictEqual(array2.length, 4, "Mapped array has length 4");
    assert.strictEqual(array2.get(0), 6, "First entry was incremented by 1");
    assert.strictEqual(array2.get(1), 4, "Second entry was incremented by 1");
    assert.strictEqual(array2.get(2), 5, "Third entry was incremented by 1");
    assert.strictEqual(array2.get(3), 8, "Fourth entry was incremented by 1");
    assert.strictEqual(array2.get(4), undefined, "Fifth entry is undefined");
    array2.append(10);
    assert.strictEqual(array2.get(4), 10, "Fifth entry added is 10");
    assert.strictEqual(array.foldr(function (x, y) { return x + y; }, 2), 21, "Foldr on first array when summed is 21, with initial of 2");
    assert.strictEqual(array2.foldr(function (x, y) { return x + y; }, 2), 35, "Foldr on second array when summed is 35, with initial of 2");
    assert.strictEqual(array.foldl(function (x, y) { return x + y; }, 2), 21, "Foldl on first array when summed is 21, with initial of 2");
    assert.strictEqual(array2.foldl(function (x, y) { return x + y; }, 2), 35, "Foldl on second array when summed is 35, with initial of 2");
    assert.strictEqual(array.foldr1(function (x, y) { return x + y; }), 19, "Foldr1 on first array when summed is 19");
    assert.strictEqual(array2.foldr1(function (x, y) { return x + y; }), 33, "Foldr1 on second array when summed is 33");
    assert.strictEqual(array.foldl1(function (x, y) { return x + y; }), 19, "Foldl1 on first array when summed is 19");
    assert.strictEqual(array2.foldl1(function (x, y) { return x + y; }), 33, "Foldl1 on second array when summed is 33");
    assert.strictEqual(array.filter(function (x) { return x > 5; }).length, 1, "Filtered results on first array of > 5 is of length 1");
    assert.strictEqual(array2.filter(function (x) { return x > 5; }).length, 3, "Filtered results on second array of > 5 is of length 3");
});
QUnit.test("LinkedList", function (assert) {
    var list = new sys.LinkedList();
    assert.strictEqual(list.length(), 0, "Empty list has length 0");
    assert.strictEqual(list.popBack(), undefined, "Popback on empty list is undefined");
    assert.strictEqual(list.popFront(), undefined, "Popfront on empty list is undefined");
    assert.strictEqual(list.foldl(function (x, y) { return x + y; }, 1), 1, "Foldl on empty list returns initializer");
    assert.strictEqual(list.foldr(function (x, y) { return x + y; }, 1), 1, "Foldr on empty list returns initializer");
    assert.throws(function () { return list.foldr1(function (x, y) { return x + y; }); }, function (x) { return x.message === "foldr1 requires a non-empty list"; }, "foldr1 throws the right error on empty list");
    assert.throws(function () { return list.foldl1(function (x, y) { return x + y; }); }, function (x) { return x.message === "foldl1 requires a non-empty list"; }, "foldl1 throws the right error on empty list");
    assert.strictEqual(list.empty(), true, "Empty() returns true");
    var value = 0;
    list.foreach(function (i) { return value = 5; });
    assert.strictEqual(value, 0, "foreach does nothing on an empty list");
    assert.strictEqual(list.empty(), true, "empty on an empty list is true");
    list.pushFront(5);
    assert.strictEqual(list.length(), 1, "Length of 1");
    assert.strictEqual(list.empty(), false, "List is not empty");
    assert.strictEqual(list.foldr(function (x, y) { return x + y; }, 5), 10, "Foldr on list returns 10");
    assert.strictEqual(list.foldl(function (x, y) { return x + y; }, 5), 10, "Foldl on list returns 10");
});
