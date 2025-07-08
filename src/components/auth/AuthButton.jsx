import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react'
import { Settings } from 'lucide-react'

export function AuthButton({ onOpenPreferences }) {
  // Check if we're in demo mode (no Clerk keys configured)
  const isDemoMode = !import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ||
                     import.meta.env.VITE_CLERK_PUBLISHABLE_KEY.includes('your_clerk_publishable_key_here')

  const { isSignedIn, user } = isDemoMode ? { isSignedIn: false, user: null } : useUser()

  if (isSignedIn) {
    return (
      <div className="user-menu">
        <div className="user-info">
          <img
            src={user?.imageUrl}
            alt={user?.fullName || user?.firstName || 'User'}
            className="user-avatar-small"
          />
          <span className="user-name">
            {user?.fullName || user?.firstName || 'User'}
          </span>
        </div>
        <button
          className="preferences-btn"
          onClick={onOpenPreferences}
          title="Preferences"
        >
          <Settings size={18} />
        </button>
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-8 h-8",
              userButtonPopoverCard: {
                backgroundColor: '#23262F',
                border: '1px solid #333'
              }
            }
          }}
        />
      </div>
    )
  }

  if (isDemoMode) {
    return (
      <div className="auth-buttons">
        <button className="sign-in-btn" onClick={() => alert('Demo Mode: Please configure Clerk keys to enable authentication')}>
          Sign In (Demo)
        </button>
        <button className="sign-up-btn" onClick={() => alert('Demo Mode: Please configure Clerk keys to enable authentication')}>
          Get Started (Demo)
        </button>
      </div>
    )
  }

  return (
    <div className="auth-buttons">
      <SignInButton mode="modal">
        <button className="sign-in-btn">
          Sign In
        </button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button className="sign-up-btn">
          Get Started
        </button>
      </SignUpButton>
    </div>
  )
}
