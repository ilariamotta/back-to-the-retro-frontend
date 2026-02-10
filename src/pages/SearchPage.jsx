import { useEffect, useState } from "react";
import axios from "axios";
import SearchGames from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";

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

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  useEffect(() => {
    axios
      .get(`${addressIndex}retro/api/products`)
      .then((resp) => setProducts(resp.data.results))
      .catch(console.error);
  }, [addressIndex]);

  const querySearch = normalize(query);

  const filtered = querySearch
    ? products.filter((product) => {
      const name = normalize(product?.name || "");
      const platform = normalize(product?.platform || product?.platforms || "");
      const category = normalize(product?.category || "");
      const brand = normalize(product?.brand || "");

      return (
        name.includes(querySearch) ||
        platform.includes(querySearch) ||
        category.includes(querySearch) ||
        brand.includes(querySearch)
      );
    })
    : products;

  function handleSearch(value) {
    setSearchParams(value ? { q: value } : {});
  }

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-8 space-y-6">

      <SearchGames onSearch={handleSearch} initialValue={query} />

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
