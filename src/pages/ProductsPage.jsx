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
  const initialSort = searchParams.get("sort") ?? "";
  const initialPlatform = searchParams.get("platform") ?? "";

  const [min, setMin] = useState(initialMin);
  const [max, setMax] = useState(initialMax);
  const [sort, setSort] = useState(initialSort);
  const [platform, setPlatform] = useState(initialPlatform);

  const [products, setProducts] = useState([]);

  const minNumber = Number(min) || 0;
  const maxNumber = Number(max) || 400;

  // URL
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("min", min === "" ? "0" : min);
    params.set("max", max === "" ? "400" : max);
    if (sort) params.set("sort", sort);
    if (platform) params.set("platform", platform);
    setSearchParams(params);
  }, [min, max, sort, platform, setSearchParams]);

  // CHIAMATA
  useEffect(() => {
    const timeout = setTimeout(() => {
      axios
        .get(`${BACKEND}/retro/api/products?min=${minNumber}&max=${maxNumber}`)
        .then((resp) => setProducts(resp.data.results || []))
        .catch(console.error);
    }, 300);

    return () => clearTimeout(timeout);
  }, [minNumber, maxNumber, BACKEND]);

  // SCONTI
  const getFinalPrice = (p) => {
    const price = Number(p.price) || 0;
    const discount = p.discounted_price != null ? Number(p.discounted_price) : null;
    return discount != null ? price - discount : price;
  };

  // PIATTAFORME DISPONIBILI
  const availablePlatforms = Array.from(
    new Set(
      (products || [])
        .map((p) => p.platform ?? p.platforms)
        .filter((x) => typeof x === "string" && x.trim() !== "")
    )
  ).sort();

  // FILTRO PIATTAFORMA
  const filteredByPlatform = !platform
    ? products
    : products.filter((p) => (p.platform ?? p.platforms) === platform);

  // ORDINAMENTO
  const sortedProducts = [...filteredByPlatform].sort((a, b) => {
    if (sort === "asc") return getFinalPrice(a) - getFinalPrice(b);
    if (sort === "desc") return getFinalPrice(b) - getFinalPrice(a);
    return 0;
  });

  const resetAll = () => {
    setMin("0");
    setMax("400");
    setSort("");
    setPlatform("");
  };

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
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={resetAll}
                  className="rounded-xl border border-[#FF006E]/70 px-4 py-2 text-xs font-extrabold text-[#FF006E] bg-transparent transition-all duration-300 hover:border-[#FF006E] hover:bg-[#FF006E]/10 hover:shadow-[0_0_16px_rgba(255,0,110,0.45)] active:scale-[0.97]"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-12">
              {/* PREZZO */}
              <div className="lg:col-span-5 rounded-2xl border border-white/10 p-4">
                <p className="text-xs font-extrabold tracking-wider text-[#6320EE]">
                  FILTRO PREZZO
                </p>

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-zinc-300">
                      Min (€)
                    </label>
                    <input
                      type="number"
                      value={min}
                      min={0}
                      className="w-full rounded-xl border border-[#6320EE]/70 bg-transparent px-3 py-3 text-sm font-semibold text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-[#6320EE] focus:bg-[#6320EE]/10 focus:shadow-[0_0_16px_rgba(99,32,238,0.45)]"
                      onChange={(e) => setMin(e.target.value)}
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
                      onChange={(e) => setMax(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* PIATTAFORMA */}
              <div className="lg:col-span-4 rounded-2xl border border-white/10 p-4">
                <p className="text-xs font-extrabold tracking-wider text-[#00D084]">
                  PIATTAFORMA
                </p>

                <div className="relative mt-3">
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="
                      w-full rounded-xl border border-white/10 
                      bg-[#2b2427] text-white
                      px-4 pr-10 py-3 text-sm font-semibold
                      outline-none transition-all duration-300
                      focus:border-[#00D084] focus:bg-[#00D084]/10
                      focus:shadow-[0_0_16px_rgba(0,208,132,0.45)]
                      appearance-none">
                    <option value="" className="bg-[#2b2427] text-white">
                      Tutte le piattaforme
                    </option>

                    {availablePlatforms.map((name) => (
                      <option key={name} value={name} className="bg-[#2b2427] text-white">
                        {name}
                      </option>
                    ))}
                  </select>


                </div>
              </div>

              {/* ORDINAMENTO */}
              <div className="lg:col-span-3 rounded-2xl border border-white/10 p-4">
                <p className="text-xs font-extrabold tracking-wider text-[#00BFFF]">
                  ORDINA
                </p>

                <div className="mt-3">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#2b2427] text-white px-4 py-3 text-sm font-semibold outline-none transition-all duration-300 focus:border-[#00BFFF] focus:bg-[#00BFFF]/10 focus:shadow-[0_0_16px_rgba(0,191,255,0.45)]">
                    <option value="" className="bg-[#2b2427] text-white">
                      Nessun ordine</option>
                    <option value="asc" className="bg-[#2b2427] text-white">
                      Prezzo crescente</option>
                    <option value="desc" className="bg-[#2b2427] text-white">
                      Prezzo decrescente</option>
                  </select>
                </div>
              </div>

            </div>
          </div>

          {/* GRIGLIA PRODOTTI */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {sortedProducts.map((p) => (
              <ProductCard product={p} key={p.id ?? p.slug} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}