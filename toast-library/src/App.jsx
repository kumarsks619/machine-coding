import { useContext } from 'react';
import './App.css';
import Toasts from './toast/Toasts';
import { ToastContext } from './toast/ToastContext';

function App() {
    const { dispatchToast } = useContext(ToastContext);
    return (
        <div>
            <Toasts />
            <button
                type="button"
                onClick={() => dispatchToast('Hello World!')}>
                Show Toast
            </button>
        </div>
    );
}

export default App;
