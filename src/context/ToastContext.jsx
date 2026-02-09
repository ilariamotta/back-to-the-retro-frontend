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
  <div className="fixed bottom-6 right-6 z-50">
    <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-xl border border-violet-300 min-w-[300px]">

      {/* ICONA CERCHIO */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-violet-500 bg-white">
        <svg
          className="h-5 w-5 text-violet-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
        </svg>
      </div>

      {/* TESTO */}
      <div>
        {/* oggetto */}
      <p className="text-sm font-semibold text-zinc-800">
        {message}
      </p>
      {/* bottone */}
      <button className="ml-2 text-violet-600 hover:text-violet-800">
        Vedi il prodotto appena aggiunto 
      </button>
        </div>
    </div>
  </div>
)}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}



