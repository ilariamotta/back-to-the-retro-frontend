// URL base del backend (da .env)
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    ? import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "")
    : `http://localhost:${import.meta.env.VITE_BACKEND_PORT || 3000}`;

// Percorso placeholder locale
const PLACEHOLDER_IMAGE = "/images/placeholder_img.png";

/**
 * Restituisce l'URL completo dell'immagine del prodotto
 * Se cover_image è null/undefined, restituisce il placeholder
 * 
 * @param {string} coverImage - Nome del file immagine (es: "super-mario-64.jpg")
 * @returns {string} - URL completo dell'immagine
 */
export function getProductImageUrl(coverImage) {
    // Se non c'è cover_image, usa placeholder
    if (!coverImage || coverImage.trim() === '') {
        return PLACEHOLDER_IMAGE;
    }

    // Restituisci URL dal backend
    return `${BACKEND_URL}/images/${coverImage}`;
}

/**
 * Componente img con fallback automatico al placeholder
 * Usa questo al posto di <img> normale
 */
export function ProductImage({ coverImage, alt, className, ...props }) {
    const [imgSrc, setImgSrc] = React.useState(getProductImageUrl(coverImage));

    // Se l'immagine non carica, mostra placeholder
    const handleError = () => {
        console.warn(`Immagine non trovata: ${coverImage}, uso placeholder`);
        setImgSrc(PLACEHOLDER_IMAGE);
    };

    return (
        <img
            src={imgSrc}
            alt={alt}
            className={className}
            onError={handleError}
            {...props}
        />
    );
}