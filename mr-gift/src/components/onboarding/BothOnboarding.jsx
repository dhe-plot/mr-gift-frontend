import React, { useState } from 'react'
import { Users, User, Store, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'

export function BothOnboarding({ onComplete, onBack }) {
  const [currentStep, setCurrentStep] = useState('personal')
  const [personalData, setPersonalData] = useState({})
  const [businessData, setBusinessData] = useState({})

  const steps = [
    { id: 'personal', title: 'Personal Profile', icon: User, description: 'Set up your personal gifting profile' },
    { id: 'business', title: 'Business Profile', icon: Store, description: 'Configure your seller account' },
    { id: 'preferences', title: 'Preferences', icon: Users, description: 'Customize your experience' }
  ]

  const [preferences, setPreferences] = useState({
    primaryRole: 'both', // 'buyer', 'seller', 'both'
    notifications: {
      newProducts: true,
      orderUpdates: true,
      promotions: false,
      communityUpdates: true
    },
    privacy: {
      showProfile: true,
      showPurchases: false,
      showWishlist: true
    },
    dashboard: {
      defaultView: 'combined', // 'buyer', 'seller', 'combined'
      showAnalytics: true,
      showRecommendations: true
    }
  })

  const handlePersonalComplete = (data) => {
    setPersonalData(data)
    setCurrentStep('business')
  }

  const handleBusinessComplete = (data) => {
    setBusinessData(data)
    setCurrentStep('preferences')
  }

  const handlePreferencesComplete = () => {
    const completeData = {
      personal: personalData,
      business: businessData,
      preferences: preferences,
      userType: 'both'
    }
    onComplete(completeData)
  }

  const handlePreferenceChange = (category, field, value) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }))
  }

  const renderPersonalStep = () => (
    <div className="p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Personal Profile
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          First, let's set up your personal gifting profile
        </p>
      </div>

      {/* Simplified personal form */}
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              First Name *
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Interests (select at least 3)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['Electronics', 'Fashion', 'Home', 'Books', 'Sports', 'Art'].map((interest) => (
              <button
                key={interest}
                type="button"
                className="p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button
            onClick={() => handlePersonalComplete({ firstName: 'Demo', lastName: 'User' })}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )

  const renderBusinessStep = () => (
    <div className="p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-4">
          <Store className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Business Profile
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Now, let's set up your seller account
        </p>
      </div>

      {/* Simplified business form */}
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Business Name *
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            placeholder="Enter your business name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Business Type *
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white">
            <option value="">Select business type</option>
            <option value="individual">Individual Seller</option>
            <option value="small_business">Small Business</option>
            <option value="medium_business">Medium Business</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Product Categories
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['Electronics', 'Fashion', 'Home', 'Books', 'Sports', 'Art'].map((category) => (
              <button
                key={category}
                type="button"
                className="p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <button
            onClick={() => setCurrentStep('personal')}
            className="flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button
            onClick={() => handleBusinessComplete({ businessName: 'Demo Business' })}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )

  const renderPreferencesStep = () => (
    <div className="p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Customize Your Experience
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Set your preferences for the best Mr Gift experience
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Primary Role */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Primary Role
          </h3>
          <div className="space-y-3">
            {[
              { id: 'buyer', label: 'Focus on Buying', description: 'Primarily interested in finding gifts' },
              { id: 'seller', label: 'Focus on Selling', description: 'Primarily interested in selling products' },
              { id: 'both', label: 'Equal Focus', description: 'Equally interested in buying and selling' }
            ].map((role) => (
              <label key={role.id} className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="primaryRole"
                  value={role.id}
                  checked={preferences.primaryRole === role.id}
                  onChange={(e) => handlePreferenceChange('', 'primaryRole', e.target.value)}
                  className="mt-1 text-purple-600 focus:ring-purple-500"
                />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{role.label}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{role.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Dashboard Preferences */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Dashboard Preferences
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Default Dashboard View
              </label>
              <select
                value={preferences.dashboard.defaultView}
                onChange={(e) => handlePreferenceChange('dashboard', 'defaultView', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              >
                <option value="combined">Combined View</option>
                <option value="buyer">Buyer Dashboard</option>
                <option value="seller">Seller Dashboard</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={preferences.dashboard.showAnalytics}
                  onChange={(e) => handlePreferenceChange('dashboard', 'showAnalytics', e.target.checked)}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Show analytics and insights</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={preferences.dashboard.showRecommendations}
                  onChange={(e) => handlePreferenceChange('dashboard', 'showRecommendations', e.target.checked)}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Show personalized recommendations</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <button
            onClick={() => setCurrentStep('business')}
            className="flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button
            onClick={handlePreferencesComplete}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg"
          >
            Complete Setup
            <CheckCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      {/* Step Indicator */}
      <div className="bg-gray-50 dark:bg-gray-700 px-8 py-4">
        <div className="flex items-center justify-center space-x-8">
          {steps.map((step, index) => {
            const StepIcon = step.icon
            const isActive = step.id === currentStep
            const isCompleted = 
              (step.id === 'personal' && personalData.firstName) ||
              (step.id === 'business' && businessData.businessName) ||
              (step.id === 'preferences' && currentStep === 'preferences')
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center gap-3 ${isActive ? 'text-purple-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isActive ? 'bg-purple-100 dark:bg-purple-900/20' : 
                    isCompleted ? 'bg-green-100 dark:bg-green-900/20' : 
                    'bg-gray-100 dark:bg-gray-600'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <StepIcon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="hidden md:block">
                    <div className="font-medium text-sm">{step.title}</div>
                    <div className="text-xs opacity-75">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-8 h-px bg-gray-300 dark:bg-gray-600 mx-4" />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Step Content */}
      {currentStep === 'personal' && renderPersonalStep()}
      {currentStep === 'business' && renderBusinessStep()}
      {currentStep === 'preferences' && renderPreferencesStep()}
    </div>
  )
}
