
module sys {
    export class ArrayList<T> {
        private _data : Array<T>;

        public constructor(items? : Array<T>) {
            if (items === undefined) {
                this._data = new Array<T>();
            } else {
                this._data = items.slice();
            }
        }

        public get length():number { return  this._data.length; }

        public get(n : number) : T {
            return this._data[n];
        }

        public has(item : T) : boolean {
            return this._data.indexOf(item) != -1;
        }

        public find(item : T) : number {
            return this._data.indexOf(item);
        }

        public empty() : boolean {
            return this._data.length == 0;
        }



        public foreach(f : (x : T) => void) : void {
            for (var i = 0; i < this.length; ++i) {
                f(this._data[i]);
            }
        }

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

        public append(...items : T[]) : void {
            this._data = this._data.concat(items);
        }

        // untested
        public prepend(...items : T[]) : void {
            this._data = items.concat(this._data);
        }

        // untested
        public remove(index : number) : void {
            this._data.splice(index, 1);
        }



        public map<Y>(f : (x : T) => Y) : ArrayList<Y> {
            var n = new ArrayList<Y>();

            for (var i = 0; i < this.length; ++i) {
                n.append(f(this.get(i)));
            }

            return n;
        }

        public foldr<B>(f : (x : T, y : B) => B, init : B) : B {
            if (this.length == 0) return init;

            var result = init;

            for (var i = this._data.length - 1; i >= 0; --i) {
                result = f(this._data[i], result);
            }

            return result;
        }

        public foldl<B>(f : (x : B, y : T) => B, init : B) : B {
            if (this.length == 0) return init;

            var result = init;

            for (var i = 0; i < this._data.length; ++i)
                result = f(result, this._data[i]);

            return result;
        }

        public foldr1(f : (x : T, y : T) => T) : T {
            if (this.length == 0) throw new Error("foldr1 requires a non-empty list");

            var result = this._data[this._data.length - 1]; // last entry

            for (var i = this._data.length - 2; i >= 0; --i) {
                result = f(this._data[i], result);
            }

            return result;
        }

        public foldl1(f : (x : T, y : T) => T) : T {
            if (this.length == 0) throw new Error("foldl1 requires a non-empty list");

            var result = this._data[0];

            for (var i = 1; i < this._data.length; ++i)
                result = f(result, this._data[i]);

            return result;
        }

        public filter(f : (x : T) => boolean) : ArrayList<T> {
            var array = new ArrayList<T>();

            this.foreach(x => {
                if (f(x)) array.append(x);
            });

            return array;
        }
    }
}