import React, { useState } from 'react'
import { Settings, User, LogIn, UserPlus, ChevronDown } from 'lucide-react'

export function AuthButton({ onOpenPreferences, onAuthSuccess, isAuthenticated, userData }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('signin') // 'signin' or 'signup'

  // Check if we're in demo mode (no Clerk keys configured)
  const isDemoMode = !import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ||
                     import.meta.env.VITE_CLERK_PUBLISHABLE_KEY.includes('your_clerk_publishable_key_here')

  // Use props for authentication state, fallback to local state for demo
  const isSignedIn = isAuthenticated || false
  const user = userData || null

  const handleAuthClick = (mode) => {
    setAuthMode(mode)
    setShowAuthModal(true)
    setIsDropdownOpen(false)
  }

  const handleDemoSignIn = () => {
    // Simulate sign in for demo
    setShowAuthModal(false)
    if (onAuthSuccess) {
      onAuthSuccess()
    }
  }

  const handleSignOut = () => {
    // Clear localStorage and reset state
    localStorage.removeItem('mrGiftUserData')
    setIsDropdownOpen(false)
    // Reload the page to reset all state
    window.location.reload()
  }

  if (isSignedIn) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <img
            src={user?.imageUrl || userData?.personal?.imageUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=32&h=32&q=80'}
            alt={user?.fullName || userData?.personal?.firstName || 'User'}
            className="w-8 h-8 rounded-full border-2 border-blue-500"
          />
          <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
            {user?.firstName || userData?.personal?.firstName || userData?.firstName || 'User'}
          </span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.fullName || userData?.personal?.firstName || userData?.firstName || 'Demo User'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {userData?.userType === 'both' ? 'Buyer & Seller' : userData?.userType === 'seller' ? 'Seller' : 'Gift Explorer'}
              </p>
            </div>
            <div className="py-1">
              <button
                onClick={onOpenPreferences}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Settings className="w-4 h-4" />
                Preferences
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogIn className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <User className="w-4 h-4" />
          <span className="font-medium">Join Mr Gift</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Welcome to Mr Gift! 🎁
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Choose how you'd like to get started
              </p>
            </div>
            <div className="py-1">
              <button
                onClick={() => handleAuthClick('signin')}
                className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <LogIn className="w-4 h-4 text-blue-500" />
                <div className="text-left">
                  <div className="font-medium">Sign In</div>
                  <div className="text-xs text-gray-500">Already have an account</div>
                </div>
              </button>
              <button
                onClick={() => handleAuthClick('signup')}
                className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <UserPlus className="w-4 h-4 text-green-500" />
                <div className="text-left">
                  <div className="font-medium">Create Account</div>
                  <div className="text-xs text-gray-500">New to Mr Gift</div>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleDemoSignIn}
          isDemoMode={isDemoMode}
        />
      )}
    </>
  )
}

// Auth Modal Component
function AuthModal({ mode, onClose, onSuccess, isDemoMode }) {
  const [currentMode, setCurrentMode] = useState(mode)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {currentMode === 'signin' ? 'Welcome Back! 🎁' : 'Join Mr Gift! 🎉'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            {isDemoMode ? (
              <div className="text-center">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Demo Mode Active</strong><br />
                    Click below to simulate {currentMode === 'signin' ? 'signing in' : 'creating an account'}
                  </p>
                </div>
                <button
                  onClick={onSuccess}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200"
                >
                  {currentMode === 'signin' ? 'Demo Sign In' : 'Demo Sign Up'}
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400">
                <p>Authentication will be available when Clerk is configured.</p>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={() => setCurrentMode(currentMode === 'signin' ? 'signup' : 'signin')}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                {currentMode === 'signin'
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
