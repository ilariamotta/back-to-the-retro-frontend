import { useCart } from "../context/CartContext";
import { getProductImageUrl } from "../utils/imageUtils";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

export default function CartItemCard({ item }) {
    const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

    // Gestione errore caricamento immagine
    const handleImageError = (e) => {
        e.target.src = "/images/placeholder_img.png";
    };

    return (
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm py-5 my-3">
            <div className="flex items-center gap-4">
                {/* Immagine */}
                <div className="h-20 w-24 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100">
                    <img
                        src={getProductImageUrl(item.cover_image)}
                        alt={item.name}
                        className="h-full w-full object-cover"
                        onError={handleImageError}
                    />
                </div>

                {/* Nome + prezzo */}
                <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-extrabold text-[#2a2f45]">{item.name}</p>
                    <p className="mt-1 text-lg font-extrabold text-[#6C2BD9]">€ {Number(item.price).toFixed(2)}</p>
                </div>
                {/* QUANTITA' */}
                <div className="flex items-center">
                    {/* bottone meno */}
                    <button onClick={() => decreaseQuantity(item.slug)} className={`h-10 w-10 flex items-center justify-center rounded-l-lg font-bold text-lg
                    ${item.quantity <= 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#ffd21f] text-[#1a1400] hover:brightness-110"}`} >
                        <FaMinus className="text-xs" /></button>
                    {/* quantità */}
                    <span className="h-10 min-w-10 flex items-center justify-center bg-zinc-100 px-3 text-xs font-bold text-zinc-700">{item.quantity}</span>
                    {/* bottone più */}
                    <button onClick={() => increaseQuantity(item.slug)} disabled={item.quantity >= item.stock} className={`h-10 w-10 flex items-center justify-center rounded-r-lg font-bold text-lg
                    ${item.quantity >= item.stock ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#ffd21f] text-[#1a1400] hover:brightness-110"}`}>
                        <FaPlus className="text-xs" />
                    </button>
                </div>
                {/* Bottone rimuovi */}
                <button
                    type="button"
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
                    onClick={() => removeFromCart(item.slug)}>
                    Rimuovi
                </button>
            </div>
        </div>
    );
}