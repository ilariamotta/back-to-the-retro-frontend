import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { getProductImageUrl } from "../utils/imageUtils";
import { useToast } from "../context/ToastContext";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

export default function ProductDetail() {
  const { addToCart, cart } = useCart();
  const { slug } = useParams();
  const { showToast } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);

  const BACKEND = import.meta.env.VITE_BACKEND_URL
    ? import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "")
    : `http://localhost:${import.meta.env.VITE_BACKEND_PORT || 3000}`;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND}/retro/api/products/${slug}`)
      .then((response) => {
        const data = response.data.results || response.data.result;
        setProduct(data || null);
      })
      .catch((error) => console.error("Errore nel recupero prodotto", error))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleImageError = (e) => {
    e.target.src = "/images/placeholder_img.png";
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!product) return <div className="p-6">Prodotto non trovato</div>;

  const cartItem = cart.find((item) => item.id === product[0].id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;
  const remainingStock = product[0].stock - cartQuantity;

  if (!product) {
    return <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">Prodotto non trovato</div>;
  }
  const prezzo = Number(product[0].price); // prezzo normale
  const sconto = Number(product[0].discounted_price || 0); // sconto (0 se null)
  const prezzoScontato = prezzo - sconto; // prezzo finale
  const isOutOfStock = remainingStock <= 0;

  const increaseQuantity = () => {
    if (quantity < remainingStock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    const finalPrice =
      product[0].discounted_price !== null
        ? product[0].price - product[0].discounted_price
        : product[0].price;
    const productToAdd = {
      id: product[0].id,
      slug: product[0].slug,
      name: product[0].name,
      price: parseFloat(finalPrice),
      stock: product[0].stock,
      cover_image: product[0].cover_image,
      quantity: quantity,
    };
    addToCart(productToAdd);
    setQuantity(1);

    // ✅ sostituisce showPopup
    showToast(`${product[0].name} aggiunto al carrello!`, {
      link: "/carrello",
      linkLabel: "Vai al carrello",
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center gap-2 text-sm text-white">
        <NavLink to="/" className="hover:text-zinc-300">Ritorna alla Home</NavLink>
        <span>/</span>
        <span>{product[0].category}</span>
        <span>/</span>
        <span className="font-medium">{product[0].name}</span>
      </div>
      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* IMAGE */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="overflow-hidden rounded-2xl border bg-zinc-100">
              <img
                src={getProductImageUrl(product[0].cover_image)}
                alt={product[0].name}
                className="aspect-[4/3] w-full object-cover"
                onError={handleImageError}
              />
            </div>
          </div>
        </div>
        {/* DETAILS */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h1 className="mt-2 text-3xl font-extrabold text-[#2a2f45]">
              {product[0].name}
            </h1>

            {/* Prezzo */}
            <div className="mt-4 flex flex-wrap items-end gap-3">
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
            {/* STOCK */}
            <div className="mt-4 flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${remainingStock <= 0 ? "bg-[#fe0000]" : "bg-[#00D084]"}`}
              />
              <p
                className={`text-sm font-semibold ${remainingStock <= 0 ? "text-[#fe0000]" : "text-[#00D084]"}`}
              >
                {remainingStock <= 0 ? "Esaurito" : `${remainingStock} disponibili`}
              </p>
            </div>
            {/* DESCRIPTION */}
            <p className="mt-4 text-sm text-zinc-600">{product[0].description}</p>
            {/* QUANTITY SELECTOR */}
            <div className="flex items-center my-4">
              <button
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className={`h-10 w-10 flex items-center justify-center rounded-l-lg font-bold text-lg
                  ${quantity <= 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#ffd21f] text-[#1a1400] hover:brightness-110"}`}
              >
                <FaMinus className="text-xs" />
              </button>
              <span className="h-10 min-w-10 flex items-center justify-center bg-zinc-100 px-3 text-xs font-bold text-zinc-700">
                {quantity}
              </span>
              <button
                onClick={increaseQuantity}
                disabled={quantity >= remainingStock}
                className={`h-10 w-10 flex items-center justify-center rounded-r-lg font-bold text-lg
                  ${quantity >= remainingStock ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#ffd21f] text-[#1a1400] hover:brightness-110"}`}
              >
                <FaPlus className="text-xs" />
              </button>
            </div>
            <button
              type="button"
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              className={`w-full my-2 rounded-2xl px-5 py-4 text-sm font-extrabold tracking-wide shadow-sm transition-all duration-300 active:scale-[0.99]
                ${isOutOfStock
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#FFD21F] text-[#1a1400] hover:brightness-110 hover:shadow-[0_0_20px_rgba(255,210,31,0.45)]"
                }`}
            >
              {isOutOfStock ? "Non disponibile" : "Aggiungilo al carrello! 🛒"}
            </button>

          </div>
        </div>
      </section>
    </div>
  );
}
