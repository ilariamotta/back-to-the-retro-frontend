import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [message, setMessage] = useState("");

  const showToast = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {message && (
        <div className="fixed bottom-5 right-5 z-50">
          <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-lg border">
            <span className="text-green-600">✅</span>
            <p className="text-sm text-zinc-700">{message}</p>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}



