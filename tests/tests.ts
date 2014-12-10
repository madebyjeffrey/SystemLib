/// <reference path="qunit.d.ts"/>
/// <reference path="../sys/ArrayList.ts"/>
/// <reference path="../sys/LinkedList.ts"/>

QUnit.test("ArrayList Empty Conditions", (assert : any) => {
    var array = new sys.ArrayList<number>();

    assert.strictEqual(array.length, 0, "Initial ArrayList length is 0");
    assert.strictEqual(array.get(0), undefined, "Non-existent value is undefined");
    assert.strictEqual(array.has(5), false, "Does not have a non-existant element");
    assert.strictEqual(array.find(5), -1, "Non-existant element with find returns -1");
    assert.strictEqual(array.empty(), true, "Empty() returns true");

    var value = 0;
    array.foreach(i => value = 5);

    assert.strictEqual(value, 0, "foreach does nothing on an empty array");
    assert.strictEqual(array.map(i => i + 1).length, 0, "map on an empty array returns an empty array");
    assert.strictEqual(array.foldr((x,y)=>x+y, 5), 5, "foldr on an empty list returns init value");
    assert.strictEqual(array.foldl((x,y)=>x+y, 5), 5, "foldl on an empty list returns init value");
    assert.throws(() => array.foldr1((x,y)=>x+y),
        (x : Error) => x.message === "foldr1 requires a non-empty list",
        "foldr1 throws the right error on empty list");
    assert.throws(() => array.foldl1((x,y)=>x+y),
        (x : Error) => x.message === "foldl1 requires a non-empty list",
        "foldl1 throws the right error on empty list");
    assert.strictEqual(array.filter(x => true).length, 0, "filter on an empty list returns an empty list");
});

QUnit.test("ArrayList With Items", (assert : any) => {
    var array = new sys.ArrayList<number>();

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

    var array2 = array.map(f => f + 1);
    assert.strictEqual(array2.length, 4, "Mapped array has length 4");
    assert.strictEqual(array2.get(0), 6, "First entry was incremented by 1");
    assert.strictEqual(array2.get(1), 4, "Second entry was incremented by 1");
    assert.strictEqual(array2.get(2), 5, "Third entry was incremented by 1");
    assert.strictEqual(array2.get(3), 8, "Fourth entry was incremented by 1");

    assert.strictEqual(array2.get(4), undefined, "Fifth entry is undefined");
    array2.append(10);
    assert.strictEqual(array2.get(4), 10, "Fifth entry added is 10");

    assert.strictEqual(array.foldr((x,y)=>x+y, 2), 21, "Foldr on first array when summed is 21, with initial of 2");
    assert.strictEqual(array2.foldr((x,y)=>x+y, 2), 35, "Foldr on second array when summed is 35, with initial of 2");

    assert.strictEqual(array.foldl((x,y)=>x+y, 2), 21, "Foldl on first array when summed is 21, with initial of 2");
    assert.strictEqual(array2.foldl((x,y)=>x+y, 2), 35, "Foldl on second array when summed is 35, with initial of 2");

    assert.strictEqual(array.foldr1((x,y)=>x+y), 19, "Foldr1 on first array when summed is 19");
    assert.strictEqual(array2.foldr1((x,y)=>x+y), 33, "Foldr1 on second array when summed is 33");

    assert.strictEqual(array.foldl1((x,y)=>x+y), 19, "Foldl1 on first array when summed is 19");
    assert.strictEqual(array2.foldl1((x,y)=>x+y), 33, "Foldl1 on second array when summed is 33");

    assert.strictEqual(array.filter(x => x > 5).length, 1, "Filtered results on first array of > 5 is of length 1");
    assert.strictEqual(array2.filter(x => x > 5).length, 3, "Filtered results on second array of > 5 is of length 3");
});

QUnit.test("LinkedList", (assert : any) => {
    var list = new sys.LinkedList<number>();

    assert.strictEqual(list.length(), 0, "Empty list has length 0");
    assert.strictEqual(list.popBack(), undefined, "Popback on empty list is undefined");
    assert.strictEqual(list.popFront(), undefined, "Popfront on empty list is undefined");
    assert.strictEqual(list.foldl((x,y) => x+y, 1), 1, "Foldl on empty list returns initializer");
    assert.strictEqual(list.foldr((x,y) => x+y, 1), 1, "Foldr on empty list returns initializer");
    assert.throws(() => list.foldr1((x,y)=>x+y),
            (x : Error) => x.message === "foldr1 requires a non-empty list",
            "foldr1 throws the right error on empty list");
    assert.throws(() => list.foldl1((x,y)=>x+y),
        (x : Error) => x.message === "foldl1 requires a non-empty list",
        "foldl1 throws the right error on empty list");

    assert.strictEqual(list.empty(), true, "Empty() returns true");

    var value = 0;
    list.foreach(i => value = 5);

    assert.strictEqual(value, 0, "foreach does nothing on an empty list");
    assert.strictEqual(list.empty(), true, "empty on an empty list is true");

    list.pushFront(5);

    assert.strictEqual(list.length(), 1, "Length of 1");
    assert.strictEqual(list.empty(), false, "List is not empty");
    assert.strictEqual(list.foldr((x,y)=>x+y, 5), 10, "Foldr on list returns 10");
    assert.strictEqual(list.foldl((x,y)=>x+y, 5), 10, "Foldl on list returns 10");


});