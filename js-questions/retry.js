// Retry a failing async function
// Write a function retry(fn, times) that calls an async function fn and retries up to times if it rejects.

const retry = (fx, retries) => {
    let attempt = 0;
    return new Promise((resolve, reject) => {
        const executer = () => {
            fx()
                .then((res) => resolve(res))
                .catch((err) => {
                    if (attempt < retries) {
                        attempt++;
                        setTimeout(() => {
                            executer();
                        }, attempt * 1000);
                    } else {
                        reject(err);
                    }
                });
        };
        executer();
    });
};
