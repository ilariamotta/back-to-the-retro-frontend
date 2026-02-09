import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
import { useCart } from "../context/CartContext";
import { getProductImageUrl } from "../utils/imageUtils";
import { useWish } from "../context/WhishListContext";
export default function ProductDetail() {
  const { addToCart, cart } = useCart();

  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const BACKEND = import.meta.env.VITE_BACKEND_URL
    ? import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "")
    : `http://localhost:${import.meta.env.VITE_BACKEND_PORT || 3000}`;

  useEffect(() => { console.log("Cart updated:", cart); }, [cart]);

  useEffect(() => {
    setLoading(true);
    axios.get(`${BACKEND}/retro/api/products/${slug}`)
      .then((response) => {
        console.log(response);

        setProduct(response.data.results || response.data.result || null);
      })
      .catch((error) => {
        console.error("Errore nel recupero prodotto", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);



  // Gestione errore caricamento immagine
  const handleImageError = (e) => {
    e.target.src = "/images/placeholder_img.png";
  };

  if (loading) {
    return <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">Loading...</div>;
  }

  if (!product) {
    return <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">Prodotto non trovato</div>;
  }
  const prezzo = Number(product[0].price); // prezzo normale
  const sconto = Number(product[0].discounted_price || 0); // sconto (0 se null)
  const prezzoScontato = prezzo - sconto; // prezzo finale

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* DETTAGLI PAGINA */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
        <NavLink to="/" className="cursor-pointer hover:text-zinc-900 text-white">Ritorna alla Home</NavLink>
        <span className="text-zinc-300 text-white">/</span>
        <span className="cursor-pointer hover:text-zinc-900 text-white">{product[0].category}</span>
        <span className="text-zinc-300 text-white">/</span>
        <span className="font-medium text-zinc-900 text-white">
          {product[0].name}
        </span>
      </div>

      {/* LAYOUT PAGINA */}
      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* IMMAGINI */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            {/* Immagine principale */}
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100">
              <img
                src={getProductImageUrl(product[0].cover_image)}
                alt={product[0].name}
                className="aspect-[4/3] w-full object-cover"
                onError={handleImageError}
              />
            </div>

            {/* IMMAGINI SOTTO */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100">
                <img
                  src={getProductImageUrl(product[0].cover_image)}
                  alt={product[0].name}
                  className="aspect-[4/3] w-full object-cover"
                  onError={handleImageError}
                />
              </div>
              <div className="flex items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white text-sm text-zinc-500">
                Slot immagine
              </div>
            </div>
          </div>
        </div>

        {/* DETTAGLI PRODOTTO */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            {/* Titolo */}
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#2a2f45]">
              {product[0].name}
            </h1>

            {/* Prezzo */}
            <div className="mt-4 flex flex-wrap items-end gap-3">
              {/* <p className="text-4xl font-extrabold text-[#6C2BD9]">€ {product[0].price}</p> */}
              <p>
                {/* prezzo originale  */}
                <p>
                  {/* prezzo originale */}
                  <span
                    className={
                      product[0].discounted_price !== null
                        ? "text-lg font-bold text-[#ffe417] line-through"
                        : "hidden"
                    }
                  >
                    € {prezzo.toFixed(2)}
                  </span>
                  <br />

                  {/* prezzo scontato (o normale se non c'è sconto) */}
                  <span
                    className={
                      product[0].discounted_price !== null
                        ? "text-lg font-bold text-[#fe0000]"
                        : "text-lg font-bold text-[#ffe417]"
                    }
                  >
                    € {prezzoScontato.toFixed(2)}
                  </span>
                </p>

              </p>
            </div>

            {/* Stock */}
            <div className="mt-4 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#00D084]" />
              <p className="text-sm font-semibold text-[#00D084]">
                {product[0].stock} in stock
              </p>
            </div>

            {/* Descrizione */}
            <p className="mt-4 text-sm leading-relaxed text-zinc-600">
              {product[0].description}
            </p>
            <p className="">Stato: <span className="">{product[0].state}</span></p>
            <p>{product[0].state_description}</p>
            {/* Altre info */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm my-4">
              <div className="rounded-xl border bg-zinc-50 px-3 py-2">
                <p className="text-xs text-zinc-500">Piattaforma</p>
                <p className="font-semibold text-zinc-900">{product[0].platform}</p>
              </div>
              <div className="rounded-xl border bg-zinc-50 px-3 py-2">
                <p className="text-xs text-zinc-500">Brand</p>
                <p className="font-semibold text-zinc-900">{product[0].brand}</p>
              </div>
            </div>

            {/* BOTTONI */}
            {/* carrello */}

            <button
              type="button"
              className="w-full my-2 rounded-2xl bg-[#FFD21F] px-5 py-4 text-sm font-extrabold tracking-wide text-[#1a1400] shadow-sm transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_20px_rgba(255,210,31,0.45)] active:scale-[0.99]"
              onClick={() => addToCart({
                id: product[0].id,
                slug: product[0].slug,
                name: product[0].name,
                price: product[0].discounted_price !== null ? product[0].price - product[0].discounted_price : product[0].price,
                stock: product[0].stock,
                cover_image: product[0].cover_image,
              })}
            >
              Aggiungilo al carrello! 🛒
            </button>



            {/*acquista */}
            <button type="button" className=" w-full  my-2 rounded-2xl bg-[#00D084] px-5 py-4 text-sm font-extrabold tracking-wide text-[#06251c] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_20px_rgba(0,208,132,0.45)] active:scale-[0.99] hover:brightness-110 hover:shadow-[0_0_20px_rgba(0,208,132,0.45)] active:scale-[0.99]">
              ACQUISTALO ORA!
            </button>

            {/* wishlist */}
            <button
              onClick={() => addToWish({
                id: product[0].id,
                slug: product[0].slug,
                name: product[0].name,
                price: product[0].discounted_price !== null ? product[0].price - product[0].discounted_price : product[0].price,
                stock: product[0].stock,
                cover_image: product[0].cover_image,
              })}
              type="button"
              className="w-full my-2 rounded-2xl border-2 border-[#FF006E] bg-transparent px-5 py-4 text-sm tracking-wide text-[#FF006E] transition-all duration-300 hover:bg-[#FF006E]/10 hover:shadow-[0_0_20px_rgba(255,0,110,0.45)] hover:scale-[1.02] active:scale-[0.98]">
              Aggiungilo ai tuoi preferiti ♡
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}