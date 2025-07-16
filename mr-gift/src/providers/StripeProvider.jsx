import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
const isDemoMode = !stripeKey || stripeKey.includes('your_stripe_publishable_key_here')

const stripePromise = isDemoMode ? null : loadStripe(stripeKey)

export function StripeProvider({ children }) {
  if (isDemoMode) {
    // Return children without Stripe wrapper in demo mode
    return children
  }

  const options = {
    mode: 'payment',
    currency: 'usd',
    appearance: {
      theme: 'night',
      variables: {
        colorPrimary: '#FFB1EE',
        colorBackground: '#181A20',
        colorText: '#fff',
        colorDanger: '#F84563',
        fontFamily: 'Inter, system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '12px'
      }
    },
    // Add loader to show while Stripe is loading
    loader: 'auto'
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  )
}
