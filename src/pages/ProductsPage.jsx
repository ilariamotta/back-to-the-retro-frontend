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
  const initialBrand = searchParams.get("brand") ?? "";

  const [min, setMin] = useState(initialMin);
  const [max, setMax] = useState(initialMax);
  const [sort, setSort] = useState(initialSort);
  const [platform, setPlatform] = useState(initialPlatform);
  const [brand, setBrand] = useState(initialBrand)
  const [products, setProducts] = useState([]);
  const [availablePlatforms, setAvailablePlatforms] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([])
  const minNumber = Number(min) || 0;
  const maxNumber = Number(max) || 400;

  // URL
  useEffect(() => {
    axios
      .get(`${BACKEND}/retro/api/platforms`)
      .then((resp) => {
        setAvailablePlatforms(resp.data.results || []);
      })
      .catch(console.error);

    axios.get(`${BACKEND}/retro/api/platforms/brands`).then((resp)=>{
      setAvailableBrands(resp.data.results || [])
    }).catch(console.error);
  }, [BACKEND]);

  useEffect(() => {
    const currentMin = searchParams.get("min") ?? "0";
    const currentMax = searchParams.get("max") ?? "400";
    const currentPlatform = searchParams.get("platform") ?? "";
    const currentBrand = searchParams.get("brand") ?? "";

    if (currentMin !== min || currentMax !== max || currentPlatform !== platform || currentBrand !== brand) {
      const params = new URLSearchParams();
      params.set("min", min === "" ? "0" : min);
      params.set("max", max === "" ? "400" : max);
      if (platform) params.set("platform", platform);
      if(brand) params.set("brand", brand)
      setSearchParams(params);
    }
  }, [min, max, platform, searchParams, setSearchParams, brand]);

  // CHIAMATA
  useEffect(() => {
    const timeout = setTimeout(() => {
      const platformParam = platform ? `&platform=${encodeURIComponent(platform)}` : "";
      const brandParam = brand ? `&brand=${encodeURI(brand)}` : "";
      axios
        .get(`${BACKEND}/retro/api/products?min=${minNumber}&max=${maxNumber}${platformParam}${brandParam}`)
        .then((resp) => setProducts(resp.data.results))
        .catch(console.error);
    }, 300);

    return () => clearTimeout(timeout);
  }, [minNumber, maxNumber, platform, BACKEND, brand]);

  useEffect(()=>{

  })

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
                  onClick={() => {
                    setMin("0");
                    setMax("400");
                    setPlatform("");
                    setBrand("")
                  }}
                  className="rounded-xl border border-[#FF006E]/70 px-4 py-2 text-xs font-extrabold text-[#FF006E] bg-transparent transition-all duration-300 hover:border-[#FF006E] hover:bg-[#FF006E]/10 hover:shadow-[0_0_16px_rgba(255,0,110,0.45)] active:scale-[0.97]">
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
                  {/* BRANDS  */}
                  <p className="text-xs font-extrabold tracking-wider text-[#00D084] mt-3">BRANDS</p>
                  <div className="relative mt-3">
                    <select
                      value={brand}
                      onChange={(e) => { setBrand(e.target.value) }}
                      className="
                      w-full rounded-xl border border-white/10 
                      bg-[#2b2427] text-white
                      px-4 py-3 text-sm font-semibold
                      outline-none transition-all duration-300
                      focus:border-[#00D084] focus:bg-[#00D084]/10
                      focus:shadow-[0_0_16px_rgba(0,208,132,0.45)]
                      appearance-none"
                    >
                      <option value="" className="bg-[#2b2427] text-white">TUTTI I BRAND</option>
                      {availableBrands.map((p)=>(
                        <option key={p.brand} value={p.brand} className="bg-[#2b2427] text-white"> {p.brand}</option>
                      ))}
                    </select>
                  </div>

                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                    <svg
                      width="18"
                      height="18"
                      fill="white"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      className="opacity-70">
                      <path d="M5.516 7.548l4.484 4.484 4.484-4.484L16 8.548l-6 6-6-6z" />
                    </svg>
                  </div>
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