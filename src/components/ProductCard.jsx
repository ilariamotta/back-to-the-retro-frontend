import { useNavigate } from "react-router-dom";
import { getProductImageUrl } from "../utils/imageUtils";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {

    const { addToCart } = useCart()
    const navigate = useNavigate()
    function details() {
        navigate(`/products/${product.slug}`)
    }

    // Gestione errore caricamento immagine
    const handleImageError = (e) => {
        e.target.src = "/images/placeholder_img.png";
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
                {/* ANIMAZIONE OVERLAY */}
                <div className="pointer-events-none absolute inset-0 from-black/40 via-black/0 to-black/0" />
            </div>

            {/* CONTENUTO */}
            <div className="p-4">
                {/* titolo prodotto */}
                <h3 className="mb-1 line-clamp-2 text-base font-semibold text-[#ff006e]">
                    {product.name}</h3>

                {/* descrizione */}
                <p className="mb-3 line-clamp-2 text-sm text-zinc-300">
                    {product.description}
                </p>

                {/* prezzo */}
                <div className="flex items-center justify-between">

                    <p>
                        {/* prezzo originale  */}
                        <span className={product.discounted_price !== null ? "text-lg font-bold text-[#ffe417] line-through" : "hidden"}>€ {product.price}<br /></span>

                        {/* prezzo scontato */}
                        <span className={product.discounted_price !== null ? "text-lg font-bold text-[#fe0000]" : "text-lg font-bold text-[#ffe417]"}>€ {product.price - product.discounted_price}</span>
                    </p>
                    
                    {/* BOTTONI PER IL CARELLO E DETTAGLI */}
                    <div className="flex flex-col">
                        <button
                            onClick={()=>addToCart({
                                id: product.id,
                                slug: product.slug,
                                name: product.name,
                                price: product.discounted_price !== null ? product.price - product.discounted_price : product.price,
                                stock: product.stock,
                                cover_image: product.cover_image,
                            })}
                            className="relative rounded-xl border border-[#00BFFF]/70 px-4 py-2 text-xs font-semibold text-[#00BFFF] bg-transparent transition-all duration-300 ease-out hover:border-[#00BFFF] hover:bg-[#00BFFF]/10 hover:shadow-[0_0_16px_rgba(0,191,255,0.45)] hover:scale-[1.04] active:scale-[0.97] mb-2">
                            CARRELLO
                        </button>
                        <button
                            onClick={details}
                            className="relative rounded-xl border border-[#00BFFF]/70 px-4 py-2 text-xs font-semibold text-[#00BFFF] bg-transparent transition-all duration-300 ease-out hover:border-[#00BFFF] hover:bg-[#00BFFF]/10 hover:shadow-[0_0_16px_rgba(0,191,255,0.45)] hover:scale-[1.04] active:scale-[0.97]">
                            DETTAGLI
                        </button>
                    </div>
                    {/* PULSANTE PER WHISHLIST */}
                    <button 
                    
                    className="absolute top-1 end-1 rounded-xl border border-[#fe0000]/70 px-4 py-2 text-xs font-semibold text-[#ff0000] bg-transparent transition-all duration-300 ease-out hover:border-[#d0ff00] hover:bg-[#fe0000]/10 hover:shadow-[0_0_16px_rgba(0,191,255,0.45)] hover:scale-[1.04] active:scale-[0.97]">like</button>
                </div>



            </div>
        </div >
    );
}