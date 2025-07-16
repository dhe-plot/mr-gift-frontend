import { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { useUser } from '@clerk/clerk-react'
import { X, CreditCard, Lock } from 'lucide-react'

export function CheckoutForm({ product, onClose, onSuccess }) {
  const stripe = useStripe()
  const elements = useElements()
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Check if we're in demo mode
  const isDemoMode = !import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
                     import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY.includes('your_stripe_publishable_key_here')

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (isDemoMode) {
      alert('Demo Mode: Payment processing requires Stripe configuration. This would normally process the payment.')
      onSuccess?.()
      return
    }

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    try {
      // Create payment intent on your backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user?.getToken()}`
        },
        body: JSON.stringify({
          productId: product.id,
          amount: Math.round(product.price * 100), // Convert to cents and round
          currency: 'usd',
          productName: product.name
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create payment intent')
      }

      const { client_secret } = await response.json()

      // Confirm payment
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: client_secret,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
          receipt_email: user?.emailAddresses[0]?.emailAddress
        },
        redirect: 'if_required'
      })

      if (error) {
        setErrorMessage(error.message)
      } else {
        onSuccess?.()
        onClose()
      }
    } catch (err) {
      setErrorMessage('Payment failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!product) return null

  return (
    <div className="modal-backdrop fade-in" onClick={onClose}>
      <div className="modal payment-modal" onClick={e => e.stopPropagation()}>
        <div className="payment-header">
          <h2>Complete Your Purchase</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="payment-product-info">
          <img src={product.img} alt={product.name} className="payment-product-image" />
          <div className="payment-product-details">
            <h3>{product.name}</h3>
            <p>{product.desc}</p>
            <div className="payment-price">${product.price}</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="payment-form">
          <div className="payment-element-container">
            <div className="payment-section-header">
              <CreditCard size={18} />
              <span>Payment Information</span>
            </div>
            <PaymentElement />
          </div>

          {errorMessage && (
            <div className="error-message">
              {errorMessage}
            </div>
          )}

          <button 
            type="submit" 
            className="payment-submit-btn" 
            disabled={!stripe || isLoading}
          >
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <>
                <Lock size={18} />
                Pay ${product.price}
              </>
            )}
          </button>

          <div className="payment-security-note">
            <Lock size={14} />
            <span>Your payment information is secure and encrypted</span>
          </div>
        </form>
      </div>
    </div>
  )
}
