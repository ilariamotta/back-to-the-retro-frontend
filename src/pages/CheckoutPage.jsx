import ClientDataForm from "../components/ClientDataForm";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

export default function CheckoutPage() {

const {cart} = useCart();
const [totalAmount, setTotalAmount] = useState(0);

useEffect(() => {
    function calculateTotal() {
    let total = 0;
    const shippingCost = 6.00;

   
    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    if (total > 100) {
        return total; // CONDIZIONE SPEDIZIONE GRATUITA
    }
  
    return total + shippingCost;
}
    setTotalAmount(calculateTotal());
}, [cart]);






    return (
        <>
            {/* CONTAINER */}
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                {/* TITOLO PAGINA */}
                <div className="flex flex-wrap items-end justify-between gap-3">
                    <div><h1 className="text-3xl font-extrabold tracking-tight text-[#2a2f45]">Checkout</h1>
                        <p className="mt-1 text-sm text-zinc-600">Inserisci i dati e conferma il tuo ordine.</p>
                    </div>
                    <button className="mt-4 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-zinc-50">
                        <NavLink to="/cart">← Torna al carrello</NavLink>
                    </button>
                </div>

                {/* LAYOUT BOX CHECKOUT */}
                <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
                    {/* FORM */}
                    <div className="lg:col-span-8">
                        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between gap-3">
                                <h2 className="text-lg font-semibold text-zinc-900 py-4">
                                    Dati di spedizione</h2>
                            </div>
                            {/* CHECKOUT FORM */}
                            <ClientDataForm />
                        </div>
                    </div>

                    {/* RIEPILOGO */}
                    <div className="lg:col-span-4">
                        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-zinc-900">
                                Riepilogo ordine</h2>

                            {/* RIGHE CALCOLI */}
                            <div className="mt-4 space-y-3 text-sm">
                                <div className="flex justify-between text-base">
                                    <span className="text-zinc-600">Totale</span>
                                    <span className="font-extrabold text-[#6C2BD9]">
                                        € {totalAmount.toFixed(2)}
                                        </span>
                                </div>
                            </div>

                            {/* BOTTONI PAGAMENTO */}
                            <div className="mt-6 space-y-3">
                                {/* conferma ordine */}
                                <button
                                    type="button"
                                    className="
                  w-full rounded-2xl
                  bg-[#00D084]
                  px-5 py-4
                  text-sm font-extrabold tracking-wide
                  text-[#06251c]
                  transition-all duration-300
                  hover:brightness-110
                  hover:shadow-[0_0_20px_rgba(0,208,132,0.45)]
                  active:scale-[0.99]
                ">
                                    Conferma l'ordine
                                </button>

                            </div>

                            {/* STRIPE? */}
                            <div className="mt-6 rounded-2xl bg-zinc-50 p-4 text-xs text-zinc-600">
                                <p className="mt-1">
                                    INSERIRE STRIPE??
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}