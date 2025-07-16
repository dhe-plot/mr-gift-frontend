import React, { useState } from 'react'
import { Gift, ShoppingBag, Users, Star, TrendingUp, Heart } from 'lucide-react'

export function UserTypeSelection({ onSelect }) {
  const [selectedType, setSelectedType] = useState(null)

  const userTypes = [
    {
      id: 'user',
      title: 'Gift Receiver & Giver',
      subtitle: 'I want to find and give amazing gifts',
      description: 'Perfect for individuals who love discovering unique gifts and sharing their gifting experiences with the community.',
      icon: Gift,
      color: 'from-blue-500 to-blue-600',
      features: [
        'Discover curated gifts',
        'Share gifting stories',
        'Get personalized recommendations',
        'Connect with gift givers',
        'Save favorite items'
      ],
      stats: '50K+ active gift givers'
    },
    {
      id: 'seller',
      title: 'Gift Seller & Creator',
      subtitle: 'I want to sell gifts and grow my business',
      description: 'Ideal for businesses, artisans, and entrepreneurs who want to showcase and sell their products to gift enthusiasts.',
      icon: ShoppingBag,
      color: 'from-green-500 to-green-600',
      features: [
        'List and sell products',
        'Manage inventory',
        'Analytics dashboard',
        'Customer insights',
        'Marketing tools'
      ],
      stats: '5K+ successful sellers'
    },
    {
      id: 'both',
      title: 'Complete Experience',
      subtitle: 'I want to buy, sell, and engage with the community',
      description: 'The ultimate Mr Gift experience - perfect for power users who want access to all features and capabilities.',
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      features: [
        'All buyer features',
        'All seller features',
        'Priority support',
        'Advanced analytics',
        'Community leadership'
      ],
      stats: 'Most popular choice',
      popular: true
    }
  ]

  const handleSelect = (type) => {
    setSelectedType(type)
  }

  const handleContinue = () => {
    if (selectedType) {
      onSelect(selectedType)
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
          <Gift className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome to Mr Gift! 🎁
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Let's personalize your experience. How would you like to use Mr Gift?
        </p>
      </div>

      {/* User Type Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {userTypes.map((type) => {
          const IconComponent = type.icon
          const isSelected = selectedType === type.id
          
          return (
            <div
              key={type.id}
              onClick={() => handleSelect(type.id)}
              className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                isSelected 
                  ? 'ring-4 ring-blue-500 ring-opacity-50 shadow-xl' 
                  : 'hover:shadow-lg'
              }`}
            >
              {type.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    POPULAR
                  </div>
                </div>
              )}
              
              <div className={`h-full bg-white dark:bg-gray-700 rounded-xl border-2 p-6 ${
                isSelected 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
              }`}>
                {/* Icon and Title */}
                <div className="text-center mb-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${type.color} rounded-lg mb-3`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {type.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {type.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 text-center">
                  {type.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {type.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                    <TrendingUp className="w-4 h-4" />
                    {type.stats}
                  </div>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Continue Button */}
      <div className="text-center">
        <button
          onClick={handleContinue}
          disabled={!selectedType}
          className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
            selectedType
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue with {selectedType ? userTypes.find(t => t.id === selectedType)?.title : 'Selection'}
        </button>
        
        {selectedType && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Don't worry, you can always change this later in your settings
          </p>
        )}
      </div>
    </div>
  )
}
