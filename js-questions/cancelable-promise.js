// Cancelable Promise
// Implement a cancelable promise wrapper.
// const { promise, cancel } = cancelable(fetchData());
// cancel(); // stops the fetch

const cancelable = (fx) => {
    let isCanceled = false;
    let rejectFn = undefined;
    const promise = new Promise((resolve, reject) => {
        rejectFn = reject;
        fx()
            .then((res) => {
                if (!isCanceled) {
                    resolve(res);
                }
            })
            .catch((err) => {
                if (!isCanceled) {
                    reject(err);
                }
            });
    });

    const cancel = () => {
        isCanceled = true;
        rejectFn();
    };

    return { promise, cancel };
};
