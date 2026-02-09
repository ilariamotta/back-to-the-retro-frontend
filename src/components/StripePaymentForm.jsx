import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

export default function StripePaymentForm({
  clientSecret,
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    console.log('💳 Starting Stripe payment confirmation...');

    const cardElement = elements.getElement(CardElement);

    // Create payment method
    stripe.createPaymentMethod({
      type: 'card',
      card: cardElement
    })
      .then(({ error, paymentMethod }) => {
        if (error) {
          console.error('❌ Payment method error:', error);
          onError(error.message);
          setIsProcessing(false);
          return Promise.reject(error);
        }

        console.log('✅ Payment method created:', paymentMethod.id);

        // Confirm payment with client secret
        return stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id
        });
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          console.error('❌ Stripe error:', error);
          onError(error.message);
          setIsProcessing(false);
          return Promise.reject(error);
        }

        if (!paymentIntent || paymentIntent.status !== 'succeeded') {
          const errorMsg = 'Payment not completed';
          console.error('❌', errorMsg);
          onError(errorMsg);
          setIsProcessing(false);
          return Promise.reject(errorMsg);
        }

        console.log('✅ Payment succeeded:', paymentIntent.id);

        console.log('StripePaymentForm - Received cart:', cart);

        cart.forEach((item, index) => {
          console.log(`Item ${index}:`, {
            id: item.id,
            slug: item.slug,
            name: item.name,
            price: item.price,
            priceType: typeof item.price,
            quantity: item.quantity
          });
        });

        const cartForBackend = cart.map((item, index) => {
          const productId = item.id || item.product_id;
          const unitPrice =
            typeof item.price === 'string' ? parseFloat(item.price) : item.price;

          if (!productId) {
            console.error(`❌ Item ${index} missing ID!`, item);
            throw new Error(`Product "${item.name}" has no ID`);
          }

          const mappedItem = {
            product_id: productId,
            quantity: item.quantity,
            unit_price: Math.round(unitPrice * 100)
          };

          console.log(`✅ Item ${index} mapped:`, mappedItem);
          return mappedItem;
        });

        console.log('Final mapped cart:', cartForBackend);

        const BACKEND =
          import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, '') ||
          'http://localhost:3000';

        console.log('📦 Sending order confirmation to backend...');

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

        console.log(
          'Full order data sent to backend:',
          JSON.stringify(orderData, null, 2)
        );

        return axios.post(`${BACKEND}/retro/api/orders/confirm`, orderData, {
          headers: { 'Content-Type': 'application/json' }
        });
      })
      .then((response) => {
        if (response && response.data && response.data.success) {
          console.log('✅ Order confirmed and emails sent:', response.data.orderId);
          onSuccess(response.data);
        } else {
          console.error('❌ Order confirmation error:', response?.data);
          onError(response?.data?.error || 'Error confirming order');
        }
      })
      .catch((error) => {
        console.error('❌ Unexpected error:', error);
        onError(error.message || error || 'Payment error');
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-zinc-900">
          💳 Card Information
        </label>
        <div className="p-4 border border-zinc-200 rounded-xl bg-white">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#2a2f45',
                  '::placeholder': {
                    color: '#cbd5e1',
                  },
                },
                invalid: {
                  color: '#ef4444',
                },
              },
            }}
          />
        </div>
      </div>

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
        {isProcessing
          ? 'Processing payment...'
          : `Pay €${totalAmount.toFixed(2)}`}
      </button>

      <div className="text-xs text-center text-zinc-500 mt-2">
        Secure payment processed by Stripe
      </div>
    </form>
  );
}
