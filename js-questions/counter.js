function counter() {
    let counter = 0;
    function increment() {
        counter++;
    }
    function decrement() {
        counter--;
    }
    function getCounter() {
        return console.log(counter);
    }

    return {
        increment,
        decrement,
        getCounter,
    };
}

const counter1 = counter();
counter1.increment();
counter1.increment();
counter1.decrement();
counter1.getCounter();

const counter2 = counter();
counter2.increment();
counter2.increment();
counter2.increment();
counter2.decrement();
counter2.getCounter();
