import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";


export default function ProductsPage() {

    const BACKEND = import.meta.env.VITE_BACKEND_URL
        ? import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "")
        : "http://localhost:3000";
    const [products, setProducts] = useState([]);

    const [min, setMin] = useState(0);
    const [max, setMax] = useState(400);


    useEffect(() => {
        axios.get(`${BACKEND}/retro/api/products?min=${isNaN(min) ? 0 : min}&max=${isNaN(max) ? 400 : max}`).then((resp) => {
            const risposta = resp.data.results
            setProducts(risposta)
        })
    }, [min, max])




    return (
        <>
            <div className="space-y-10">
                {/* CONTAINER */}
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-8">
                    {/* TITOLO PAGINA */}
                    <h1 className="text-start text-3xl font-bold text-[#ff006e] mt-8 mb-6 drop-shadow-[0_0_8px_rgba(255,0,110,0.75)]">I NOSTRI PRODOTTI</h1>

                    {/* FILTRI PREZZO */}
                    <div className="grid grid-cols-2  rounded-2xl border border-white/10 bg-[#211a1d] gap-3">

                        <div className="flex flex-col">
                            <h2 className="text-3xl font-bold text-start text-[#ff006e] mb-3 drop-shadow-[0_0_8px_rgba(255,0,110,0.75)]">Ordina per prezzo</h2>

                            <input
                                placeholder="MIN"
                                id="minPrice"
                                type="number"
                                name="minimo"
                                className="mb-2 rounded-xl border border-[#6320EE]/70 py-2 px-2 text-xs font-semibold text-[#6320EE] bg-transparent transition-all duration-300 hover:border-[#6320EE] hover:bg-[#6320EE]/10 hover:shadow-[0_0_16px_rgba(99,32,238,0.45)] hover:scale-[1.04] active:scale-[0.97]"
                                onChange={(event) => { setMin(parseInt(event.target.value) < 0 ? 0 : parseInt(event.target.value)) }} />
                            <input
                                placeholder="MAX"
                                id="minPrice"
                                type="number"
                                name="massimo"
                                className="rounded-xl border border-[#6320EE]/70 py-2 px-2 text-xs font-semibold text-[#6320EE] bg-transparent transition-all duration-300 hover:border-[#6320EE] hover:bg-[#6320EE]/10 hover:shadow-[0_0_16px_rgba(99,32,238,0.45)] hover:scale-[1.04] active:scale-[0.97]"
                                onChange={(event) => setMax(parseInt(event.target.value) < 0 ? 400 : parseInt(event.target.value))} />



                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-3xl font-bold text-start text-[#ff006e] mb-3 drop-shadow-[0_0_8px_rgba(255,0,110,0.75)]">Seleziona il tuo brand preferito</h2>
                        </div>





                    </div>
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