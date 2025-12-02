import { useEffect, useState, useRef } from 'react';

const getInitialTimerState = () => ({ hours: 0, minutes: 0, seconds: 0 });

const Stopwatch = () => {
    const [timer, setTimer] = useState(() => getInitialTimerState());
    const [isCountdownStarted, setIsCountdownStarted] = useState(false);
    const countdownRef = useRef(null);

    const handleChange = (e, key) => {
        const value = Number(e.target.value);
        if (isNaN(value)) return;

        setTimer((prevTimer) => {
            const prevTimerCopy = { ...prevTimer };
            if (key === 'seconds') {
                if (value > 59) {
                    prevTimerCopy.minutes =
                        prevTimerCopy.minutes + Math.floor(value / 60);
                    prevTimerCopy.seconds = value % 60;
                } else {
                    prevTimerCopy.seconds = value;
                }
            } else if (key === 'minutes') {
                if (value > 59) {
                    prevTimerCopy.hours =
                        prevTimerCopy.hours + Math.floor(value / 60);
                    prevTimerCopy.minutes = value % 60;
                } else {
                    prevTimerCopy.minutes = value;
                }
            } else if (key === 'hours') {
                prevTimerCopy.hours = value;
            }
            return prevTimerCopy;
        });
    };

    useEffect(() => {
        if (isCountdownStarted) {
            countdownRef.current = setInterval(() => {
                setTimer((prevTimer) => {
                    const prevTimerCopy = { ...prevTimer };
                    if (prevTimerCopy.seconds > 0) {
                        prevTimerCopy.seconds -= 1;
                    } else if (prevTimerCopy.seconds === 0) {
                        if (prevTimerCopy.minutes > 0) {
                            prevTimerCopy.minutes -= 1;
                            prevTimerCopy.seconds = 59;
                        } else if (prevTimerCopy.minutes === 0) {
                            if (prevTimerCopy.hours > 0) {
                                prevTimerCopy.hours -= 1;
                                prevTimerCopy.minutes = 59;
                                prevTimerCopy.seconds = 59;
                            }
                        }
                    }

                    return prevTimerCopy;
                });
            }, 1000);
        } else {
            if (countdownRef.current) {
                clearInterval(countdownRef.current);
                setIsCountdownStarted(false);
            }
        }

        return () => {
            if (countdownRef.current) {
                clearInterval(countdownRef.current);
            }
        };
    }, [isCountdownStarted]);

    return (
        <div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="HH"
                    style={{ width: '40px', height: '40px', padding: '8px' }}
                    value={
                        isCountdownStarted
                            ? timer.hours.toString().padStart(2, '0')
                            : timer.hours
                    }
                    readOnly={isCountdownStarted}
                    onChange={(e) => handleChange(e, 'hours')}
                />
                <input
                    type="text"
                    placeholder="mm"
                    style={{ width: '40px', height: '40px', padding: '8px' }}
                    value={
                        isCountdownStarted
                            ? timer.minutes.toString().padStart(2, '0')
                            : timer.minutes
                    }
                    readOnly={isCountdownStarted}
                    onChange={(e) => handleChange(e, 'minutes')}
                />
                <input
                    type="text"
                    placeholder="ss"
                    style={{ width: '40px', height: '40px', padding: '8px' }}
                    value={
                        isCountdownStarted
                            ? timer.seconds.toString().padStart(2, '0')
                            : timer.seconds
                    }
                    readOnly={isCountdownStarted}
                    onChange={(e) => handleChange(e, 'seconds')}
                />
            </div>

            <button
                type="button"
                style={{ marginRight: '10px' }}
                onClick={() => setIsCountdownStarted((prev) => !prev)}>
                {isCountdownStarted ? 'Pause' : 'Start'}
            </button>
            <button
                type="button"
                onClick={() => {
                    setTimer(getInitialTimerState());
                    setIsCountdownStarted(false);
                }}>
                Reset
            </button>
        </div>
    );
};

export default Stopwatch;
