import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function SuccessPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        if (location.state?.paymentIntent || location.state?.orderData) {
            setOrderData(location.state);
        } else {
            const timer = setTimeout(() => navigate('/'), 5000);
            return () => clearTimeout(timer);
        }
    }, [location.state, navigate]);

    const paymentIntent = orderData?.paymentIntent || orderData?.data?.paymentIntent;
    const totalAmount = orderData?.totalAmount;
    const paymentId = paymentIntent?.id;
    const paymentStatus = paymentIntent?.status;
    const amount = paymentIntent?.amount;
    const cart = orderData?.cart || [];
    const shippingCost = orderData?.shippingCost || 0;
    const subtotal = totalAmount ? totalAmount - shippingCost : 0;

    return (
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h1 className="text-4xl font-extrabold text-[#ff006e] drop-shadow-[0_0_8px_rgba(255,0,110,0.75)] mb-3 tracking-tight">
                    Pagamento completato
                </h1>
                <p className="text-lg text-[#ffd21f] mb-10 max-w-xl text-center">
                    Grazie per il tuo acquisto! Il tuo ordine è stato confermato e riceverai una email con tutti i dettagli.
                </p>
                {orderData ? (
                    <div className="bg-white shadow-xl border border-zinc-200 rounded-2xl p-8 mb-10 w-full max-w-2xl">
                        <h2 className="text-xl font-semibold text-[#2a2f45] mb-6">
                            Dettagli dell'ordine
                        </h2>
                        <div className="space-y-5 mb-6 pb-6 border-b border-zinc-200">
                            {paymentId && (
                                <div>
                                    <p className="text-sm text-zinc-500">ID Pagamento</p>
                                    <p className="font-mono text-sm text-zinc-900 break-all">
                                        {paymentId}
                                    </p>
                                </div>
                            )}
                            {paymentStatus && (
                                <div>
                                    <p className="text-sm text-zinc-500">Stato</p>
                                    <p className="text-lg font-semibold text-green-600">
                                        ✓ {paymentStatus === 'succeeded' ? 'Pagato' : paymentStatus}
                                    </p>
                                </div>
                            )}
                            {(amount || totalAmount) && (
                                <div>
                                    <p className="text-sm text-zinc-500">Importo</p>
                                    <p className="text-3xl font-extrabold text-[#6C2BD9]">
                                        €{amount ? (amount / 100).toFixed(2) : totalAmount?.toFixed(2)}
                                    </p>
                                </div>
                            )}
                        </div>
                        {cart && cart.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-[#2a2f45] mb-4">
                                    Riepilogo ordine
                                </h3>
                                <div className="space-y-3 mb-6 pb-6 border-b border-zinc-200">
                                    {cart.map((item) => (
                                        <div key={item.slug} className="flex justify-between items-center">
                                            <div>
                                                <p className="font-medium text-[#2a2f45]">{item.name}</p>
                                                <p className="text-sm text-zinc-600">Quantità: {item.quantity}</p>
                                            </div>
                                            <p className="font-semibold text-[#2a2f45]">
                                                €{(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-zinc-600">
                                        <span>Subtotale</span>
                                        <span>€{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-zinc-600">
                                        <span>Spedizione</span>
                                        <span>{shippingCost === 0 ? 'GRATIS' : `€${shippingCost.toFixed(2)}`}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold text-[#2a2f45] pt-3 border-t border-zinc-200">
                                        <span>Totale</span>
                                        <span className="text-[#6C2BD9]">€{totalAmount?.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-10 max-w-md w-full">
                        <p className="text-sm text-yellow-800">
                            Caricamento dettagli ordine, verrai reindirizzato tra pochi secondi.
                        </p>
                    </div>
                )}

                {/* BUTTONS */}
                <div className="flex gap-4 flex-wrap justify-center mb-10">
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-[#ff006e] text-white font-semibold rounded-2xl shadow-md hover:brightness-110 transition-all"
                    >
                        Torna alla home
                    </button>

                    <button
                        onClick={() => navigate('/products')}
                        className="px-6 py-3 bg-white border border-zinc-300 text-zinc-900 font-semibold rounded-2xl shadow-sm hover:bg-zinc-50 transition-all"
                    >
                        Continua lo shopping
                    </button>
                </div>
            </div>
        </div>
    );
}
