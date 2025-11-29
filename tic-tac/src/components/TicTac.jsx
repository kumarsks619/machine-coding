import { useState, useEffect } from 'react';

const getCoordinateString = (rowIndex, colIndex) => `${rowIndex}:${colIndex}`;

const TURN = Object.freeze({
    CROSS: 'CROSS',
    ZERO: 'ZERO',
});

const GAME_STATES = Object.freeze({
    ON_GOING: 'ON_GOING',
    ZERO_WON: 'ZERO_WON',
    CROSS_WON: 'CROSS_WON',
    DRAW: 'DRAW',
});

const winningPatterns = [
    // Rows
    ['0:0', '0:1', '0:2'],
    ['1:0', '1:1', '1:2'],
    ['2:0', '2:1', '2:2'],

    // Columns
    ['0:0', '1:0', '2:0'],
    ['0:1', '1:1', '2:1'],
    ['0:2', '1:2', '2:2'],

    // Diagonals
    ['0:0', '1:1', '2:2'],
    ['0:2', '1:1', '2:0'],
];

const getWinStatus = (zeroes, crosses) => {
    const hasPattern = (filledBoxes, pattern) =>
        pattern.every((box) => filledBoxes.includes(box));

    for (const pattern of winningPatterns) {
        if (hasPattern(zeroes, pattern)) return GAME_STATES.ZERO_WON;
        if (hasPattern(crosses, pattern)) return GAME_STATES.CROSS_WON;
    }

    // Draw condition
    if (zeroes.length + crosses.length === 9) return GAME_STATES.DRAW;

    return GAME_STATES.ON_GOING;
};

const TicTac = () => {
    const [whoseTurn, setWhoseTurn] = useState(TURN.CROSS);
    const [zeroes, setZeroes] = useState([]);
    const [crosses, setCrosses] = useState([]);
    const [gameState, setGateState] = useState(GAME_STATES.ON_GOING);

    const getBoxValue = (rowIndex, colIndex) => {
        const coordinateString = getCoordinateString(rowIndex, colIndex);
        if (zeroes.includes(coordinateString)) return '0';
        if (crosses.includes(coordinateString)) return 'X';
        return '';
    };

    const handleClick = (rowIndex, colIndex) => {
        if (getBoxValue(rowIndex, colIndex) || gameState !== 'ON_GOING') return;
        const coordinateString = getCoordinateString(rowIndex, colIndex);
        if (whoseTurn === TURN.CROSS) {
            setCrosses((prev) => [...prev, coordinateString]);
            setWhoseTurn(TURN.ZERO);
        } else if (whoseTurn === TURN.ZERO) {
            setZeroes((prev) => [...prev, coordinateString]);
            setWhoseTurn(TURN.CROSS);
        }
    };

    const handleGameReset = () => {
        setWhoseTurn(TURN.CROSS);
        setZeroes([]);
        setCrosses([]);
    };

    useEffect(() => {
        setGateState(getWinStatus(zeroes, crosses));
    }, [zeroes, crosses]);

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {new Array(3).fill(0).map((_, rowIndex) => (
                    <div
                        key={`row-${rowIndex}`}
                        style={{ display: 'flex' }}>
                        {new Array(3).fill(0).map((_, colIndex) => (
                            <div
                                key={`col-${colIndex}`}
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    border: '1px solid #ccc',
                                    display: 'grid',
                                    placeItems: 'center',
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleClick(rowIndex, colIndex)}>
                                {getBoxValue(rowIndex, colIndex)}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <h3>{gameState}</h3>

            <button
                type="button"
                style={{ marginTop: '20px' }}
                onClick={handleGameReset}>
                Reset Game
            </button>
        </div>
    );
};

export default TicTac;
