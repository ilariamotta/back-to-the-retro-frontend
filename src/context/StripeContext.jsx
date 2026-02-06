import { createContext, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const StripeContext = createContext();

export const useStripe = () => {
  const context = useContext(StripeContext);
  if (!context) {
    throw new Error('useStripe must be used within StripeProvider');
  }
  return context;
};

export function StripeProvider({ children }) {
  const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

  if (!publishableKey) {
    console.log('VITE_STRIPE_PUBLISHABLE_KEY is not set');
  }

  const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

  return (
    <StripeContext.Provider value={{ stripePromise }}>
      {stripePromise ? (
        <Elements stripe={stripePromise}>
          {children}
        </Elements>
      ) : (
        <div className="p-4 bg-yellow-100 border border-yellow-400 rounded text-yellow-800">
          Stripe configuration missing. Please set VITE_STRIPE_PUBLISHABLE_KEY
        </div>
      )}
    </StripeContext.Provider>
  );
}
