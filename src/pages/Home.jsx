// import ClientDataForm from "../components/ClientDataForm";
import axios from "axios";
import HeroBento from "../components/HeroBento";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import SearchGames from "../components/SearchBar";



export default function Home() {

    const addressIndex = import.meta.env.VITE_BACKEND_URL;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`${addressIndex}retro/api/products`).then((resp) => {
            const risposta = resp.data.results
            setProducts(risposta)
        })
    }, [])


    
    
    return (
        <div className="space-y-4">
            {/* SEARCH BAR */}
        <SearchGames items={products} />
            {/* CONTAINER */}
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                {/* BENTOBOX */}
                <HeroBento />
                {/* TITOLO */}
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
    );
}