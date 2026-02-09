import { useEffect, useState } from "react";
import axios from "axios";
import SearchGames from "../components/SearchBar";
import ProductCard from "../components/ProductCard";



function normalize(text = "") {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}


export default function SearchPage() {
  const addressIndex = import.meta.env.VITE_BACKEND_URL;

  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");


  useEffect(() => {
    axios
      .get(`${addressIndex}retro/api/products`)
      .then((resp) => setProducts(resp.data.results))
      .catch(console.error);
  }, []);

  const querySearch = query.trim().toLowerCase();

  const filtered = querySearch
    ? products.filter((product) => {
      const name = normalize((product?.name || "").toLowerCase());
      const platform = normalize((product?.platform || product?.platforms || "").toLowerCase());
      const category = normalize((product?.category || "").toLowerCase());
      const brand = normalize((product?.brand || "").toLowerCase());

      return (
        name.includes(querySearch) ||
        platform.includes(querySearch) ||
        category.includes(querySearch) ||
        brand.includes(querySearch)
      );
    })
    : products;

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* SEARCHBAR */}
      <SearchGames query={query} setQuery={setQuery} />

      {/* RISULTATI */}
      <div>
        {filtered.length === 0 ? (
          <h1 className="text-xl font-bold text-zinc-500">
            Nessun prodotto trovato, ci dispiace :\
          </h1>
        ) : (
          <h1 className="text-xl font-bold text-[#6C2BD9]">
            RISULTATI ({filtered.length})
          </h1>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}