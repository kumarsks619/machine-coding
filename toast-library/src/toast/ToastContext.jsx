import { createContext, useState } from 'react';

export const ToastContext = createContext({
    toasts: [],
    dispatchToast: () => {},
});

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const dispatchToast = (text) => {
        const newToast = {
            id: crypto.randomUUID(),
            text,
        };
        setToasts((prevToasts) => [...prevToasts, newToast]);
        setTimeout(() => {
            setToasts((prevToasts) =>
                prevToasts.filter((toast) => toast.id !== newToast.id)
            );
        }, 2000);
    };

    return (
        <ToastContext.Provider value={{ toasts, dispatchToast }}>
            {children}
        </ToastContext.Provider>
    );
};
