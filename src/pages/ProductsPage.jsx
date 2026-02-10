import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";


export default function ProductsPage() {

    const BACKEND = import.meta.env.VITE_BACKEND_URL
        ? import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "")
        : "http://localhost:3000";
    const [products, setProducts] = useState([]);

    const [min, setMin] = useState(0);
    const [max, setMax] = useState(400);


    useEffect(() => {
        axios.get(`${BACKEND}/retro/api/products?min=${isNaN(min) ? 0 : min}&max=${isNaN(max) ? 400 : max}`).then((resp) => {
            const risposta = resp.data.results
            setProducts(risposta)
        })
    }, [min, max])




    return (
        <>
            <div className="space-y-10">
                {/* CONTAINER */}
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-8">
                    {/* TITOLO PAGINA */}
                    <h1 className="text-start text-3xl font-bold text-[#ff006e] mt-8 mb-6 drop-shadow-[0_0_8px_rgba(255,0,110,0.75)]">I NOSTRI PRODOTTI</h1>

                    {/* FILTRI */}
<div className="rounded-2xl border border-white/10 bg-[#211a1d] p-5 shadow-sm">
  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
    {/* Titolo filtri */}
    <div>
      <h2 className="text-lg font-extrabold text-white">
        Filtri
      </h2>
      <p className="text-sm text-zinc-300">
        Seleziona un range di prezzo e (in seguito) brand/categoria.
      </p>
    </div>

    {/* Range preview + reset */}
    <div className="flex flex-wrap items-center gap-3">
      <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-zinc-200">
        Prezzo: € {Number(min || 0)} – € {Number(max || 400)}
      </span>

      <button
        type="button"
        onClick={() => { setMin(0); setMax(400); }}
        className="
          rounded-xl border border-[#FF006E]/70
          px-4 py-2 text-xs font-extrabold
          text-[#FF006E] bg-transparent
          transition-all duration-300
          hover:border-[#FF006E]
          hover:bg-[#FF006E]/10
          hover:shadow-[0_0_16px_rgba(255,0,110,0.45)]
          active:scale-[0.97]
        "
      >
        Reset
      </button>
    </div>
  </div>

  {/* Contenuto filtri */}
  <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-12">
    {/* Prezzo */}
    <div className="lg:col-span-7 rounded-2xl border border-white/10 p-4">
      <p className="text-xs font-extrabold tracking-wider text-[#6320EE]">
        FILTRO PREZZO
      </p>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold text-zinc-300">
            Min (€)
          </label>
          <input
            placeholder="0"
            type="number"
            value={min}
            min={0}
            className="
              w-full rounded-xl border border-[#6320EE]/70
              bg-transparent px-3 py-3 text-sm font-semibold
              text-white placeholder:text-zinc-500
              outline-none transition-all duration-300
              focus:border-[#6320EE]
              focus:bg-[#6320EE]/10
              focus:shadow-[0_0_16px_rgba(99,32,238,0.45)]
            "
            onChange={(e) => {
              const v = Number(e.target.value);
              setMin(Number.isFinite(v) ? Math.max(0, v) : 0);
            }}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-zinc-300">
            Max (€)
          </label>
          <input
            placeholder="400"
            type="number"
            value={max}
            min={0}
            className="
              w-full rounded-xl border border-[#6320EE]/70
              bg-transparent px-3 py-3 text-sm font-semibold
              text-white placeholder:text-zinc-500
              outline-none transition-all duration-300
              focus:border-[#6320EE]
              focus:bg-[#6320EE]/10
              focus:shadow-[0_0_16px_rgba(99,32,238,0.45)]
            "
            onChange={(e) => {
              const v = Number(e.target.value);
              setMax(Number.isFinite(v) ? Math.max(0, v) : 400);
            }}
          />
        </div>
      </div>

      {/* Nota */}
      <p className="mt-3 text-xs text-zinc-400">
        Suggerimento: imposta un max più alto se aggiungi prodotti costosi (console boxed ecc.).
      </p>
    </div>

    {/* Brand placeholder (per dopo) */}
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
                        {products.map((p, index) => {
                            return (
                                <ProductCard product={p} key={index} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}