import React, { useState } from 'react'
import { UserTypeSelection } from './UserTypeSelection'
import { UserOnboarding } from './UserOnboarding'
import { SellerOnboarding } from './SellerOnboarding'
import { BothOnboarding } from './BothOnboarding'
import { OnboardingComplete } from './OnboardingComplete'

export function OnboardingFlow({ onComplete }) {
  const [currentStep, setCurrentStep] = useState('userType')
  const [userType, setUserType] = useState(null)
  const [userData, setUserData] = useState({})

  const handleUserTypeSelect = (type) => {
    setUserType(type)
    setCurrentStep(type)
  }

  const handleStepComplete = (data) => {
    setUserData(prev => ({ ...prev, ...data }))
    setCurrentStep('complete')
  }

  const handleOnboardingComplete = () => {
    const completeUserData = {
      ...userData,
      userType,
      onboardingCompleted: true,
      createdAt: new Date().toISOString()
    }
    
    // Save to localStorage for demo purposes
    localStorage.setItem('mrGiftUserData', JSON.stringify(completeUserData))
    
    onComplete(completeUserData)
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'userType':
        return (
          <UserTypeSelection 
            onSelect={handleUserTypeSelect}
          />
        )
      case 'user':
        return (
          <UserOnboarding 
            onComplete={handleStepComplete}
            onBack={() => setCurrentStep('userType')}
          />
        )
      case 'seller':
        return (
          <SellerOnboarding 
            onComplete={handleStepComplete}
            onBack={() => setCurrentStep('userType')}
          />
        )
      case 'both':
        return (
          <BothOnboarding 
            onComplete={handleStepComplete}
            onBack={() => setCurrentStep('userType')}
          />
        )
      case 'complete':
        return (
          <OnboardingComplete 
            userData={userData}
            userType={userType}
            onFinish={handleOnboardingComplete}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className={`w-3 h-3 rounded-full ${currentStep === 'userType' ? 'bg-blue-600' : 'bg-gray-300'}`} />
            <div className={`w-3 h-3 rounded-full ${['user', 'seller', 'both'].includes(currentStep) ? 'bg-blue-600' : 'bg-gray-300'}`} />
            <div className={`w-3 h-3 rounded-full ${currentStep === 'complete' ? 'bg-blue-600' : 'bg-gray-300'}`} />
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentStep === 'userType' && 'Step 1 of 3: Choose your role'}
              {['user', 'seller', 'both'].includes(currentStep) && 'Step 2 of 3: Set up your profile'}
              {currentStep === 'complete' && 'Step 3 of 3: Welcome to Mr Gift!'}
            </p>
          </div>
        </div>

        {/* Current Step Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  )
}
