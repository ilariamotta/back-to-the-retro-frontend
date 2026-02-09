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

    return (
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center min-h-[60vh]">

                {/* SUCCESS BADGE */}
                <div className="mb-8">
                    <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-green-400/40 blur-2xl rounded-full"></div>
                        <div className="relative bg-green-500 text-white rounded-full p-5 shadow-xl text-5xl font-bold">
                            ✓
                        </div>
                    </div>
                </div>

                {/* TITLE */}
                <h1 className="text-4xl font-extrabold text-[#ff006e] mb-3 tracking-tight">
                    Pagamento completato
                </h1>
                <p className="text-lg text-[#ffd21f] mb-10 max-w-xl text-center">
                    Grazie per il tuo acquisto! Il tuo ordine è stato confermato e riceverai una email con tutti i dettagli.
                </p>

                {/* ORDER DETAILS CARD */}
                {orderData ? (
                    <div className="bg-white shadow-xl border border-zinc-200 rounded-2xl p-8 mb-10 w-full max-w-md">
                        <h2 className="text-xl font-semibold text-[#2a2f45] mb-6">
                            Dettagli dell'ordine
                        </h2>

                        <div className="space-y-5">
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
                    </div>
                ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-10 max-w-md w-full">
                        <p className="text-sm text-yellow-800">
                        Caricamento dettagli ordine... Verrai reindirizzato tra pochi secondi.
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
