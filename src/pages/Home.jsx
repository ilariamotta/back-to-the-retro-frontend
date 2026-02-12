import axios from "axios";
import HeroBento from "../components/HeroBento";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getProductImageUrl } from "../utils/imageUtils";

export default function Home() {
    const BACKEND = import.meta.env.VITE_BACKEND_URL
        ? import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "")
        : "http://localhost:3000";

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get(`${BACKEND}/retro/api/products?filter=discounted`)
            .then((resp) => {
                const risposta = resp.data.results || [];
                setProducts(risposta);
            })
            .catch(console.error);
    }, []);

    const getRandomThree = (arr) => {
        if (!arr || arr.length === 0) return [];
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
    };

    const randomThree = getRandomThree(products);

    return (
        <div className="space-y-10">
            {/* CONTAINER */}
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-8">
                {/* BENTOBOX */}
                <HeroBento />
                {/* PRODOTTI DEL GIORNO */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-start text-[#ff006e] mt-8 mb-6 drop-shadow-[0_0_8px_rgba(255,0,110,0.75)]">
                        PRODOTTI IN EVIDENZA
                    </h2>
                    {randomThree.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {randomThree.map((p, index) => (
                                <ProductCard product={p} key={index} />
                            ))}
                        </div>
                    )}
                </div>
                {/* PRODOTTI IN SCONTO */}
                <h1 className="text-3xl font-bold text-start text-[#ff006e] mt-8 mb-6 drop-shadow-[0_0_8px_rgba(255,0,110,0.75)]">
                    PRODOTTI IN SCONTO
                </h1>
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
    );
}
