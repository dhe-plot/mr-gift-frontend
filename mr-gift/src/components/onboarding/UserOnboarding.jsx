import React, { useState } from 'react'
import { User, MapPin, Calendar, Heart, Gift, ArrowLeft, ArrowRight } from 'lucide-react'

export function UserOnboarding({ onComplete, onBack }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    location: '',
    interests: [],
    giftingStyle: '',
    budget: '',
    notifications: {
      email: true,
      push: true,
      sms: false
    }
  })

  const interests = [
    'Electronics', 'Fashion', 'Home & Garden', 'Books', 'Sports', 'Art & Crafts',
    'Food & Beverages', 'Travel', 'Music', 'Gaming', 'Beauty', 'Jewelry',
    'Toys & Games', 'Health & Wellness', 'Automotive', 'Pet Supplies'
  ]

  const giftingStyles = [
    { id: 'thoughtful', label: 'Thoughtful & Personal', description: 'I love meaningful gifts with personal touches' },
    { id: 'practical', label: 'Practical & Useful', description: 'I prefer gifts that serve a purpose' },
    { id: 'luxurious', label: 'Luxurious & Premium', description: 'I enjoy high-quality, premium items' },
    { id: 'creative', label: 'Creative & Unique', description: 'I like one-of-a-kind, artistic gifts' },
    { id: 'experiential', label: 'Experiences & Activities', description: 'I prefer experiences over physical items' }
  ]

  const budgetRanges = [
    { id: 'budget', label: 'Budget-Friendly', range: '$10 - $50', description: 'Great finds without breaking the bank' },
    { id: 'moderate', label: 'Moderate', range: '$50 - $200', description: 'Quality gifts for special occasions' },
    { id: 'premium', label: 'Premium', range: '$200 - $500', description: 'High-end gifts for important people' },
    { id: 'luxury', label: 'Luxury', range: '$500+', description: 'No budget limits for perfect gifts' }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleNotificationChange = (type, value) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value
      }
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onComplete(formData)
  }

  const isFormValid = formData.firstName && formData.lastName && formData.interests.length > 0 && formData.giftingStyle && formData.budget

  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Let's Get to Know You! 🎁
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Help us personalize your gift discovery experience
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
        {/* Basic Information */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Basic Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                First Name *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="Enter your first name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="Enter your last name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="City, Country"
              />
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Your Interests *
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Select categories you're interested in (choose at least 3)
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {interests.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => handleInterestToggle(interest)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                  formData.interests.includes(interest)
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 text-gray-700 dark:text-gray-300'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Selected: {formData.interests.length} interests
          </p>
        </div>

        {/* Gifting Style */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Gift className="w-5 h-5" />
            Your Gifting Style *
          </h3>
          <div className="space-y-3">
            {giftingStyles.map((style) => (
              <label key={style.id} className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="giftingStyle"
                  value={style.id}
                  checked={formData.giftingStyle === style.id}
                  onChange={(e) => handleInputChange('giftingStyle', e.target.value)}
                  className="mt-1 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{style.label}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{style.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Budget Preference */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Budget Preference *
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {budgetRanges.map((budget) => (
              <label key={budget.id} className="flex items-start gap-3 cursor-pointer p-4 border-2 rounded-lg transition-all duration-200 hover:border-gray-400">
                <input
                  type="radio"
                  name="budget"
                  value={budget.id}
                  checked={formData.budget === budget.id}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="mt-1 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{budget.label}</div>
                  <div className="text-sm font-medium text-blue-600 dark:text-blue-400">{budget.range}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{budget.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <button
            type="submit"
            disabled={!isFormValid}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
              isFormValid
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            Complete Setup
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  )
}
