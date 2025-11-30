import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const getBoard2dArray = (size) => {
    return Array.from({ length: size }, () => new Array(size).fill(null));
};

const DIRECTIONS = Object.freeze({
    UP: 'UP',
    DOWN: 'DOWN',
    RIGHT: 'RIGHT',
    LEFT: 'LEFT',
});

const getInitialSnakeBody = (size) => [
    [Math.floor(size / 2), Math.floor(size / 2)],
];

const generateFoodCoordinate = (size, snakeBody = []) => {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    const isOnSnakeBody = snakeBody.some(([i, j]) => i === x && j === y);
    if (isOnSnakeBody) {
        return generateFoodCoordinate(size, snakeBody);
    }
    return [x, y];
};

const INITIAL_SNAKE_SPEED = 500;
const INCREASE_SNAKE_SPEED_BY = 50;

export const SnakeGameBoard = ({ size }) => {
    const board = getBoard2dArray(size);
    const [snakeBody, setSnakeBody] = useState(getInitialSnakeBody(size));
    const moveDirection = useRef(DIRECTIONS.RIGHT);
    const foodCoordinate = useRef(generateFoodCoordinate(size, snakeBody));
    const snakeSpeed = useRef(INITIAL_SNAKE_SPEED);

    const isSnakeBodyCell = (r, c) => {
        return snakeBody.some(([x, y]) => x === r && y === c);
    };

    const isFoodCell = (r, c) => {
        return (
            r === foodCoordinate.current[0] && c === foodCoordinate.current[1]
        );
    };

    useEffect(() => {
        let intervalId = null;

        const handleSnakeBodyStateUpdates = () => {
            setSnakeBody((prevBody) => {
                const prevBodyCopy = [...JSON.parse(JSON.stringify(prevBody))];
                let newHead = [...prevBodyCopy[0]];
                switch (moveDirection.current) {
                    case DIRECTIONS.RIGHT: {
                        newHead[1] += 1;
                        break;
                    }
                    case DIRECTIONS.LEFT: {
                        newHead[1] -= 1;
                        break;
                    }
                    case DIRECTIONS.UP: {
                        newHead[0] -= 1;
                        break;
                    }
                    case DIRECTIONS.DOWN: {
                        newHead[0] += 1;
                        break;
                    }
                    default: {
                        console.warn('invalid move direction!');
                    }
                }

                const isIntersectingWall =
                    newHead[1] >= size ||
                    newHead[1] < 0 ||
                    newHead[0] < 0 ||
                    newHead[0] >= size;

                const isIntersectingItself = prevBodyCopy.some(
                    ([x, y]) => x === newHead[0] && y === newHead[1]
                );

                if (isIntersectingWall || isIntersectingItself) {
                    moveDirection.current = DIRECTIONS.RIGHT;
                    foodCoordinate.current = generateFoodCoordinate(
                        size,
                        prevBodyCopy
                    );
                    snakeSpeed.current = INITIAL_SNAKE_SPEED;
                    if (intervalId) {
                        clearInterval(intervalId);
                        intervalId = setInterval(
                            handleSnakeBodyStateUpdates,
                            snakeSpeed.current
                        );
                    }
                    return getInitialSnakeBody(size);
                }

                const isIntersectingFood =
                    newHead[0] === foodCoordinate.current[0] &&
                    newHead[1] === foodCoordinate.current[1];
                if (isIntersectingFood) {
                    foodCoordinate.current = generateFoodCoordinate(
                        size,
                        prevBodyCopy
                    );
                    snakeSpeed.current -= INCREASE_SNAKE_SPEED_BY;
                    if (intervalId) {
                        clearInterval(intervalId);
                        intervalId = setInterval(
                            handleSnakeBodyStateUpdates,
                            snakeSpeed.current
                        );
                    }
                } else {
                    prevBodyCopy.pop();
                }
                prevBodyCopy.unshift(newHead);
                return prevBodyCopy;
            });
        };

        intervalId = setInterval(
            handleSnakeBodyStateUpdates,
            snakeSpeed.current
        );

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [size]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.code;
            switch (key) {
                case 'ArrowUp': {
                    if (moveDirection.current !== DIRECTIONS.DOWN) {
                        moveDirection.current = DIRECTIONS.UP;
                    }
                    break;
                }
                case 'ArrowDown': {
                    if (moveDirection.current !== DIRECTIONS.UP) {
                        moveDirection.current = DIRECTIONS.DOWN;
                    }
                    break;
                }
                case 'ArrowRight': {
                    if (moveDirection.current !== DIRECTIONS.LEFT) {
                        moveDirection.current = DIRECTIONS.RIGHT;
                    }
                    break;
                }
                case 'ArrowLeft': {
                    if (moveDirection.current !== DIRECTIONS.RIGHT) {
                        moveDirection.current = DIRECTIONS.LEFT;
                    }
                    break;
                }
                default: {
                    console.log('only arrow keys are allowed!');
                    return;
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div>
            <h3>Score: {snakeBody.length}</h3>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {board.map((row, rowIndex) => (
                    <div
                        key={`row-${rowIndex}`}
                        style={{ display: 'flex' }}>
                        {row.map((_, colIndex) => (
                            <div
                                key={`col-${colIndex}`}
                                style={{
                                    border: '1px solid #ccc',
                                    width: '20px',
                                    height: '20px',
                                    background: isSnakeBodyCell(
                                        rowIndex,
                                        colIndex
                                    )
                                        ? 'green'
                                        : 'white',
                                    color: 'red',
                                }}>
                                {isFoodCell(rowIndex, colIndex) ? 'O' : ''}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SnakeGameBoard;
