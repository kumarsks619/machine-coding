// Reduce method polyfill
Array.prototype.myReduce = function (callback, initialValue) {
    let acc = arguments.length > 1 ? initialValue : this[0];
    let startIndex = arguments.length > 1 ? 0 : 1;
    for (let i = startIndex; i < this.length; i++) {
        acc = callback(acc, this[i], i, this);
    }
    return acc;
};

const sum = [1, 2, 3].myReduce((acc, curr) => acc + curr, 0);
console.log(sum);

// Map method polyfill
Array.prototype.myMap = function (callback) {
    let result = [];
    for (let i = 0; i < this.length; i++) {
        result.push(callback(this[i], i, this));
    }
    return result;
};

const multiples = [1, 2, 3].myMap((item, index) => item * index);
console.log(multiples);

// Filter method polyfill
Array.prototype.myFilter = function (callback) {
    let result = [];
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            result.push(this[i]);
        }
    }
    return result;
};

const evens = [1, 2, 3].myFilter((item) => item % 2 === 0);
console.log(evens);
