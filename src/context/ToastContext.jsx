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
      variant: options.variant || "cart",
      link: options.link || null,
      linkLabel: options.linkLabel || null,
    });

    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // COLORI VARIANTI
  const variantMap = {
    // AZZURRO → CARRELLO
    cart: {
      border: "border-[#00BFFF]/60",
      glow: "shadow-[0_0_22px_rgba(0,191,255,0.35)]",
      iconRing: "border-[#00BFFF]",
      iconBg: "bg-white",
      iconColor: "text-[#00BFFF]",
      text: "text-[#00BFFF]",
      textGlow: "drop-shadow-[0_0_6px_rgba(0,191,255,0.45)]",
      link: "text-[#00BFFF] hover:text-[#009acd]",
      linkGlow: "drop-shadow-[0_0_6px_rgba(0,191,255,0.45)]",
    },

    // VIOLA → WISHLIST ADD
    wishlistAdd: {
      border: "border-[#6320EE]/60",
      glow: "shadow-[0_0_22px_rgba(99,32,238,0.35)]",
      iconRing: "border-[#6320EE]",
      iconBg: "bg-white",
      iconColor: "text-[#6320EE]",
      text: "text-[#6320EE]",
      textGlow: "drop-shadow-[0_0_6px_rgba(99,32,238,0.45)]",
      link: "text-[#6320EE] hover:text-[#4c16b5]",
      linkGlow: "drop-shadow-[0_0_6px_rgba(99,32,238,0.45)]",
    },

    // GIALLO → REMOVE
    remove: {
      border: "border-[#ffe417]/60",
      glow: "shadow-[0_0_22px_rgba(255,228,23,0.35)]",
      iconRing: "border-[#ffe417]",
      iconBg: "bg-white",
      iconColor: "text-[#b89c00]",
      text: "text-[#b89c00]",
      textGlow: "drop-shadow-[0_0_6px_rgba(255,228,23,0.45)]",
      link: "text-[#b89c00] hover:text-[#8f7a00]",
      linkGlow: "drop-shadow-[0_0_6px_rgba(255,228,23,0.45)]",
    },
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <div className="fixed bottom-6 right-6 z-50">
          {(() => {
            const v = variantMap[toast.variant] || variantMap.cart;
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



