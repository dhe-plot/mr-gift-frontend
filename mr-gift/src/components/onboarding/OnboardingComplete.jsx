import React from 'react'
import { CheckCircle, Gift, Star, TrendingUp, Users, ArrowRight, Sparkles } from 'lucide-react'

export function OnboardingComplete({ userData, userType, onFinish }) {
  const getUserTypeInfo = () => {
    switch (userType) {
      case 'user':
        return {
          title: 'Welcome, Gift Explorer! 🎁',
          subtitle: 'You\'re all set to discover amazing gifts',
          icon: Gift,
          color: 'from-blue-500 to-blue-600',
          features: [
            'Personalized gift recommendations',
            'Access to curated collections',
            'Share your gifting stories',
            'Connect with the community'
          ]
        }
      case 'seller':
        return {
          title: 'Welcome, Gift Creator! 🏪',
          subtitle: 'Your store is ready to showcase amazing products',
          icon: TrendingUp,
          color: 'from-green-500 to-green-600',
          features: [
            'List and manage your products',
            'Access seller analytics',
            'Connect with customers',
            'Grow your business'
          ]
        }
      case 'both':
        return {
          title: 'Welcome, Mr Gift Pro! 🌟',
          subtitle: 'You have access to the complete Mr Gift experience',
          icon: Users,
          color: 'from-purple-500 to-pink-500',
          features: [
            'Full buyer and seller features',
            'Advanced analytics dashboard',
            'Priority customer support',
            'Community leadership access'
          ]
        }
      default:
        return {
          title: 'Welcome to Mr Gift! 🎉',
          subtitle: 'You\'re ready to start your gifting journey',
          icon: Gift,
          color: 'from-blue-500 to-purple-500',
          features: []
        }
    }
  }

  const typeInfo = getUserTypeInfo()
  const IconComponent = typeInfo.icon

  const nextSteps = [
    {
      title: 'Explore the Platform',
      description: 'Take a tour of your new dashboard and discover all features',
      action: 'Start Tour',
      icon: Sparkles
    },
    {
      title: 'Complete Your Profile',
      description: 'Add more details to get better recommendations',
      action: 'Edit Profile',
      icon: Users
    },
    {
      title: 'Join the Community',
      description: 'Connect with other gift enthusiasts and share experiences',
      action: 'Explore Community',
      icon: Star
    }
  ]

  return (
    <div className="p-8 text-center">
      {/* Success Animation */}
      <div className="mb-8">
        <div className="relative inline-flex items-center justify-center">
          <div className={`w-24 h-24 bg-gradient-to-r ${typeInfo.color} rounded-full flex items-center justify-center mb-4 animate-pulse`}>
            <IconComponent className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {typeInfo.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          {typeInfo.subtitle}
        </p>
        
        {/* Confetti Effect */}
        <div className="text-6xl mb-6 animate-bounce">
          🎉
        </div>
      </div>

      {/* Account Summary */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/20 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Your Account Summary
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-left">
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Account Type</div>
            <div className="font-medium text-gray-900 dark:text-white capitalize">
              {userType === 'both' ? 'Complete Experience' : userType === 'user' ? 'Gift Explorer' : 'Gift Seller'}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Member Since</div>
            <div className="font-medium text-gray-900 dark:text-white">
              {new Date().toLocaleDateString()}
            </div>
          </div>
          {userData.personal?.firstName && (
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Name</div>
              <div className="font-medium text-gray-900 dark:text-white">
                {userData.personal.firstName} {userData.personal.lastName}
              </div>
            </div>
          )}
          {userData.business?.businessName && (
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Business</div>
              <div className="font-medium text-gray-900 dark:text-white">
                {userData.business.businessName}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Features Unlocked */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Features Unlocked ✨
        </h3>
        <div className="grid md:grid-cols-2 gap-3 max-w-2xl mx-auto">
          {typeInfo.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          What's Next? 🚀
        </h3>
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {nextSteps.map((step, index) => {
            const StepIcon = step.icon
            return (
              <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <StepIcon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {step.description}
                </p>
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                  {step.action} →
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Special Welcome Offer */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Welcome Bonus! 🎁
          </h3>
          <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          As a new member, you get exclusive access to:
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full">
            🎯 Personalized recommendations
          </span>
          <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full">
            💝 Exclusive gift collections
          </span>
          <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full">
            🌟 Early access to new features
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <button
          onClick={onFinish}
          className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${typeInfo.color} hover:shadow-lg text-white rounded-lg font-medium text-lg transition-all duration-200 transform hover:scale-105`}
        >
          Enter Mr Gift
          <ArrowRight className="w-5 h-5" />
        </button>
        
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            You can always update your preferences in settings
          </p>
        </div>
      </div>

      {/* Footer Message */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Thank you for joining Mr Gift! We're excited to be part of your gifting journey. 💝
        </p>
      </div>
    </div>
  )
}
