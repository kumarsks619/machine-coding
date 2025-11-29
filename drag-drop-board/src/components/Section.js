const Section = ({ sectionName, tasks, onDragStart, onDrop }) => {
    return (
        <div
            style={{
                flex: 1,
                background: '#ccc',
                padding: '8px',
                borderRadius: '4px',
                minHeight: '500px',
            }}
            onDrop={() => onDrop(sectionName)}
            onDragOver={(e) => e.preventDefault()}>
            <h2>{sectionName}</h2>
            <div>
                {tasks.map((task) => (
                    <p
                        key={task.id}
                        draggable
                        style={{
                            background: 'lightpink',
                            padding: '4px',
                            cursor: 'grab',
                        }}
                        onDragStart={() => onDragStart(task, sectionName)}>
                        {task.label}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Section;
