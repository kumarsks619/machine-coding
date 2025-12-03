import { useState } from 'react';
import './App.css';
import Pagination from './components/Pagination';

function App() {
    const [page, setPage] = useState(0);

    return (
        <Pagination
            page={page}
            setPage={setPage}
            totalPages={10}
        />
    );
}

export default App;
