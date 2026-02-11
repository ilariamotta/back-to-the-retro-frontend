import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiConsoleController } from "react-icons/gi";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const showToast = (message, options = {}) => {
    setToast({
      message,
      variant: options.variant || "violet",
      link: options.link || null,
      linkLabel: options.linkLabel || null,
    });

    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // classi per varianti
  const variantMap = {
    violet: {
      border: "border-violet-400/60",
      glow: "shadow-[0_0_22px_rgba(124,58,237,0.35)]",
      iconRing: "border-violet-500",
      iconBg: "bg-white",
      iconColor: "text-violet-600",
      text: "text-violet-700",
      textGlow: "drop-shadow-[0_0_6px_rgba(124,58,237,0.45)]",
      link: "text-violet-600 hover:text-violet-800",
      linkGlow: "drop-shadow-[0_0_6px_rgba(124,58,237,0.45)]",
    },
    success: {
      border: "border-emerald-400/60",
      glow: "shadow-[0_0_22px_rgba(16,185,129,0.30)]",
      iconRing: "border-emerald-500",
      iconBg: "bg-white",
      iconColor: "text-emerald-600",
      text: "text-emerald-700",
      textGlow: "drop-shadow-[0_0_6px_rgba(16,185,129,0.40)]",
      link: "text-emerald-600 hover:text-emerald-800",
      linkGlow: "drop-shadow-[0_0_6px_rgba(16,185,129,0.40)]",
    },
    error: {
      border: "border-red-400/60",
      glow: "shadow-[0_0_22px_rgba(239,68,68,0.30)]",
      iconRing: "border-red-500",
      iconBg: "bg-white",
      iconColor: "text-red-600",
      text: "text-red-700",
      textGlow: "drop-shadow-[0_0_6px_rgba(239,68,68,0.40)]",
      link: "text-red-600 hover:text-red-800",
      linkGlow: "drop-shadow-[0_0_6px_rgba(239,68,68,0.40)]",
    },
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <div className="fixed bottom-6 right-6 z-50">
          {(() => {
            const v = variantMap[toast.variant];
            return (
              <div
                className={[
                  "flex items-center gap-4 rounded-2xl bg-white p-5 min-w-[320px]",
                  "border",
                  v.border,
                  v.glow,
                ].join(" ")}
              >
                {/* ICONA CERCHIO */}
                <div
                  className={[
                    "flex h-11 w-11 items-center justify-center rounded-full",
                    "border-2",
                    v.iconRing,
                    v.iconBg,
                  ].join(" ")}
                >
                  <GiConsoleController className={`h-6 w-6 ${v.iconColor}`} />
                </div>

                {/* TESTI */}
                <div className="min-w-0">
                  <p
                    className={[
                      "text-sm font-extrabold",
                      v.text,
                      v.textGlow,
                      "truncate",
                    ].join(" ")}
                  >
                    {toast.message}
                  </p>

                  {toast.link && (
                    <button
                      onClick={() => navigate(toast.link)}
                      className={[
                        "mt-1 text-sm font-semibold",
                        v.link,
                        v.linkGlow,
                        "hover:underline hover:underline-offset-4",
                      ].join(" ")}
                    >
                      {toast.linkLabel || "Apri"}
                    </button>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}



