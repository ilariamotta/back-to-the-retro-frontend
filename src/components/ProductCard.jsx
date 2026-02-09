import { useNavigate } from "react-router-dom";
import { getProductImageUrl } from "../utils/imageUtils";
import { useCart } from "../context/CartContext";
import { FaRegHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useToast } from "../context/ToastContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { showToast } = useToast();

  function details() {
    navigate(`/products/${product.slug}`);
  }

  const handleImageError = (e) => {
    e.target.src = "/images/placeholder_img.png";
  };

  const hasDiscount = product.discounted_price !== null && product.discounted_price !== undefined;
  const finalPrice = hasDiscount ? product.price - product.discounted_price : product.price;

  const handleAddToCart = () => {
    const productToAdd = {
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: finalPrice,
      stock: product.stock,
      cover_image: product.cover_image,
    };

    

    if (!product.id) {
      console.error('❌ ERRORE: Prodotto senza ID!', product);
      alert('Errore: Prodotto senza ID. Ricarica la pagina.');
      return;
    }

    addToCart(productToAdd);
    showToast(`${product.name} aggiunto al carrello!`);
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#211a1d] shadow-sm transition hover:shadow-lg hover:scale-[1.01]">
      {/* IMMAGINE */}
      <div className="relative">
        <img
          src={getProductImageUrl(product.cover_image)}
          alt={product.name}
          className="h-65 w-full object-cover transition duration-300 group-hover:scale-105"
          onError={handleImageError}
        />
        <div className="pointer-events-none absolute inset-0 from-black/40 via-black/0 to-black/0" />

        {/* WISHLIST */}
        <button
          type="button"
          className="absolute right-2 top-2 px-2 py-1"
        >
          <FaRegHeart className="text-lg text-s font-semibold text-[#ff0000] bg-transparent transition-all duration-300 hover:border-[#ff0000] hover:bg-[#ff0000]/10 hover:shadow-[0_0_16px_rgba(255,0,0,0.45)] hover:scale-[1.04] active:scale-[0.97]" />
        </button>
      </div>

      {/* CONTENUTO */}
      <div className="p-4">
        {/* titolo prodotto */}
        <h3 className="mb-1 line-clamp-2 text-base font-semibold text-[#ff006e]">
          {product.name}
        </h3>

        {/* descrizione */}
        <p className="mb-3 line-clamp-2 text-sm text-zinc-300">
          {product.description}
        </p>

        {/* PREZZO + BOTTONI */}
        <div className="mt-2">
          {/* prezzo originale (se scontato) */}
          {hasDiscount && (
            <span className="block text-lg font-bold text-[#ffe417] line-through">
              € {product.price}
            </span>
          )}

          {/* prezzo finale */}
          <span className={hasDiscount ? "text-lg font-bold text-[#fe0000]" : "text-lg font-bold text-[#ffe417]"}>
            € {parseFloat(finalPrice).toFixed(2)}
          </span>

          {/* BOTTONI: STESSA RIGA SOTTO IL PREZZO */}
          <div className="mt-3 flex items-center justify-between gap-3">
            <button
              onClick={details}
              className="rounded-xl border border-[#6320EE]/70 py-2 px-2 text-xs font-semibold text-[#6320EE] bg-transparent transition-all duration-300 hover:border-[#6320EE] hover:bg-[#6320EE]/10 hover:shadow-[0_0_16px_rgba(99,32,238,0.45)] hover:scale-[1.04] active:scale-[0.97]"
            >
              <FaPlus className="mr-1 inline" /> Dettagli
            </button>

            <button
              onClick={() => {
                handleAddToCart();
                showToast(`${product.name} aggiunto al carrello!`);
              }}
              className="relative rounded-xl border border-[#00D084]/70 px-4 py-2 text-xs font-semibold text-[#00D084] bg-transparent transition-all duration-300 ease-out hover:border-[#00D084] hover:bg-[#00D084]/10 hover:shadow-[0_0_16px_rgba(0,208,132,0.45)] hover:scale-[1.04] active:scale-[0.97]"
            >
              Aggiungi al carrello
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}