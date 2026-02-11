import { useNavigate } from "react-router-dom";
import { getProductImageUrl } from "../utils/imageUtils";
import { FaHeart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { FaPlus } from "react-icons/fa";
import { useToast } from "../context/ToastContext";
import { useWishList } from "../context/WhishListContext";



export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { wish, addToWishList, removeToList } = useWishList();
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const isFav = wish.map(item => item.slug).includes(product.slug);


  function details() {
    navigate(`/products/${product.slug}`);
  }

  const handleImageError = (e) => {
    e.target.src = "/images/placeholder_img.png";
  };

  const basePrice = product.priceInitial ?? product.price;
  const hasDiscount = product.discounted_price !== null && product.discounted_price !== undefined;
  const finalPrice = hasDiscount ? basePrice - product.discounted_price : basePrice;

  const handleAddToCart = () => {
    const productToAdd = {
      id: product.id,
      slug: product.slug,
      name: product.name,
      priceInitial: product.price,
      price: finalPrice,
      stock: product.stock,
      cover_image: product.cover_image,
      discounted_price: product.discounted_price ?? null,
    };

    if (!product.id) {
      console.error('❌ ERRORE: Prodotto senza ID!', product);
      alert('Errore: Prodotto senza ID. Ricarica la pagina.');
      return;
    }

    addToCart(productToAdd);
  };

  const handleAddToWish = () => {
    const productToAddWish = {
      id: product.id,
      slug: product.slug,
      name: product.name,
      priceInitial: product.price,
      price: finalPrice,
      stock: product.stock,
      cover_image: product.cover_image,
      discounted_price: product.discounted_price ?? null,
    }
    if (!product.id) {
      console.error('❌ ERRORE: Prodotto senza ID!', product);
      alert('Errore: Prodotto senza ID. Ricarica la pagina.');
      return;
    }


    addToWishList(productToAddWish)

  }





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
          onClick={() => {
            if (isFav) {
              removeToList(product.slug);
              showToast(`${product.name} è stato rimosso dalla wishlist!`);
            } else {
              handleAddToWish();
              showToast(
                `${product.name} è stato aggiunto alla wishlist!`,
                {
                  link: `/wishlist`,
                  linkLabel: "Clicca qui per vedere la wishlist!",
                  image: getProductImageUrl(product.cover_image),
                }
              );
            }
          }}
        >
          <FaHeart
            className={
              "text-lg font-semibold transition-all duration-200 " +
              (isFav
                ? "text-[#ff0000] scale-110 drop-shadow-[0_0_8px_rgba(255,0,0,0.7)]"
                : "text-white/80 hover:text-[#ff0000] hover:scale-110")
            }
          />
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
              € {(product.priceInitial ?? product.price).toFixed ? (product.priceInitial ?? product.price).toFixed(2) : (product.priceInitial ?? product.price)}
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
                showToast(
                  `${product.name} è stato aggiunto al carrello!`,
                  {
                    link: `/carrello`,
                    linkLabel: "Clicca qui per vedere il carrello!",
                    image: getProductImageUrl(product.cover_image),
                  }
                );
              }}
              className="relative rounded-xl border border-[#00D084]/70 px-4 py-2 text-xs font-semibold text-[#00D084] bg-transparent transition-all duration-300 ease-out hover:border-[#00D084] hover:bg-[#00D084]/10 hover:shadow-[0_0_16px_rgba(0,208,132,0.45)] hover:scale-[1.04] active:scale-[0.97]">
              Aggiungi al carrello
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}