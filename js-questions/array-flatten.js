// flatten([1, [2, [3, [4]]]])
// → [1, 2, 3, 4]
const flatten = (nestedArr) => {
    let flatArr = [];
    const helper = (arr) => {
        arr.forEach((item) => {
            if (Array.isArray(item)) {
                helper(item);
            } else {
                flatArr.push(item);
            }
        });
    };
    helper(nestedArr);
    return flatArr;
};

console.log(flatten([1, [2, [3, [4]]]]));
