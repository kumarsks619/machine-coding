import './App.css';
import { useState, useRef } from 'react';
import Section from './components/Section';
import { BOARD_DATA } from './data';

function App() {
    const [board, setBoard] = useState(BOARD_DATA);
    const draggedTask = useRef(null);
    const draggedFromSection = useRef(null);

    const handleDragStart = (task, sectionName) => {
        draggedTask.current = task;
        draggedFromSection.current = sectionName;
    };

    const handleDrop = (sectionName) => {
        setBoard((prev) => {
            let prevCopy = { ...prev };
            prevCopy[draggedFromSection.current] = prevCopy[
                draggedFromSection.current
            ]?.filter((task) => task.id !== draggedTask.current.id);
            prevCopy[sectionName] = [
                ...prevCopy[sectionName],
                draggedTask.current,
            ];
            return prevCopy;
        });
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-around',
                gap: '20px',
            }}>
            {Object.entries(board).map(([sectionName, tasks]) => (
                <Section
                    key={sectionName}
                    sectionName={sectionName}
                    tasks={tasks}
                    onDragStart={handleDragStart}
                    onDrop={handleDrop}
                />
            ))}
        </div>
    );
}

export default App;
