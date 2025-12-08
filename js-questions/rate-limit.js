// Rate-limit API requests using Promises
// Rate-limit concurrent async operations
const rateLimitUsingPromise = (promises, limit) => {
    const results = [];
    let index = 0;
    let activeRequests = 0;

    return new Promise((resolve) => {
        const execute = () => {
            while (activeRequests < limit && index < promises.length) {
                activeRequests++;
                const p = promises[index];
                p.then((res) => {
                    results[index] = res;
                })
                    .catch((err) => {
                        results[index] = err;
                    })
                    .finally(() => {
                        activeRequests--;
                        index++;
                        if (activeRequests === 0 && index === promises.length) {
                            resolve(results);
                        } else {
                            execute();
                        }
                    });
            }
        };

        execute();
    });
};

const rateLimitUsingWorker = async (promises, limit) => {
    let index = 0;
    const results = [];

    const worker = async () => {
        while (index < promises.length) {
            const p = promises[index];

            try {
                results[index] = await p;
            } catch (err) {
                results[index] = err;
            } finally {
                index++;
            }
        }
    };

    const workers = [];
    for (let i = 0; i < limit; i++) {
        workers.push(worker());
    }

    await Promise.all(workers);

    return results;
};
