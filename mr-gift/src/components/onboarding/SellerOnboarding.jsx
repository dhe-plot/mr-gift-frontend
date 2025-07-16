import React, { useState } from 'react'
import { Store, Package, CreditCard, Globe, ArrowLeft, ArrowRight, Upload, Building } from 'lucide-react'

export function SellerOnboarding({ onComplete, onBack }) {
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    description: '',
    website: '',
    categories: [],
    businessAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    taxInfo: {
      taxId: '',
      businessLicense: ''
    },
    bankingInfo: {
      accountType: '',
      routingNumber: '',
      accountNumber: ''
    },
    shippingOptions: [],
    returnPolicy: '',
    logo: null
  })

  const businessTypes = [
    { id: 'individual', label: 'Individual Seller', description: 'Personal seller or hobbyist' },
    { id: 'small_business', label: 'Small Business', description: 'Small business with 1-50 employees' },
    { id: 'medium_business', label: 'Medium Business', description: 'Business with 50-500 employees' },
    { id: 'enterprise', label: 'Enterprise', description: 'Large corporation with 500+ employees' },
    { id: 'nonprofit', label: 'Non-Profit', description: 'Non-profit organization' }
  ]

  const categories = [
    'Electronics', 'Fashion & Apparel', 'Home & Garden', 'Books & Media', 'Sports & Outdoors',
    'Art & Crafts', 'Food & Beverages', 'Beauty & Personal Care', 'Jewelry & Accessories',
    'Toys & Games', 'Health & Wellness', 'Automotive', 'Pet Supplies', 'Office Supplies',
    'Musical Instruments', 'Baby & Kids'
  ]

  const shippingOptions = [
    { id: 'standard', label: 'Standard Shipping', description: '5-7 business days' },
    { id: 'expedited', label: 'Expedited Shipping', description: '2-3 business days' },
    { id: 'overnight', label: 'Overnight Shipping', description: 'Next business day' },
    { id: 'international', label: 'International Shipping', description: 'Worldwide delivery' },
    { id: 'local_pickup', label: 'Local Pickup', description: 'Customer pickup available' }
  ]

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleCategoryToggle = (category) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }))
  }

  const handleShippingToggle = (option) => {
    setFormData(prev => ({
      ...prev,
      shippingOptions: prev.shippingOptions.includes(option)
        ? prev.shippingOptions.filter(s => s !== option)
        : [...prev.shippingOptions, option]
    }))
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        logo: file
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onComplete(formData)
  }

  const isFormValid = formData.businessName && formData.businessType && formData.categories.length > 0 && formData.shippingOptions.length > 0

  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-4">
          <Store className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Set Up Your Store! 🏪
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Let's get your business ready to sell amazing gifts
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
        {/* Business Information */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Building className="w-5 h-5" />
            Business Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Business Name *
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="Enter your business name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Business Type *
              </label>
              <select
                value={formData.businessType}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                required
              >
                <option value="">Select business type</option>
                {businessTypes.map((type) => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="https://your-website.com"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Business Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="Tell customers about your business..."
              />
            </div>
          </div>
        </div>

        {/* Product Categories */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Package className="w-5 h-5" />
            Product Categories *
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Select the categories that best describe your products
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryToggle(category)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                  formData.categories.includes(category)
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 text-gray-700 dark:text-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Selected: {formData.categories.length} categories
          </p>
        </div>

        {/* Shipping Options */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Shipping Options *
          </h3>
          <div className="space-y-3">
            {shippingOptions.map((option) => (
              <label key={option.id} className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.shippingOptions.includes(option.id)}
                  onChange={() => handleShippingToggle(option.id)}
                  className="mt-1 text-green-600 focus:ring-green-500"
                />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{option.label}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{option.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Business Address */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Business Address
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Street Address
              </label>
              <input
                type="text"
                value={formData.businessAddress.street}
                onChange={(e) => handleInputChange('businessAddress.street', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="123 Business St"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                City
              </label>
              <input
                type="text"
                value={formData.businessAddress.city}
                onChange={(e) => handleInputChange('businessAddress.city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                State/Province
              </label>
              <input
                type="text"
                value={formData.businessAddress.state}
                onChange={(e) => handleInputChange('businessAddress.state', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="State"
              />
            </div>
          </div>
        </div>

        {/* Logo Upload */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Business Logo
          </h3>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Upload your business logo (optional)
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="logo-upload"
            />
            <label
              htmlFor="logo-upload"
              className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Choose File
            </label>
            {formData.logo && (
              <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                ✓ {formData.logo.name}
              </p>
            )}
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
                ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl'
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
