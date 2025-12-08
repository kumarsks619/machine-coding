// Timeout for a Promise
// Wrap any promise with a timeout
// await promiseWithTimeout(fetchData(), 1000); // rejects if not resolved in 1s

const promiseWithTimeout = (promise, timeout) => {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            reject('TIMED-OUT');
        }, timeout);

        promise
            .then((res) => {
                if (timeoutId) clearTimeout(timeoutId);
                resolve(res);
            })
            .catch((err) => {
                if (timeoutId) clearTimeout(timeoutId);
                reject(err);
            });
    });
};

const promiseWithTimeoutUsingRace = (promise, timeout) => {
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(reject('TIMEDOUT'), timeout)
    );
    return Promise.race([timeoutPromise, promise]);
};
