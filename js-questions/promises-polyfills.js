// Promise.all polyfill
Promise.myAll = function (promises) {
    let results = [];
    let resolvedPromises = 0;
    return new Promise((resolve, reject) => {
        if (promises.length === 0) {
            resolve([]);
            return;
        }
        for (let i = 0; i < promises.length; i++) {
            promises[i]
                .then((res) => {
                    results[i] = res;
                    resolvedPromises++;
                    if (resolvedPromises === promises.length) {
                        resolve(results);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        }
    });
};

// Promise.race polyfill
Promise.myRace = function (promises) {
    let isAnyCompleted = false;
    return new Promise((resolve, reject) => {
        if (promises.length === 0) {
            resolve(null);
            return;
        }
        for (let i = 0; i < promises.length; i++) {
            promises[i]
                .then((res) => {
                    if (isAnyCompleted) return;
                    isAnyCompleted = true;
                    resolve(res);
                })
                .catch((err) => {
                    if (isAnyCompleted) return;
                    reject(err);
                });
        }
    });
};

// Promise.any polyfill
Promise.myAny = function (promises) {
    let rejectedCount = 0;
    let isAnyResolved = false;
    return new Promise((resolve, reject) => {
        if (promises.length === 0) {
            resolve(null);
            return;
        }
        for (let i = 0; i < promises.length; i++) {
            promises[i]
                .then((res) => {
                    if (isAnyResolved) return;
                    isAnyResolved = true;
                    resolve(res);
                })
                .catch(() => {
                    rejectedCount++;
                    if (rejectedCount === promises.length) {
                        reject();
                    }
                });
        }
    });
};
