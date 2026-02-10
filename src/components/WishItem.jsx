import { FaPlus, FaMinus } from "react-icons/fa";
import { useWish } from "../context/WishListContext"; 
import { useToast } from "../context/ToastContext";
import { getProductImageUrl } from "../utils/imageUtils";

export default function WishItem({ item }) {
  const { removeFromWish, increaseQuantityWish, decreaseQuantityWish } = useWish();
  const { showToast } = useToast();

  const price = Number(item?.price ?? 0);
  const qty = Number(item?.quantity ?? 1);

  const handleRemove = () => {
    removeFromWish(item.slug);

    showToast(`${item.name} rimosso dalla wishlist`, {
      variant: "error",
      link: "/products/" + item.slug,
      linkLabel: "Rivedi il prodotto",
    });
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm py-5 my-3">
      <div className="flex items-center gap-4">
        {/* immagine */}
        <div className="h-20 w-24 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100">
          <img
            src={getProductImageUrl(item.cover_image)}
            alt={item.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.src = "/images/placeholder_img.png";
            }}
          />
        </div>

        {/* nome + prezzo */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-extrabold text-[#2a2f45]">
            {item.name}
          </p>

          <div className="mt-2">
            <span className="block text-lg font-bold text-[#ffe417]">
              € {price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* quantità */}
        <div className="flex items-center">
          <button
            onClick={() => decreaseQuantityWish(item.slug)}
            disabled={qty <= 1}
            className={`h-10 w-10 flex items-center justify-center rounded-l-lg font-bold text-lg
              ${qty <= 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#ffd21f] text-[#1a1400] hover:brightness-110"
              }`}
          >
            <FaMinus className="text-xs" />
          </button>

          <span className="h-10 min-w-10 flex items-center justify-center bg-zinc-100 px-3 text-xs font-bold text-zinc-700">
            {qty}
          </span>

          <button
            onClick={() => increaseQuantityWish(item.slug)}
            disabled={item.stock != null && qty >= item.stock}
            className={`h-10 w-10 flex items-center justify-center rounded-r-lg font-bold text-lg
              ${item.stock != null && qty >= item.stock
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#ffd21f] text-[#1a1400] hover:brightness-110"
              }`}
          >
            <FaPlus className="text-xs" />
          </button>
        </div>

        {/* rimuovi */}
        <button
          type="button"
          onClick={handleRemove}
          className="
            shrink-0
            rounded-2xl
            border-2 border-[#FF006E]
            bg-transparent
            px-4 py-3
            text-xs font-extrabold tracking-wide
            text-[#FF006E]
            transition-all duration-300
            hover:bg-[#FF006E]/10
            hover:shadow-[0_0_16px_rgba(255,0,110,0.35)]
            active:scale-[0.99]
          "
        >
          Rimuovi
        </button>
      </div>

      {/* totale riga */}
      <div className="mt-4 flex items-center justify-between rounded-xl bg-zinc-50 px-4 py-3">
        <p className="text-xs font-semibold text-zinc-600">Totale articolo</p>
        <p className="text-sm font-extrabold text-zinc-900">
          € {(price * qty).toFixed(2)}
        </p>
      </div>
    </div>
  );
}