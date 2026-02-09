import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { getProductImageUrl } from "../utils/imageUtils";

export default function ProductDetail() {
  const { addToCart, cart } = useCart();
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

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
    if (remainingStock - quantity > 0) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
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
            {/* PRICE */}
            <div className="mt-4">
              {product[0].discounted_price !== null && (
                <span className="text-lg font-bold text-[#ffe417] line-through">
                  € {product[0].price}
                </span>
              )}
              <br />
              <span className="text-lg font-bold text-[#fe0000]">
                € {product[0].price - product[0].discounted_price}
              </span>
            </div>
            {/* STOCK */}
            <div className="mt-4 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#00D084]" />
              <p className="text-sm font-semibold text-[#00D084]">
                {remainingStock} disponibili
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
                -
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
                +
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
      {showPopup && (
        <div className="fixed bottom-6 right-6 bg-[#FFD21F] text-black px-4 py-3 rounded-xl shadow-lg font-bold animate-fade-in">
          Prodotto aggiunto al carrello! 🛒
        </div>
      )}
    </div>
  );
}
