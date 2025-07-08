import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { X, Upload, Gift, Calendar, Users, Camera } from 'lucide-react'

export function CreateStoryModal({ isOpen, onClose, onSubmit }) {
  const { user } = useUser()
  const [storyData, setStoryData] = useState({
    giftName: '',
    giftPrice: '',
    giftImage: null,
    giftImagePreview: null,
    story: '',
    occasion: '',
    recipient: ''
  })

  const occasions = [
    'Birthday', 'Wedding', 'Anniversary', 'Valentine\'s Day', 'Baby Shower',
    'Graduation', 'Housewarming', 'Retirement', 'Christmas', 'Just Because'
  ]

  const recipients = [
    'Mother', 'Father', 'Sister', 'Brother', 'Partner', 'Friend',
    'Colleague', 'Grandmother', 'Grandfather', 'Child', 'Cousin'
  ]

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setStoryData(prev => ({
        ...prev,
        giftImage: file
      }))
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setStoryData(prev => ({
          ...prev,
          giftImagePreview: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!storyData.giftName || !storyData.story || !storyData.occasion || !storyData.recipient) {
      alert('Please fill in all required fields')
      return
    }

    const newStory = {
      id: Date.now(),
      user: {
        id: user.id,
        name: user.fullName || user.firstName || 'User',
        username: `@${user.username || user.firstName?.toLowerCase() || 'user'}`,
        avatar: user.imageUrl,
        isVerified: false,
        giftingStar: {
          level: 1,
          title: "Gift Seeker",
          totalOrders: 1,
          totalSpent: parseFloat(storyData.giftPrice) || 0,
          badges: ["New Member"]
        },
        stats: {
          followers: 0,
          following: 0,
          storiesPosted: 1,
          giftsGiven: 1,
          wishlistItems: 0
        }
      },
      gift: {
        name: storyData.giftName,
        image: storyData.giftImagePreview || 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=400&q=80',
        price: storyData.giftPrice ? `$${storyData.giftPrice}` : '$0'
      },
      story: storyData.story,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      isLiked: false,
      isSaved: false,
      occasion: storyData.occasion,
      recipient: storyData.recipient
    }

    onSubmit(newStory)
    
    // Reset form
    setStoryData({
      giftName: '',
      giftPrice: '',
      giftImage: null,
      giftImagePreview: null,
      story: '',
      occasion: '',
      recipient: ''
    })
    
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-backdrop fade-in" onClick={onClose}>
      <div className="modal create-story-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Share Your Gifting Story</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="create-story-form">
          <div className="form-section">
            <label className="form-label">
              <Gift size={16} />
              Gift Name *
            </label>
            <input
              type="text"
              value={storyData.giftName}
              onChange={(e) => setStoryData(prev => ({ ...prev, giftName: e.target.value }))}
              placeholder="What gift did you give or receive?"
              className="form-input"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-section">
              <label className="form-label">
                <Calendar size={16} />
                Occasion *
              </label>
              <select
                value={storyData.occasion}
                onChange={(e) => setStoryData(prev => ({ ...prev, occasion: e.target.value }))}
                className="form-select"
                required
              >
                <option value="">Select occasion</option>
                {occasions.map(occasion => (
                  <option key={occasion} value={occasion}>{occasion}</option>
                ))}
              </select>
            </div>

            <div className="form-section">
              <label className="form-label">
                <Users size={16} />
                Recipient *
              </label>
              <select
                value={storyData.recipient}
                onChange={(e) => setStoryData(prev => ({ ...prev, recipient: e.target.value }))}
                className="form-select"
                required
              >
                <option value="">Select recipient</option>
                {recipients.map(recipient => (
                  <option key={recipient} value={recipient}>{recipient}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-section">
            <label className="form-label">Gift Price (optional)</label>
            <input
              type="number"
              step="0.01"
              value={storyData.giftPrice}
              onChange={(e) => setStoryData(prev => ({ ...prev, giftPrice: e.target.value }))}
              placeholder="0.00"
              className="form-input"
            />
          </div>

          <div className="form-section">
            <label className="form-label">
              <Camera size={16} />
              Gift Photo
            </label>
            <div className="image-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="image-input"
                id="gift-image"
              />
              <label htmlFor="gift-image" className="image-upload-label">
                {storyData.giftImagePreview ? (
                  <img src={storyData.giftImagePreview} alt="Gift preview" className="image-preview" />
                ) : (
                  <div className="upload-placeholder">
                    <Upload size={24} />
                    <span>Click to upload photo</span>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="form-section">
            <label className="form-label">Your Story *</label>
            <textarea
              value={storyData.story}
              onChange={(e) => setStoryData(prev => ({ ...prev, story: e.target.value }))}
              placeholder="Tell us about this gift! Why did you choose it? How did the recipient react?"
              className="form-textarea"
              rows={4}
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Share Story
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
