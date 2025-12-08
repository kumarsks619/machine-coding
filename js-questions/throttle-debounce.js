const debounced = (fx, delay) => {
    let timeoutId = null;
    return (...args) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fx(...args), delay);
    };
};

const throttled = (fx, interval) => {
    let isCalled = false;
    return (...args) => {
        if (isCalled) return;
        fx(...args);
        isCalled = true;
        setTimeout(() => {
            isCalled = false;
        }, interval);
    };
};
