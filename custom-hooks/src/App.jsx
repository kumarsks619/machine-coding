import { useState } from 'react';
import './App.css';
import QueryComponent from './components/QueryComponent';
import QueryComponent2 from './components/QueryComponent2';

function App() {
    const [mountQueryComponent, setMountQueryComponent] = useState(false);
    const [mountQueryComponent2, setMountQueryComponent2] = useState(false);

    return (
        <div>
            <button
                type="button"
                onClick={() => setMountQueryComponent((prev) => !prev)}>
                {mountQueryComponent ? 'Unmount' : 'Mount'}
            </button>
            <button
                type="button"
                onClick={() => setMountQueryComponent2((prev) => !prev)}>
                {mountQueryComponent2 ? 'Unmount 2' : 'Mount 2'}
            </button>
            {mountQueryComponent && <QueryComponent />}
            {mountQueryComponent2 && <QueryComponent2 />}
        </div>
    );
}

export default App;
