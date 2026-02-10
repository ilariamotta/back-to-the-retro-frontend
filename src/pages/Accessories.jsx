import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { NavLink } from "react-router-dom";

export default function Accessories() {
    const addressIndex = import.meta.env.VITE_BACKEND_URL;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`${addressIndex}retro/api/products?categories=Accessori`).then((resp) => {
            const risposta = resp.data.results || resp.data.result || [];
            setProducts(risposta);
        });
    }, []);
    return (
        <div className="space-y-10">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
                    <NavLink to={'/'} className="cursor-pointer hover:text-[#ffd21f]">Ritorna al negozio</NavLink>
                    <span className="text-zinc-300">/</span>
                    <span className="cursor-pointer hover:text-[#ffd21f]">Accessori</span>
                </div>
                <h1 className="text-3xl font-bold text-start text-[#ff006e] mt-8 mb-6 drop-shadow-[0_0_8px_rgba(255,0,110,0.75)]">ACCESSORI</h1>
                {products !== undefined ? 
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                    {products.map((p, index) => {
                        return (
                            <ProductCard product={p} key={index} />
                        )
                    })}
                </div>
                : <p>No products available</p>}
            </div>
        </div>
    );
}