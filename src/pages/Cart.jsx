import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

export default function Cart() {
    const { cart } = useCart();
    const [subTotal, setSubtotal] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() => {
        let total = 0;
        const shippingCost = 6.0;
        cart.forEach(item => {
            total += item.price * item.quantity;
        });
        setSubtotal(total);
        if (total > 100) {
            setTotalAmount(total); // free shipping
        } else {
            setTotalAmount(total + shippingCost);
        }
    }, [cart]);
    return (
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {/* HEADER */}
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-[#2a2f45]">
                        Carrello
                    </h1>
                    <p className="mt-1 text-sm text-zinc-600">
                        Riepilogo prodotti nel carrello:
                    </p>
                </div>
            </div>
            {/* LAYOUT */}
            <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* BOX PRODOTTI */}
                <div className="lg:col-span-8">
                    {cart.map((item, index) => (
                        <CartItem item={item} key={index} />
                    ))}
                </div>
                {/* RIEPILOGO */}
                <div className="lg:col-span-4">
                    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Riepilogo</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span>Subtotale</span>
                                <span className="font-bold">€ {subTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Spedizione</span>
                                <span className="font-bold">
                                    {subTotal > 100 ? "Gratis" : "€ 6.00"}
                                </span>
                            </div>
                            <div className="h-px bg-zinc-200" />
                            <div className="flex justify-between text-lg">
                                <span>Totale</span>
                                <span className="font-extrabold text-[#6C2BD9]">
                                    € {totalAmount.toFixed(2)}
                                </span>
                            </div>
                        </div>
                        {/* BOTTONI */}
                        <div className="mt-6 space-y-3">
                            <button className="w-full rounded-2xl bg-[#00D084] px-5 py-4 text-sm font-extrabold text-[#06251c] hover:brightness-110">
                                Procedi al checkout
                            </button>
                            <button className="w-full rounded-2xl bg-[#FFD21F] px-5 py-4 text-sm font-extrabold text-[#1a1400] hover:brightness-110">
                                Acquista ora!
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
