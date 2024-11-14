import React, { createContext, useContext, useRef } from 'react';
import { Toast, ToastMessage } from 'primereact/toast';
import { Toast as ToastType } from 'primereact/toast';

// Define the context type
interface ToastContextType {
  showToast: (message: ToastMessage) => void;
}

// Create the context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Create a provider component
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toast = useRef<ToastType>(null);

  // Function to show toast messages
  const showToast = (message: ToastMessage) => {
    toast.current?.show(message);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toast} />
      {children}
    </ToastContext.Provider>
  );
};

// Custom hook to use the Toast context
export const useToast = () => useContext(ToastContext);
