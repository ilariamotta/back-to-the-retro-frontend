import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

export default function SearchGames({ items }) {
  const [query, setQuery] = useState("");

  const querySearch = query.trim().toLowerCase();

  const results = querySearch.length === 0 ? [] : items
          .filter((product) => (product?.name || "").toLowerCase().includes(querySearch))
          .slice(0, 12);

return (
<section className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
{/* BARRA */}
    <div className="
          w-full rounded-2xl
          border border-zinc-200 bg-white p-2 shadow-sm
          transition
          focus-within:border-[#00BFFF]
          focus-within:shadow-[0_0_20px_rgba(0,191,255,0.35)]
        "
      >
        <div className="flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-3">
          <span className="text-zinc-400"><FaSearch /></span>
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cerca un videogioco per titolo..." className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 outline-none"/>
        {query !== "" && (<button type="button"
              onClick={() => setQuery("")}
              className="
                rounded-xl border border-zinc-200 bg-white
                px-3 py-2 text-xs font-semibold text-zinc-700
                hover:bg-zinc-50
              "
            >
             <IoIosClose />
            </button>
          )}
        </div>
      </div>

      {/* RISULTATI */}
      <div className="mt-4">
        {querySearch.length === 0 ? (
          <p className="text-sm text-zinc-500">
            Inizia a digitare per vedere i risultati.
          </p>
        ) : results.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600 shadow-sm">
            Nessun risultato per:{" "}
            <span className="font-semibold text-zinc-900">"{query}"</span>
          </div>
        ) : (
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold tracking-wider text-[#6C2BD9]">
              RISULTATI ({results.length})
            </p>

            <ul className="mt-3 space-y-2">
              {results.map((product) => (
                <li
                  key={product.id ?? product.name}
                  className="
                    flex items-center justify-between gap-3
                    rounded-2xl border border-zinc-200 bg-zinc-50
                    px-4 py-3
                  "
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-extrabold text-[#2a2f45]">
                      {product.name}
                    </p>
                    {(product.platform || product.category) && (
                      <p className="mt-1 text-xs text-zinc-500">
                        {product.platform || product.category}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    className="
                      shrink-0 rounded-2xl
                      border border-[#00BFFF]/70
                      px-3 py-2 text-xs font-extrabold
                      text-[#00BFFF]
                      transition hover:bg-[#00BFFF]/10
                    "
                  >
                    SELEZIONA
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

