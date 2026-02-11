import ProductCard from "../components/ProductCard";
import { useWishList } from "../context/WhishListContext"




export default function Wishlist() {

    const { wish, removeToList, clearlist } = useWishList();

    console.log(wish);

    return (
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-start text-3xl font-bold text-[#ff006e] mt-8 mb-6 drop-shadow-[0_0_8px_rgba(255,0,110,0.75)]">I TUOI PREFERITI</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {wish.length === 0 ? <h2 className="text-start text-3xl font-bold text-[#ff006e] mt-8 mb-6 drop-shadow-[0_0_8px_rgba(255,0,110,0.75)]">NESSUN PRODOTTO AGGIUNTO ALLA LISTA</h2> : wish.map((product) => {
                    return (
                        <ProductCard product={product} />
                    )
                })}
            </div>
        </div>
    )
} 