import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function StripePaymentForm({
  clientData,
  cart,
  shippingCost,
  totalAmount,
  onSuccess,
  onError
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      console.log('💳 Inizio conferma pagamento Stripe...');

      // Conferma il pagamento con Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });

      if (error) {
        console.error('❌ Errore Stripe:', error);
        onError(error.message);
        setIsProcessing(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        console.log('✅ Pagamento riuscito:', paymentIntent.id);

        // 🔍 DEBUG: Verifica carrello ricevuto
        console.log('🔍 StripePaymentForm - Carrello ricevuto:', cart);

        cart.forEach((item, index) => {
          console.log(`🔍 Item ${index}:`, {
            id: item.id,
            slug: item.slug,
            name: item.name,
            price: item.price,
            priceType: typeof item.price,
            quantity: item.quantity
          });
        });

        // Prepara carrello per backend
        const cartForBackend = cart.map((item, index) => {
          const productId = item.id || item.product_id;
          const unitPrice = typeof item.price === 'string' ? parseFloat(item.price) : item.price;

          if (!productId) {
            console.error(`❌ Item ${index} senza ID!`, item);
            throw new Error(`Prodotto "${item.name}" senza ID`);
          }

          const mappedItem = {
            product_id: productId,
            quantity: item.quantity,
            unit_price: Math.round(unitPrice * 100)
          };

          console.log(`✅ Item ${index} mappato:`, mappedItem);
          return mappedItem;
        });

        console.log('🔍 StripePaymentForm - Carrello mappato finale:', cartForBackend);

        // Chiama il backend per confermare l'ordine e inviare le email
        const BACKEND = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "") || "http://localhost:3000";

        console.log('📦 Invio conferma ordine al backend...');

        const orderData = {
          paymentIntentId: paymentIntent.id,
          client_name: clientData.client_name,
          client_surname: clientData.client_surname,
          email: clientData.email,
          phone_number: clientData.phone_number,
          billing_address: clientData.billing_address,
          billing_postal_code: clientData.billing_postal_code,
          billing_city: clientData.billing_city,
          shipping_address: clientData.shipping_address,
          shipping_postal_code: clientData.shipping_postal_code,
          shipping_city: clientData.shipping_city,
          shipping_price: shippingCost,
          cart: cartForBackend
        };

        console.log('📋 Dati completi inviati al backend:', JSON.stringify(orderData, null, 2));

        const response = await fetch(`${BACKEND}/retro/api/orders/confirm`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData)
        });

        const data = await response.json();

        if (data.success) {
          console.log('✅ Ordine confermato e email inviate:', data.orderId);
          onSuccess(paymentIntent);
        } else {
          console.error('❌ Errore conferma ordine:', data);
          onError(data.error || 'Errore nel confermare l\'ordine');
        }
      }

    } catch (error) {
      console.error('❌ Errore:', error);
      onError(error.message || 'Errore durante il pagamento');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className={`
          w-full rounded-2xl px-5 py-4
          text-sm font-extrabold tracking-wide
          transition-all duration-300
          ${isProcessing || !stripe
            ? 'bg-gray-400 cursor-not-allowed text-gray-600'
            : 'bg-[#00D084] hover:brightness-110 text-[#06251c] hover:shadow-[0_0_20px_rgba(0,208,132,0.45)]'
          }
        `}
      >
        {isProcessing ? '⏳ Elaborazione pagamento...' : `💳 Paga €${totalAmount.toFixed(2)}`}
      </button>

      <div className="text-xs text-center text-zinc-500 mt-2">
        🔒 Pagamento sicuro processato da Stripe
      </div>
    </form>
  );
}