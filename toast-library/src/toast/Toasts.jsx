import { useContext } from 'react';
import { ToastContext } from './ToastContext';

const Toasts = () => {
    const { toasts } = useContext(ToastContext);

    return (
        <div
            style={{
                position: 'fixed',
                top: '10px',
                right: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                width: '200px',
                zIndex: 100,
            }}>
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    style={{
                        border: '1px solid #fff',
                        padding: '8px',
                        width: '100%',
                        color: '#fff',
                    }}>
                    {toast.text}
                </div>
            ))}
        </div>
    );
};

export default Toasts;
