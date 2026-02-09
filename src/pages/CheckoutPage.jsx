import ClientDataForm from "../components/ClientDataForm";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import StripePaymentForm from "../components/StripePaymentForm";
import { useEffect, useState } from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();
    const [totalAmount, setTotalAmount] = useState(0);
    const [shippingCost, setShippingCost] = useState(6.00);
    const [clientData, setClientData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState(null);
    const [showPaymentForm, setShowPaymentForm] = useState(false);

    useEffect(() => {
        console.log('🛒 CheckoutPage - CARRELLO CARICATO:', cart);
        cart.forEach((item, index) => {
            console.log(`  Item ${index}:`, {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            });
        });
    }, [cart]);

    useEffect(() => {
        function calculateTotal() {
            let subtotal = 0;
            const shipping = 6.00;

            cart.forEach(item => {
                subtotal += item.price * item.quantity;
            });

            if (subtotal > 100) {
                setShippingCost(0);
                return subtotal;
            }

            setShippingCost(shipping);
            return subtotal + shipping;
        }
        setTotalAmount(calculateTotal());
    }, [cart]);

    const handleFormChange = (formData) => {
        setClientData(formData);
    };

    const handleConfirmOrder = () => {
        if (!clientData) {
            alert("Compila tutti i campi del form prima di procedere!");
            return;
        }

        const requiredFields = [
            'client_name', 'client_surname', 'email', 'phone_number',
            'billing_address', 'billing_city', 'billing_postal_code',
            'shipping_address', 'shipping_city', 'shipping_postal_code'
        ];

        const missingFields = requiredFields.filter(field => !clientData[field]);
        if (missingFields.length > 0) {
            alert("Compila tutti i campi obbligatori!");
            return;
        }

        if (cart.length === 0) {
            alert("Il carrello è vuoto!");
            return;
        }

        setIsLoading(true);

        console.log("Creazione Payment Intent...");
        console.log("Carrello prima del mapping:", cart);

        const BACKEND = import.meta.env.VITE_BACKEND_URL
            ? import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "")
            : "http://localhost:3000";

        // Prepare cart
        let cartForPayment;
        try {
            cartForPayment = cart.map((item, index) => {
                const productId = item.id || item.product_id;

                if (!productId) {
                    console.error(`❌ ERRORE: Item ${index} senza ID!`, item);
                    throw new Error(`Prodotto "${item.name}" senza ID. Ricarica la pagina.`);
                }

                console.log(`✅ Item ${index} OK - ID: ${productId}, Nome: ${item.name}`);

                return {
                    product_id: productId,
                    quantity: item.quantity,
                    unit_price: Math.round(item.price * 100)
                };
            });
        } catch (err) {
            setIsLoading(false);
            alert(`❌ ${err.message}`);
            return;
        }

        console.log("📋 Carrello mappato per payment intent:", cartForPayment);

        axios.post(`${BACKEND}/retro/api/orders/create-payment-intent`, {
            cart: cartForPayment,
            shipping_price: shippingCost
        }, {
            headers: { "Content-Type": "application/json" }
        })
            .then((response) => {
                const data = response.data;

                if (data.clientSecret) {
                    console.log("✅ Payment Intent creato:", data.paymentIntentId);
                    setClientSecret(data.clientSecret);
                    setShowPaymentForm(true);
                } else {
                    console.error("❌ Errore dal backend:", data);
                    alert(`❌ Errore: ${data.error || 'Errore sconosciuto'}`);
                }
            })
            .catch((error) => {
                console.error("❌ Errore durante la creazione del pagamento:", error);
                alert(`❌ ${error.message || 'Errore di connessione. Verifica che il backend sia avviato e riprova.'}`);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handlePaymentSuccess = (paymentIntent) => {
        console.log("✅ Pagamento riuscito:", paymentIntent);
        clearCart();
        alert("✅ Pagamento completato con successo! Controlla la tua email.");
        navigate("/", { state: { paymentIntent } });
    };

    const handlePaymentError = (errorMessage) => {
        console.error("❌ Errore nel pagamento:", errorMessage);
        alert(`❌ Errore nel pagamento: ${errorMessage}`);
    };

    const isFormComplete = () => {
        if (!clientData) return false;

        const requiredFields = [
            'client_name', 'client_surname', 'email', 'phone_number',
            'billing_address', 'billing_city', 'billing_postal_code',
            'shipping_address', 'shipping_city', 'shipping_postal_code'
        ];

        return requiredFields.every(field => clientData[field]);
    };

    return (
        <>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

                {/* HEADER */}
                <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-[#6320EE] drop-shadow-[0_0_10px_rgba(99,32,238,0.65)]">Checkout</h1>
                        <p className="mt-1 text-sm text-white">Inserisci i dati e conferma il tuo ordine.</p>
                    </div>
                    <button className="mt-4 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-zinc-50">
                        <NavLink to="/carrello">← Torna al carrello</NavLink>
                    </button>
                </div>

                {/* PAYMENT FORM */}
                {showPaymentForm && clientSecret ? (
                    <section className="mt-6">
                        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm max-w-2xl mx-auto">
                            <h2 className="text-lg font-semibold text-zinc-900 mb-4">
                                💳 Completa il Pagamento
                            </h2>

                            {console.log('Passaggio carrello a StripePaymentForm:', cart)}

                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <StripePaymentForm
                                    clientData={clientData}
                                    cart={cart}
                                    shippingCost={shippingCost}
                                    totalAmount={totalAmount}
                                    onSuccess={handlePaymentSuccess}
                                    onError={handlePaymentError}
                                />
                            </Elements>

                            <button
                                onClick={() => setShowPaymentForm(false)}
                                className="mt-4 w-full text-sm text-zinc-600 hover:text-zinc-900 py-2 border-t"
                            >
                                ← Torna ai dati
                            </button>

                            {/* SUMMARY */}
                            <div className="mt-6 rounded-2xl bg-zinc-50 p-4">
                                <h3 className="font-semibold text-zinc-900 mb-3">Riepilogo Ordine</h3>

                                <div className="space-y-2 mb-4">
                                    {cart.map(item => (
                                        <div key={item.slug} className="flex justify-between text-sm">
                                            <span className="text-zinc-600">
                                                {item.name} x {item.quantity}
                                            </span>
                                            <span className="font-medium">
                                                €{(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t pt-3 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-600">Subtotale</span>
                                        <span className="font-medium">
                                            €{(totalAmount - shippingCost).toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-600">Spedizione</span>
                                        <span className="font-medium">
                                            {shippingCost === 0 ? 'GRATIS' : `€${shippingCost.toFixed(2)}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-base font-bold border-t pt-2">
                                        <span>Totale</span>
                                        <span className="text-[#6C2BD9]">
                                            €{totalAmount.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : (

                    /* ORIGINAL CHECKOUT FORM */
                    <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">

                        {/* FORM */}
                        <div className="lg:col-span-8">
                            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                                <div className="flex items-center justify-between gap-3">
                                    <h2 className="text-lg font-semibold text-zinc-900 py-4">
                                        Dati di spedizione
                                    </h2>
                                </div>

                                <ClientDataForm onFormChange={handleFormChange} />
                            </div>
                        </div>

                        {/* SUMMARY */}
                        <div className="lg:col-span-4">
                            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                                <h2 className="text-lg font-semibold text-zinc-900">
                                    Riepilogo ordine
                                </h2>

                                <div className="mt-4 space-y-2">
                                    {cart.map(item => (
                                        <div key={item.slug} className="flex justify-between text-sm">
                                            <span className="text-zinc-600">
                                                {item.name} x {item.quantity}
                                            </span>
                                            <span className="font-medium">
                                                €{(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 space-y-3 text-sm border-t pt-4">
                                    <div className="flex justify-between">
                                        <span className="text-zinc-600">Subtotale</span>
                                        <span className="font-medium">
                                            €{(totalAmount - shippingCost).toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-zinc-600">Spedizione</span>
                                        <span className="font-medium">
                                            {shippingCost === 0 ? 'GRATIS' : `€${shippingCost.toFixed(2)}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-base border-t pt-3">
                                        <span className="font-semibold text-zinc-900">Totale</span>
                                        <span className="font-extrabold text-[#6C2BD9]">
                                            €{totalAmount.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-3">
                                    <button
                                        type="button"
                                        onClick={handleConfirmOrder}
                                        disabled={!isFormComplete() || isLoading}
                                        className={`
                                            w-full rounded-2xl
                                            px-5 py-4
                                            text-sm font-extrabold tracking-wide
                                            transition-all duration-300
                                            active:scale-[0.99]
                                            ${!isFormComplete() || isLoading
                                                ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                                                : 'bg-[#00D084] hover:brightness-110 hover:shadow-[0_0_20px_rgba(0,208,132,0.45)] text-[#06251c]'
                                            }
                                        `}
                                    >
                                        {isLoading
                                            ? '⏳ Caricamento...'
                                            : !isFormComplete()
                                                ? '⚠️ Completa il form'
                                                : '💳 Procedi al pagamento'}
                                    </button>
                                </div>

                                {totalAmount - shippingCost > 100 && (
                                    <div className="mt-4 rounded-2xl bg-green-50 p-4 text-xs text-green-800">
                                        <p className="font-semibold">🎉 Hai ottenuto la spedizione gratuita!</p>
                                    </div>
                                )}

                                <div className="mt-6 rounded-2xl bg-zinc-50 p-4 text-xs text-zinc-600">
                                    <p className="font-semibold mb-1">Dopo l'ordine:</p>
                                    <p className="mt-1">
                                        Riceverai una email di conferma con tutti i dettagli dell'ordine.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}
