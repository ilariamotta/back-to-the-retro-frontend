import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function SuccessPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const paymentIntent = location.state?.paymentIntent;

    useEffect(() => {
        if (!paymentIntent) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [paymentIntent, navigate]);

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    {/* Success Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-green-400 rounded-full blur-lg opacity-50"></div>
                            <div className="relative bg-green-400 rounded-full p-4 text-white text-6xl">
                                ✓
                            </div>
                        </div>
                    </div>

                    <h1 className="text-4xl font-extrabold text-[#2a2f45] mb-2">
                        Pagamento Completato!
                    </h1>
                    <p className="text-lg text-zinc-600 mb-8">
                        Grazie per il tuo acquisto. Il tuo ordine è stato confermato. Ti invieremo una email con i dettagli dell'ordine.
                    </p>

                    {/* Order Details */}
                    {paymentIntent && (
                        <div className="bg-zinc-50 rounded-2xl p-6 mb-8 inline-block max-w-md w-full">
                            <div className="space-y-4">
                                <div className="text-left">
                                    <p className="text-sm text-zinc-600">ID Pagamento</p>
                                    <p className="font-mono text-sm break-all text-zinc-900">
                                        {paymentIntent.id}
                                    </p>
                                </div>
                                <div className="text-left">
                                    <p className="text-sm text-zinc-600">Stato</p>
                                    <p className="text-lg font-semibold text-green-600">
                                        ✓ {paymentIntent.status === 'succeeded' ? 'Pagato' : paymentIntent.status}
                                    </p>
                                </div>
                                <div className="text-left">
                                    <p className="text-sm text-zinc-600">Importo</p>
                                    <p className="text-2xl font-extrabold text-[#6C2BD9]">
                                        €{(paymentIntent.amount / 100).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Buttons */}
                    <div className="flex gap-3 justify-center flex-wrap">
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-3 bg-[#ff006e] text-white font-semibold rounded-2xl hover:brightness-110 transition-all"
                        >
                          Torna alla home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
