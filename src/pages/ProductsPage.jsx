import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";

export default function ProductsPage() {
  const BACKEND = import.meta.env.VITE_BACKEND_URL
    ? import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "")
    : "http://localhost:3000";

  const [searchParams, setSearchParams] = useSearchParams();

  const initialMin = searchParams.get("min") ?? "0";
  const initialMax = searchParams.get("max") ?? "400";

  const [min, setMin] = useState(initialMin);
  const [max, setMax] = useState(initialMax);

  const [products, setProducts] = useState([]);
  
  const minNumber = Number(min) || 0;
  const maxNumber = Number(max) || 400;

  useEffect(() => {
    const currentMin = searchParams.get("min") ?? "0";
    const currentMax = searchParams.get("max") ?? "400";

    if (currentMin !== min || currentMax !== max) {
      const params = new URLSearchParams();
      params.set("min", min === "" ? "0" : min);
      params.set("max", max === "" ? "400" : max);
      setSearchParams(params);
    }
  }, [min, max, searchParams, setSearchParams]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      axios
        .get(`${BACKEND}/retro/api/products?min=${minNumber}&max=${maxNumber}`)
        .then((resp) => setProducts(resp.data.results))
        .catch(console.error);
    }, 300);

    return () => clearTimeout(timeout);
  }, [minNumber, maxNumber, BACKEND]);

  return (
    <>
      <div className="space-y-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-8">
          <h1 className="text-start text-3xl font-bold text-[#ff006e] mt-8 mb-6 drop-shadow-[0_0_8px_rgba(255,0,110,0.75)]">
            I NOSTRI PRODOTTI
          </h1>
          {/* FILTRI */}
          <div className="rounded-2xl border border-white/10 bg-[#211a1d] p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-white">Filtri</h2>
                <p className="text-sm text-zinc-300">
                  Seleziona un range di prezzo e (in seguito) brand/categoria.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-zinc-200">
                  Prezzo: € {minNumber} - € {maxNumber}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setMin("0");
                    setMax("400");
                  }}
                  className="rounded-xl border border-[#FF006E]/70 px-4 py-2 text-xs font-extrabold text-[#FF006E] bg-transparent transition-all duration-300 hover:border-[#FF006E] hover:bg-[#FF006E]/10 hover:shadow-[0_0_16px_rgba(255,0,110,0.45)] active:scale-[0.97]"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* FILTRO PREZZO */}
            <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-12">
              <div className="lg:col-span-7 rounded-2xl border border-white/10 p-4">
                <p className="text-xs font-extrabold tracking-wider text-[#6320EE]">
                  FILTRO PREZZO
                </p>

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {/* MIN */}
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-zinc-300">
                      Min (€)
                    </label>
                    <input
                      type="number"
                      value={min}
                      min={0}
                      className="w-full rounded-xl border border-[#6320EE]/70 bg-transparent px-3 py-3 text-sm font-semibold text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-[#6320EE] focus:bg-[#6320EE]/10 focus:shadow-[0_0_16px_rgba(99,32,238,0.45)]"
                      onChange={(e) => {
                        const v = e.target.value;
                        setMin(v); 
                      }}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-zinc-300">
                      Max (€)
                    </label>
                    <input
                      type="number"
                      value={max}
                      min={0}
                      className="w-full rounded-xl border border-[#6320EE]/70 bg-transparent px-3 py-3 text-sm font-semibold text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-[#6320EE] focus:bg-[#6320EE]/10 focus:shadow-[0_0_16px_rgba(99,32,238,0.45)]"
                      onChange={(e) => {
                        const v = e.target.value;
                        setMax(v);
                      }}
                    />
                  </div>
                </div>

                <p className="mt-3 text-xs text-zinc-400">
                  Suggerimento: imposta un max più alto se aggiungi prodotti costosi.
                </p>
              </div>

              {/* BRAND placeholder */}
              <div className="lg:col-span-5 rounded-2xl border border-white/10 p-4">
                <p className="text-xs font-extrabold tracking-wider text-[#00D084]">
                  BRAND
                </p>

                <div className="mt-3 rounded-2xl border border-dashed border-white/10 bg-transparent p-4 text-sm text-zinc-300">
                  Qui ci mettiamo una select o chips dei brand (Nintendo, Sony, ecc.)
                </div>
              </div>
            </div>
          </div>

          {/* GRIGLIA PRODOTTI */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {products.map((p, index) => (
              <ProductCard product={p} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
