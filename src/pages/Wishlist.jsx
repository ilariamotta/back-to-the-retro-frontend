import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useWishList } from "../context/WhishListContext"
import { NavLink } from "react-router-dom";




export default function Wishlist() {
    const { wish, removeToList, clearList } = useWishList();
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        let total = 0;
        wish.forEach(item => {
            total += item.price * item.quantity;
        });
        setTotalAmount(total);
    }, [wish]);

    return (
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {/* TITOLO */}
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-[#6320EE] drop-shadow-[0_0_10px_rgba(99,32,238,0.65)]">
                        Wishlist
                    </h1>
                    <p className="mt-1 text-sm text-white">Ecco i prodotti che hai salvato!</p>
                </div>
            </div>

            {/* LAYOUT */}
            <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* BOX PRODOTTI */}
                <div className="lg:col-span-8">
                    {wish.length === 0 ? (
                        <div className="rounded-2xl border border-white/10 bg-[#211a1d] p-6 text-white">
                            <p className="text-sm text-zinc-200">
                                La wishlist è vuota. Vai ai prodotti e salva qualcosa ♡
                            </p>

                            <NavLink
                                to="/products"
                                className="mt-4 inline-flex rounded-xl border border-[#6320EE]/70 px-4 py-2 text-xs font-semibold text-[#6320EE] bg-transparent transition-all duration-300 hover:border-[#6320EE] hover:bg-[#6320EE]/10 hover:shadow-[0_0_16px_rgba(99,32,238,0.45)] hover:scale-[1.02] active:scale-[0.99]">
                                Vai ai prodotti
                            </NavLink>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {wish.map((wish) => (<ProductCard product={wish} key={wish.id} />))}
                        </div>
                    )}
                </div>

                {/* RIEPILOGO */}
                <div className="lg:col-span-4">
                    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Riepilogo</h2>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span>Articoli salvati</span>
                                <span className="font-bold">{wish.length}</span>
                            </div>

                            <div className="h-px bg-zinc-200" />

                            <div className="flex justify-between text-lg">
                                <span>Totale</span>
                                <span className="font-extrabold text-[#6C2BD9]">
                                    € {totalAmount.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            <button
                                className="w-full rounded-2xl bg-[#bb1717] px-5 py-4 text-sm font-extrabold text-[#1a1400] hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
                                onClick={() => { clearList(); }}
                                disabled={wish.length === 0}>
                                Svuota la wishlist
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}