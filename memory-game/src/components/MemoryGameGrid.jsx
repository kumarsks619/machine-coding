import { useState, useEffect, useRef } from 'react';

const getInitialState = (size) => {
    const halfArray = new Array((size * size) / 2)
        .fill(null)
        .map((_, index) => ({
            value: index,
            isFlipped: false,
            isSolved: false,
        }));
    return [...halfArray, ...halfArray]
        .sort(() => Math.random() - 0.5)
        .map((card, index) => ({ ...card, index }));
};

const MemoryGameGrid = ({ size }) => {
    const [cards, setCards] = useState(getInitialState(size));
    const [flippedCards, setFlippedCards] = useState([]);
    const timeoutId = useRef(null);

    if (size % 2 !== 0) {
        return <h3>Error: Size must be even</h3>;
    }

    const handleCardFlip = (index) => {
        if (cards[index].isFlipped || cards[index].isSolved) return;

        if (flippedCards.length === 2) return;

        setCards((prevCards) => {
            const prevCardsCopy = [...prevCards];
            prevCardsCopy[index] = { ...prevCardsCopy[index], isFlipped: true };
            return prevCardsCopy;
        });

        setFlippedCards((prevFlippedCards) => [
            ...prevFlippedCards,
            cards[index],
        ]);
    };

    useEffect(() => {
        if (flippedCards.length !== 2) return;

        if (flippedCards.length === 2) {
            if (flippedCards[0].value === flippedCards[1].value) {
                setCards((prevCards) => {
                    const prevCardsCopy = [...prevCards];
                    prevCardsCopy[flippedCards[0].index].isSolved = true;
                    prevCardsCopy[flippedCards[1].index].isSolved = true;
                    return prevCardsCopy;
                });
                setFlippedCards([]);
                return;
            }
        }

        timeoutId.current = setTimeout(() => {
            setCards((prevCards) => {
                const prevCardsCopy = [...prevCards];
                prevCardsCopy[flippedCards[0].index].isFlipped = false;
                prevCardsCopy[flippedCards[1].index].isFlipped = false;
                return prevCardsCopy;
            });
            setFlippedCards([]);
        }, 1000);

        return () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
        };
    }, [flippedCards]);

    const handleGameReset = () => {
        setCards(getInitialState(size));
    };

    const isUserWon = cards.every((card) => card.isSolved);

    return (
        <div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${size}, 1fr)`,
                    gap: '8px',
                }}>
                {cards.map((card, index) => (
                    <div
                        key={`card-${index}`}
                        style={{
                            height: '40px',
                            width: '40px',
                            border: '1px solid #ccc',
                            display: 'grid',
                            placeItems: 'center',
                            background: card.isSolved ? 'lightgreen' : '#fff',
                            transform: card.isFlipped
                                ? 'rotateY(0deg)'
                                : 'rotateY(180deg)',
                            color: '#000',
                            transition: 'all 0.3s ease',
                        }}
                        onClick={() => handleCardFlip(index)}>
                        {card.isFlipped ? card.value : '?'}
                    </div>
                ))}
            </div>
            {isUserWon && <h3>You won!</h3>}
            <button
                type="button"
                style={{ marginTop: '10px' }}
                onClick={handleGameReset}>
                Reset
            </button>
        </div>
    );
};

export default MemoryGameGrid;
