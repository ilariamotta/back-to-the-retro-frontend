import HeroBento from "../components/HeroBento";
import ProductCard from "../components/ProductCard";

const products = [
    { id: 1, name: "Sample Game A", price: 49.99, image: "https://via.placeholder.com/600x400.png?text=Game+A", description: "Descrizione breve A" },
    { id: 2, name: "Sample Console B", price: 299.99, image: "https://via.placeholder.com/600x400.png?text=Console+B", description: "Descrizione breve B" },
    { id: 3, name: "Accessory C", price: 19.99, image: "https://via.placeholder.com/600x400.png?text=Accessory+C", description: "Descrizione breve C" },
    { id: 3, name: "Accessory C", price: 19.99, image: "https://via.placeholder.com/600x400.png?text=Accessory+C", description: "Descrizione breve C" },
];

export default function Home() {
    return (
        <div className="space-y-10">
            {/* CONTAINER */}
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-8">
                {/* BENTOBOX */}
                <HeroBento />
                {/* TITOLO */}
                <h1 className="text-3xl font-bold text-start text-[#ff006e] mt-8 mb-6 drop-shadow-[0_0_8px_rgba(255,0,110,0.75)]">I NOSTRI PRODOTTI</h1>
                {/* GRIGLIA PRODOTTI */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                    {products.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
            </div>
        </div>
    );
}