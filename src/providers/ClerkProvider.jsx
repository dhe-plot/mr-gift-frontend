import { ClerkProvider as ClerkProviderBase } from '@clerk/clerk-react'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// For demo purposes, we'll provide a fallback when keys aren't configured
const isDemoMode = !clerkPubKey || clerkPubKey.includes('your_clerk_publishable_key_here')

export function ClerkProvider({ children }) {
  if (isDemoMode) {
    // Return children without Clerk wrapper in demo mode
    return children
  }

  return (
    <ClerkProviderBase
      publishableKey={clerkPubKey}
      appearance={{
        baseTheme: 'dark',
        variables: {
          colorPrimary: '#FFB1EE',
          colorBackground: '#181A20',
          colorInputBackground: '#23262F',
          colorInputText: '#fff',
          colorText: '#fff',
          colorTextSecondary: '#B0B8C1',
          borderRadius: '0.75rem'
        },
        elements: {
          formButtonPrimary: {
            backgroundColor: '#FFB1EE',
            color: '#181A20',
            '&:hover': {
              backgroundColor: '#FECCF4'
            }
          },
          card: {
            backgroundColor: '#23262F',
            border: '1px solid #333',
            boxShadow: '0 4px 32px rgba(0,0,0,0.6)'
          }
        }
      }}
    >
      {children}
    </ClerkProviderBase>
  )
}
