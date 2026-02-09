# Stripe Integration Setup Guide

## Overview
This guide explains how to complete the Stripe payment integration for your Back-to-the-Retro e-commerce platform.

## Files Created/Modified

### New Files:
1. **`src/context/StripeContext.jsx`** - Stripe provider and context setup
2. **`src/components/StripePaymentForm.jsx`** - Payment form component using Stripe Elements
3. **`src/pages/SuccessPage.jsx`** - Success page after payment completion

### Modified Files:
1. **`src/pages/CheckoutPage.jsx`** - Updated to include Stripe payment flow
2. **`.env.example`** - Added Stripe publishable key variable

## Installation Steps

### 1. Install Dependencies (Already Done ✓)
```bash
npm install @stripe/react-stripe-js @stripe/stripe-js
```

### 2. Get Stripe API Keys
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Sign up or log in
3. Navigate to **Developers > API Keys**
4. Copy your **Publishable Key** (starts with `pk_test_` for testing)

### 3. Set Environment Variables
Create or update your `.env` file:
```
VITE_BACKEND_URL=http://localhost:3000
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

### 4. Update Your App Layout
Add the `StripeProvider` to your main app. In your `src/layouts/AppLayout.jsx`:

```jsx
import { StripeProvider } from "../context/StripeContext";

export default function AppLayout() {
    return (
        <StripeProvider>
            {/* Your existing layout content */}
            <Header />
            <Outlet />
            <Footer />
        </StripeProvider>
    );
}
```

### 5. Add Success Route
Update your router configuration to include the success page:

```jsx
import SuccessPage from "./pages/SuccessPage";

// In your router definition:
{
    path: '/success',
    element: <SuccessPage />
}
```

## Backend Integration

Your backend needs to:

1. **Create a Stripe Payment Intent** - Return `clientSecret` in the checkout response
   ```json
   {
       "clientSecret": "pi_test_1234567890...",
       "status": "success"
   }
   ```

2. **Handle the Payment Intent** - Use the `client_secret` to verify payment on the server

Example Node.js/Express endpoint:
```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/retro/api/orders/checkout', async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(totalAmount * 100), // Amount in cents
            currency: 'eur',
            metadata: {
                order_id: orderId,
                customer_email: req.body.email
            }
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
            status: 'success'
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
```

## Frontend Flow

1. **User fills in shipping form** → `ClientDataForm`
2. **User clicks "Conferma l'ordine"** → Creates Payment Intent on backend
3. **Payment form appears** → `StripePaymentForm` (with Stripe Elements)
4. **User enters card details** → Stripe Elements handle the input securely
5. **User clicks "Paga"** → Confirm payment with Stripe
6. **Success page** → `SuccessPage` with order confirmation

## Testing with Stripe

Use these test card numbers:

| Card Type | Number | Exp | CVC |
|-----------|--------|-----|-----|
| Visa | 4242 4242 4242 4242 | Any future date | Any 3 digits |
| Mastercard | 5555 5555 5555 4444 | Any future date | Any 3 digits |
| Failed Payment | 4000 0000 0000 0002 | Any future date | Any 3 digits |

## Component Details

### StripeContext.jsx
- Initializes Stripe with your publishable key
- Provides Stripe instance to child components via context hook `useStripe()`
- Wraps children with `<Elements>` provider

### StripePaymentForm.jsx
- Displays Stripe Payment Element
- Handles payment confirmation
- Shows error messages and loading states
- Calls `onPaymentSuccess` or `onPaymentError` callbacks

### CheckoutPage.jsx
- Manages checkout workflow state
- Shows shipping form first
- Shows payment form after order data is submitted
- Can switch back to form if needed

### SuccessPage.jsx
- Displays payment confirmation
- Shows order details (payment ID, amount, status)
- Provides next steps information
- Links to continue shopping or return home

## Security Notes

- ✓ Card details never touch your server (handled by Stripe)
- ✓ All sensitive data is encrypted in transit
- ✓ PCI compliance is handled by Stripe
- ✓ Use HTTPS in production

## Troubleshooting

**"Stripe configuration missing" message**
- Check that `VITE_STRIPE_PUBLISHABLE_KEY` is set in `.env`
- Restart dev server after adding the key

**Payment form not appearing**
- Verify backend is returning `clientSecret` correctly
- Check browser console for errors
- Ensure StripeProvider wraps your checkout page

**Payment fails silently**
- Check browser console for errors
- Verify Stripe API key is correct
- Check backend logs for payment intent creation errors

## Next Steps

1. Configure your Stripe API keys
2. Wrap your app with `StripeProvider`
3. Add the success route to your router
4. Update your backend to create payment intents
5. Test with Stripe test cards
6. Go live by switching to live API keys

For more info, see [Stripe React Documentation](https://stripe.com/docs/stripe-js/react)
