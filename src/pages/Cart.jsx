import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useToast } from "../context/ToastContext";

export default function Cart() {
    const { cart, clearCart } = useCart();
    const [subTotal, setSubtotal] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const { showToast } = useToast();

    const handleClearCart = () => {
    clearCart();
    showToast("Carrello vuoto", {
    variant: "remove",
    link: "/products",
    linkLabel: "Torna ai nostri prodotti!",
  });
};

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
                    <h1 className="text-3xl font-extrabold tracking-tight text-[#6320EE] drop-shadow-[0_0_10px_rgba(99,32,238,0.65)]">
                    Carrello
                    </h1>
                    <p className="mt-1 text-sm text-white">
                        Riepilogo prodotti nel carrello:
                    </p>
                </div>
            </div>
            {/* LAYOUT */}
            <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* BOX PRODOTTI */}
                <div className="lg:col-span-8">
                    {cart.map((item) => (
                        <CartItem item={item} key={item.slug} />
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
                                <NavLink to="/checkout">Procedi al checkout</NavLink>
                            </button>
                            <button
                                className="w-full rounded-2xl bg-[#bb1717] px-5 py-4 text-sm font-extrabold text-[#1a1400] hover:brightness-110"
                                onClick={() => { clearCart(); handleClearCart(); }}
                            >
                                Svuota il carrello
                            </button>
                            <span className="text-sm text-gray-400">(La spedizione è gratuita per gli ordini sopra i €100)</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
