import ClientDataForm from "../components/ClientDataForm";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import StripePaymentForm from "../components/StripePaymentForm";
import { useEffect, useState } from "react";

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

    const handleConfirmOrder = async () => {
        if (!clientData) {
            alert("⚠️ Compila tutti i campi del form prima di procedere!");
            return;
        }

        const requiredFields = [
            'client_name', 'client_surname', 'email', 'phone_number',
            'billing_address', 'billing_city', 'billing_postal_code',
            'shipping_address', 'shipping_city', 'shipping_postal_code'
        ];

        const missingFields = requiredFields.filter(field => !clientData[field]);
        if (missingFields.length > 0) {
            alert("⚠️ Compila tutti i campi obbligatori!");
            return;
        }

        if (cart.length === 0) {
            alert("⚠️ Il carrello è vuoto!");
            return;
        }

        setIsLoading(true);

        try {
            const orderData = {
                // Dati cliente
                client_name: clientData.client_name,
                client_surname: clientData.client_surname,
                email: clientData.email,
                phone_number: clientData.phone_number,

                // Indirizzi
                billing_address: clientData.billing_address,
                billing_postal_code: clientData.billing_postal_code,
                billing_city: clientData.billing_city,
                shipping_address: clientData.shipping_address,
                shipping_postal_code: clientData.shipping_postal_code,
                shipping_city: clientData.shipping_city,

                // Costi
                shipping_price: shippingCost,

                cart: cart.map(item => ({
                    product_id: item.id,
                    quantity: item.quantity,
                    unit_price: Math.round(item.price * 100)
                }))
            };

            console.log("📦 Invio ordine al backend:", orderData);

            const BACKEND = import.meta.env.VITE_BACKEND_URL
                ? import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "")
                : "http://localhost:3000";

            const response = await fetch(`${BACKEND}/retro/api/orders/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });

            const data = await response.json();

            if (data.clientSecret) {
                // Stripe payment intent created successfully
                setClientSecret(data.clientSecret);
                setShowPaymentForm(true);
            } else if (data.url) {
                // Legacy redirect method (if backend still uses it)
                window.location.href = data.url;
            } else {
                console.error("❌ Errore dal backend:", data);
                alert(`❌ Errore: ${data.error} Riprova o contatta l'assistenza.`);
            }

        } catch (error) {
            console.error("❌ Errore durante l'invio dell'ordine:", error);
            alert("❌ Errore di connessione. Verifica che il backend sia avviato e riprova.");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePaymentSuccess = (paymentIntent) => {
        console.log("✅ Pagamento riuscito:", paymentIntent);
        clearCart();
        alert("✅ Pagamento completato con successo!");
        navigate("/success", { state: { paymentIntent } });
    };

    const handlePaymentError = (errorMessage) => {
        console.error("❌ Errore nel pagamento:", errorMessage);
        alert(`❌ Errore nel pagamento: ${errorMessage}`);
    };

    // Check if all required fields are filled
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
            {/* CONTAINER */}
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                {/* TITOLO PAGINA */}
                <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-[#2a2f45]">Checkout</h1>
                        <p className="mt-1 text-sm text-zinc-600">Inserisci i dati e conferma il tuo ordine.</p>
                    </div>
                    <button className="mt-4 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-zinc-50">
                        <NavLink to="/carrello">← Torna al carrello</NavLink>
                    </button>
                </div>

                {/* SHOW PAYMENT FORM IF CLIENT SECRET EXISTS */}
                {showPaymentForm && clientSecret ? (
                    <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
                        <div className="lg:col-span-8">
                            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                                <h2 className="text-lg font-semibold text-zinc-900 py-4 mb-4">
                                    💳 Pagamento
                                </h2>
                                <StripePaymentForm
                                    clientSecret={clientSecret}
                                    totalAmount={totalAmount}
                                    onPaymentSuccess={handlePaymentSuccess}
                                    onPaymentError={handlePaymentError}
                                />
                                <button
                                    onClick={() => setShowPaymentForm(false)}
                                    className="mt-4 w-full text-sm text-zinc-600 hover:text-zinc-900 py-2 border-t"
                                >
                                    ← Torna ai dati
                                </button>
                            </div>
                        </div>

                        <div className="lg:col-span-4">
                            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                                <h2 className="text-lg font-semibold text-zinc-900">
                                    Riepilogo ordine
                                </h2>

                                {/* PRODOTTI NEL CARRELLO */}
                                <div className="mt-4 space-y-2">
                                    {cart.map(item => (
                                        <div key={item.slug} className="flex justify-between text-sm">
                                            <span className="text-zinc-600">
                                                {item.name} × {item.quantity}
                                            </span>
                                            <span className="font-medium">
                                                €{(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* RIGHE CALCOLI */}
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

                                {/* NOTE */}
                                <div className="mt-6 rounded-2xl bg-zinc-50 p-4 text-xs text-zinc-600">
                                    <p className="font-semibold mb-1">🔒 Pagamento Sicuro:</p>
                                    <p className="mt-1">
                                        I tuoi dati di pagamento sono protetti da Stripe.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : (
                    /* ORIGINAL CHECKOUT FORM LAYOUT */
                    <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
                        {/* FORM */}
                        <div className="lg:col-span-8">
                            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                                <div className="flex items-center justify-between gap-3">
                                    <h2 className="text-lg font-semibold text-zinc-900 py-4">
                                        Dati di spedizione
                                    </h2>
                                </div>
                                {/* CHECKOUT FORM - Passa la funzione handleFormChange */}
                                <ClientDataForm onFormChange={handleFormChange} />
                            </div>
                        </div>

                        {/* RIEPILOGO */}
                        <div className="lg:col-span-4">
                            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                                <h2 className="text-lg font-semibold text-zinc-900">
                                    Riepilogo ordine
                                </h2>

                                {/* PRODOTTI NEL CARRELLO */}
                                <div className="mt-4 space-y-2">
                                    {cart.map(item => (
                                        <div key={item.slug} className="flex justify-between text-sm">
                                            <span className="text-zinc-600">
                                                {item.name} × {item.quantity}
                                            </span>
                                            <span className="font-medium">
                                                €{(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* RIGHE CALCOLI */}
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

                                {/* BOTTONE CONFERMA ORDINE */}
                                <div className="mt-6 space-y-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (!isFormComplete()) {
                                                alert("⚠️ Compila tutti i campi del form prima di procedere!");
                                                return;
                                            }
                                            // Set a test client secret for now (will be replaced by backend response)
                                            setClientSecret("test_mode");
                                            setShowPaymentForm(true);
                                        }}
                                        disabled={!isFormComplete()}
                                        className={`
                        w-full rounded-2xl
                        px-5 py-4
                        text-sm font-extrabold tracking-wide
                        transition-all duration-300
                        active:scale-[0.99]
                        ${!isFormComplete()
                                                ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                                                : 'bg-[#00D084] hover:brightness-110 hover:shadow-[0_0_20px_rgba(0,208,132,0.45)] text-[#06251c]'
                                            }
                      `}
                                    >
                                        {!isFormComplete() ? '⚠️ Completa il form' : '💳 Procedi al pagamento'}
                                    </button>
                                </div>

                                {/* INFO SPEDIZIONE GRATUITA */}
                                {totalAmount - shippingCost > 100 && (
                                    <div className="mt-4 rounded-2xl bg-green-50 p-4 text-xs text-green-800">
                                        <p className="font-semibold">🎉 Hai ottenuto la spedizione gratuita!</p>
                                    </div>
                                )}

                                {/* NOTE */}
                                <div className="mt-6 rounded-2xl bg-zinc-50 p-4 text-xs text-zinc-600">
                                    <p className="font-semibold mb-1">📧 Dopo l'ordine:</p>
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