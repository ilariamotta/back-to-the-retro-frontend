import { useNavigate } from "react-router-dom";
import { getProductImageUrl } from "../utils/imageUtils";

export default function ProductCard({ product }) {

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
                    <p className="text-lg font-bold text-[#ffd21f]">
                        €{product.price}
                    </p>

                    <button
                        onClick={details}
                        className="relative rounded-xl border border-[#00BFFF]/70 px-4 py-2 text-xs font-semibold text-[#00BFFF] bg-transparent transition-all duration-300 ease-out hover:border-[#00BFFF] hover:bg-[#00BFFF]/10 hover:shadow-[0_0_16px_rgba(0,191,255,0.45)] hover:scale-[1.04] active:scale-[0.97]">
                        DETTAGLI
                    </button>
                </div>
            </div>
        </div>
    );
}