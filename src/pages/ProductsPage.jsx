import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";


export default function ProductsPage() {

    const BACKEND = import.meta.env.VITE_BACKEND_URL
        ? import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "")
        : "http://localhost:3000";
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND}/retro/api/products`).then((resp) => {
            const risposta = resp.data.results
            setProducts(risposta)
        })
    }, [])


    return (
        <>
        <div className="space-y-10">
        {/* CONTAINER */}
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-8">
            {/* TITOLO PAGINA */}
            <h1 className="text-3xl font-bold text-start text-[#ff006e] mt-8 mb-6 drop-shadow-[0_0_8px_rgba(255,0,110,0.75)]">I NOSTRI PRODOTTI</h1>
            {/* GRIGLIA PRODOTTI */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {products.map((p, index) => {
            return (
            <ProductCard product={p} key={index} />
            )
            })}
              </div>
        </div>
        </div>
        </>    
    )
}