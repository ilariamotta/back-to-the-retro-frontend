import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useToast } from "../context/ToastContext";
import { useWish } from "../context/WishListContext";
import { getProductImageUrl } from "../utils/imageUtils";


export default function Wishlist() {
  const { wish, removeFromWish, increaseQuantityWish, decreaseQuantityWish, clearWish } = useWish();
  const { showToast } = useToast();

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let total = 0;
    wish.forEach((item) => {
      total += Number(item.price || 0) * Number(item.quantity || 1);
    });
    setTotalAmount(total);
  }, [wish]);

  const handleClearWish = () => {
    clearWish();
    showToast("Wishlist svuotata", {
      variant: "error",
      link: "/products",
      linkLabel: "Torna ai prodotti",
    });
  };

  const handleRemoveOne = (item) => {
    removeFromWish(item.slug);
    showToast(`${item.name} rimosso dalla wishlist`, {
      variant: "error",
      link: "/products/" + item.slug,
      linkLabel: "Rivedi il prodotto",
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* HEADER */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#6320EE] drop-shadow-[0_0_10px_rgba(99,32,238,0.65)]">
            Wishlist
          </h1>
          <p className="mt-1 text-sm text-white">
            I prodotti che hai salvato:
          </p>
        </div>
      </div>

      {/* LAYOUT */}
      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* BOX PRODOTTI */}
        <div className="lg:col-span-8">
          {wish.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#211a1d] p-6 text-white">
              <p className="text-sm text-zinc-200">
                La wishlist è vuota. Vai ai prodotti e salva qualcosa ♡
              </p>

              <NavLink
                to="/products"
                className="mt-4 inline-flex rounded-xl border border-[#6320EE]/70 px-4 py-2 text-xs font-semibold text-[#6320EE] bg-transparent transition-all duration-300 hover:border-[#6320EE] hover:bg-[#6320EE]/10 hover:shadow-[0_0_16px_rgba(99,32,238,0.45)] hover:scale-[1.02] active:scale-[0.99]"
              >
                Vai ai prodotti
              </NavLink>
            </div>
          ) : (
            wish.map((item) => {
              const price = Number(item.price || 0);
              const qty = Number(item.quantity || 1);

              return (
                <div
                  key={item.slug}
                  className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm py-5 my-3"
                >
                  <div className="flex items-center gap-4">
                    {/* Immagine */}
                    <div className="h-20 w-24 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100">
                      <img
                        src={getProductImageUrl(item.cover_image)}
                        alt={item.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.src = "/images/placeholder_img.png";
                        }}
                      />
                    </div>

                    {/* Nome + prezzo */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-base font-extrabold text-[#2a2f45]">
                        {item.name}
                      </p>

                      <div className="mt-2">
                        <span className="block text-lg font-bold text-[#ffe417]">
                          € {price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* QUANTITA' */}
                    <div className="flex items-center">
                      <button
                        onClick={() => decreaseQuantityWish(item.slug)}
                        disabled={qty <= 1}
                        className={`h-10 w-10 flex items-center justify-center rounded-l-lg font-bold text-lg
                          ${
                            qty <= 1
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-[#ffd21f] text-[#1a1400] hover:brightness-110"
                          }`}
                      >
                        <FaMinus className="text-xs" />
                      </button>

                      <span className="h-10 min-w-10 flex items-center justify-center bg-zinc-100 px-3 text-xs font-bold text-zinc-700">
                        {qty}
                      </span>

                      <button
                        onClick={() => increaseQuantityWish(item.slug)}
                        className="h-10 w-10 flex items-center justify-center rounded-r-lg font-bold text-lg bg-[#ffd21f] text-[#1a1400] hover:brightness-110"
                      >
                        <FaPlus className="text-xs" />
                      </button>
                    </div>

                    {/* Rimuovi */}
                    <button
                      type="button"
                      className="
                        shrink-0
                        rounded-2xl
                        border-2 border-[#FF006E]
                        bg-transparent
                        px-4 py-3
                        text-xs font-extrabold tracking-wide
                        text-[#FF006E]
                        transition-all duration-300
                        hover:bg-[#FF006E]/10
                        hover:shadow-[0_0_16px_rgba(255,0,110,0.35)]
                        active:scale-[0.99]
                      "
                      onClick={() => handleRemoveOne(item)}
                    >
                      Rimuovi
                    </button>
                  </div>

                  {/* (opzionale) totale riga */}
                  <div className="mt-4 flex items-center justify-between rounded-xl bg-zinc-50 px-4 py-3">
                    <p className="text-xs font-semibold text-zinc-600">
                      Totale articolo
                    </p>
                    <p className="text-sm font-extrabold text-zinc-900">
                      € {(price * qty).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* RIEPILOGO */}
        <div className="lg:col-span-4">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Riepilogo</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Articoli salvati</span>
                <span className="font-bold">{wish.length}</span>
              </div>

              <div className="h-px bg-zinc-200" />

              <div className="flex justify-between text-lg">
                <span>Totale</span>
                <span className="font-extrabold text-[#6C2BD9]">
                  € {totalAmount.toFixed(2)}
                </span>
              </div>
            </div>

            {/* BOTTONI */}
            <div className="mt-6 space-y-3">
              <button className="w-full rounded-2xl bg-[#00D084] px-5 py-4 text-sm font-extrabold text-[#06251c] hover:brightness-110">
                <NavLink to="/products">Continua lo shopping</NavLink>
              </button>

              <button
                className="w-full rounded-2xl bg-[#bb1717] px-5 py-4 text-sm font-extrabold text-[#1a1400] hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleClearWish}
                disabled={wish.length === 0}
              >
                Svuota la wishlist
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}