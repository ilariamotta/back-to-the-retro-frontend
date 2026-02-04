import ProductCard from "../components/ProductCard";

export default function Videogames() {
    return (
        <div className="space-y-10">
            {/* CONTAINER */}
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-8">
                {/* DETTAGLI PAGINA */}
                <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
                    <span className="cursor-pointer hover:text-zinc-900">Ritorna al negozio</span>
                    <span className="text-zinc-300">/</span>
                    <span className="cursor-pointer hover:text-zinc-900">Videogames</span>
                </div>
                {/* TITOLO */}
                <h1 className="text-3xl font-bold text-start text-[#ff006e] mt-8 mb-6 drop-shadow-[0_0_8px_rgba(255,0,110,0.75)]">VIDEOGIOCHI</h1>
                {/* GRIGLIA PRODOTTI */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                    {/* {products.map((p) => <ProductCard key={p.id} product={p} />)} */}
                </div>
            </div>
        </div>
    );
}