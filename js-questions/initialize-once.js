const intializeOnce = (fx) => {
    let isInitialized = false;
    return (...args) => {
        if (isInitialized) {
            throw new Error('The function is already initialized.');
        }
        isInitialized = true;
        return fx(...args);
    };
};

const onceFx = intializeOnce((a) => console.log('here is a:', a));
onceFx(1);
onceFx(2);
