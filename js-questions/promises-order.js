// Sequential API calls with dynamic results
// You have a function getNextId(id) that returns a promise resolving to the next ID.
// Write code to fetch first 10 IDs sequentially, using async/await.
const sequentialPromise = (getNextId, count) => {
    const ids = [];
    return new Promise((resolve, reject) => {
        const caller = (id = 0) => {
            getNextId(id)
                .then((res) => {
                    ids.push(res);
                    if (ids.length < count) {
                        caller(res);
                    } else if (ids.length === count) {
                        resolve(ids);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        };
        caller();
    });
};

// Promise pipeline
// You have async functions [f1, f2, f3] and input x.
// Create a pipeline where each function’s output feeds the next:
// await pipeline([f1, f2, f3], x);
const promisesPipeline = (promises, input) => {
    const promisesCopy = [...promises];
    return new Promise((resolve, reject) => {
        if (promisesCopy.length === 0) {
            resolve(input);
            return;
        }
        const executer = (currentInput) => {
            const p = promisesCopy.shift();
            p(currentInput)
                .then((res) => {
                    if (promisesCopy.length > 0) {
                        executer(res);
                    } else {
                        resolve(res);
                    }
                })
                .catch((err) => reject(err));
        };
        executer(input);
    });
};
