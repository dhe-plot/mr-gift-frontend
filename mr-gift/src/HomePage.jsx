import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import mrGiftLogo from './assets/mr_gift_logo.png'
import { AuthButton } from './components/auth/AuthButton'
import { OnboardingFlow } from './components/onboarding/OnboardingFlow'

// Sample data for stories
const sampleStories = [
  {
    id: 1,
    user: {
      name: 'Sarah Chen',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      verified: true,
      level: 'L3',
      title: 'Gift Master',
      followers: 1250,
      giftsGiven: 89
    },
    story: {
      title: 'Perfect Anniversary Surprise',
      content: 'Found the most amazing personalized jewelry for my husband\'s 5th anniversary. The craftsmanship was incredible and his reaction was priceless! 💍✨',
      timestamp: '2 hours ago',
      occasion: 'Anniversary',
      recipient: 'Husband'
    },
    gift: {
      name: 'Custom Engraved Watch',
      price: '$299',
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=300&q=80',
      tags: ['Personalized', 'Luxury', 'Jewelry']
    },
    likes: 42,
    comments: 8
  },
  {
    id: 2,
    user: {
      name: 'Mike Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      verified: false,
      level: 'L2',
      title: 'Thoughtful Giver',
      followers: 890,
      giftsGiven: 34
    },
    story: {
      title: 'Mom\'s Birthday Success',
      content: 'After weeks of searching, I found this beautiful spa set that made my mom cry happy tears. Sometimes the perfect gift just speaks to you! 🌸',
      timestamp: '5 hours ago',
      occasion: 'Birthday',
      recipient: 'Mother'
    },
    gift: {
      name: 'Luxury Spa Collection',
      price: '$89',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=300&q=80',
      tags: ['Spa', 'Relaxation', 'Self-care']
    },
    likes: 28,
    comments: 5
  },
  {
    id: 3,
    user: {
      name: 'Emily Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      verified: true,
      level: 'L4',
      title: 'Gift Guru',
      followers: 2100,
      giftsGiven: 156
    },
    story: {
      title: 'Colleague Appreciation',
      content: 'Wanted to thank my amazing colleague for all her help this year. This artisan coffee set was perfect - she\'s been raving about it all week! ☕',
      timestamp: '1 day ago',
      occasion: 'Thank You',
      recipient: 'Colleague'
    },
    gift: {
      name: 'Artisan Coffee Sampler',
      price: '$45',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80',
      tags: ['Coffee', 'Gourmet', 'Artisan']
    },
    likes: 67,
    comments: 12
  }
];

// Featured gifts data
const featuredGifts = [
  {
    id: 1,
    name: 'Luxury Spa Set',
    description: 'Premium spa collection for ultimate relaxation',
    price: '$89.99',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    name: 'Artisan Coffee Collection',
    description: 'Handpicked coffee beans from around the world',
    price: '$45.99',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    name: 'Personalized Jewelry',
    description: 'Custom-made jewelry with personal touch',
    price: '$129.99',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80'
  }
];

// Top gifters data
const topGifters = [
  { id: 1, name: 'Alex Chen', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', rank: 1, stars: 5.0 },
  { id: 2, name: 'Maria Garcia', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', rank: 2, stars: 4.9 },
  { id: 3, name: 'David Kim', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', rank: 3, stars: 4.8 },
  { id: 4, name: 'Sophie Wilson', avatar: 'https://randomuser.me/api/portraits/women/4.jpg', rank: 4, stars: 4.7 },
  { id: 5, name: 'James Brown', avatar: 'https://randomuser.me/api/portraits/men/5.jpg', rank: 5, stars: 4.6 }
];

export default function HomePage() {
  const [stories, setStories] = useState(sampleStories)
  const [likedStories, setLikedStories] = useState(new Set())
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState(null)

  // Check for existing user data on component mount
  useEffect(() => {
    const savedUserData = localStorage.getItem('mrGiftUserData')
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData)
      setUserData(parsedData)
      setIsAuthenticated(true)
    }
  }, [])

  const handleAuthSuccess = () => {
    setIsAuthenticated(true)
    setShowOnboarding(true)
  }

  const handleOnboardingComplete = (data) => {
    setUserData(data)
    setShowOnboarding(false)
    // In a real app, this would save to your backend
    console.log('Onboarding completed:', data)
  }

  const handleOpenPreferences = () => {
    // Handle preferences modal opening
    console.log('Opening preferences...')
  }

  // Show onboarding flow if user is authenticated but hasn't completed onboarding
  if (isAuthenticated && showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />
  }

  const handleLike = (storyId) => {
    const newLiked = new Set(likedStories)
    if (newLiked.has(storyId)) {
      newLiked.delete(storyId)
    } else {
      newLiked.add(storyId)
    }
    setLikedStories(newLiked)

    setStories(prev => prev.map(story =>
      story.id === storyId
        ? { ...story, likes: newLiked.has(storyId) ? story.likes + 1 : story.likes - 1 }
        : story
    ))
  }

  return (
    <div style={{ background: '#181312', minHeight: '100vh', color: 'white' }}>
      {/* Header */}
      <header style={{
        background: '#181111',
        padding: '1rem 2rem',
        borderBottom: '1px solid #333',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <img src={mrGiftLogo} alt="Mr. Gift Logo" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>MR.GIFT</div>
            <div style={{ fontSize: '0.7rem', color: '#b0b8c1' }}>BY DHE-PLOT</div>
          </div>
        </div>
        
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#4ecdc4', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
          <Link to="/gifts" style={{ color: '#b0b8c1', textDecoration: 'none', fontWeight: 500 }}>Gifts</Link>
          <Link to="/brands" style={{ color: '#b0b8c1', textDecoration: 'none', fontWeight: 500 }}>Brands</Link>
          <Link to="/about" style={{ color: '#b0b8c1', textDecoration: 'none', fontWeight: 500 }}>About</Link>
          <Link to="/seller-dashboard" style={{ color: '#b0b8c1', textDecoration: 'none', fontWeight: 500 }}>Sell</Link>
        </nav>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <AuthButton
            onOpenPreferences={handleOpenPreferences}
            onAuthSuccess={handleAuthSuccess}
            isAuthenticated={isAuthenticated}
            userData={userData}
          />
        </div>
      </header>

      {/* Main Content */}
      <main style={{ 
        display: 'flex', 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '2rem',
        gap: '2rem'
      }}>
        {/* Left Sidebar */}
        <aside style={{ 
          width: '250px',
          background: '#1a1a1a',
          borderRadius: '12px',
          padding: '1.5rem',
          height: 'fit-content',
          border: '1px solid #333'
        }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#4ecdc4' }}>Explore</h3>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link to="/gifts" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.8rem',
              color: '#b0b8c1',
              textDecoration: 'none',
              padding: '0.8rem',
              borderRadius: '8px',
              transition: 'background 0.2s'
            }}>
              <span>🎁</span> Gifters Near Me
            </Link>
            <a href="#" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.8rem',
              color: '#b0b8c1',
              textDecoration: 'none',
              padding: '0.8rem',
              borderRadius: '8px'
            }}>
              <span>🎉</span> Occasions
            </a>
            <a href="#" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.8rem',
              color: '#b0b8c1',
              textDecoration: 'none',
              padding: '0.8rem',
              borderRadius: '8px'
            }}>
              <span>👥</span> Recipients
            </a>
            <Link to="/brands" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.8rem',
              color: '#b0b8c1',
              textDecoration: 'none',
              padding: '0.8rem',
              borderRadius: '8px'
            }}>
              <span>🏪</span> Brands
            </Link>
          </nav>
        </aside>

        {/* Center Content - Featured Stories */}
        <section style={{ flex: 1, maxWidth: '600px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <h2 style={{ color: '#4ecdc4', fontSize: '1.5rem' }}>Featured Stories</h2>
            <button style={{
              background: 'linear-gradient(135deg, #4ecdc4 0%, #45b7aa 100%)',
              color: 'white',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600
            }}>
              Share Your Story
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {stories.map(story => (
              <article key={story.id} style={{
                background: '#1a1a1a',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid #333'
              }}>
                {/* User Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <img 
                    src={story.user.avatar} 
                    alt={story.user.name}
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 600 }}>{story.user.name}</span>
                      {story.user.verified && <span style={{ color: '#4ecdc4' }}>✓</span>}
                      <span style={{ 
                        background: '#ff6347',
                        color: 'white',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '10px',
                        fontSize: '0.7rem',
                        fontWeight: 600
                      }}>
                        {story.user.level} {story.user.title}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>
                      {story.user.followers} followers • {story.user.giftsGiven} gifts given
                    </div>
                  </div>
                  <button style={{
                    background: '#4ecdc4',
                    color: '#000',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}>
                    Follow
                  </button>
                </div>

                {/* Story Content */}
                <div style={{ marginBottom: '1rem' }}>
                  <h3 style={{ color: '#4ecdc4', marginBottom: '0.5rem' }}>{story.story.title}</h3>
                  <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>{story.story.content}</p>
                  
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                    <span style={{ 
                      background: '#ff6347',
                      color: 'white',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '12px',
                      fontSize: '0.8rem'
                    }}>
                      {story.story.occasion}
                    </span>
                    <span style={{ 
                      background: '#ffd700',
                      color: '#000',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '12px',
                      fontSize: '0.8rem'
                    }}>
                      {story.story.recipient}
                    </span>
                  </div>
                </div>

                {/* Gift Showcase */}
                <div style={{
                  background: '#0f0f0f',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <img 
                      src={story.gift.image}
                      alt={story.gift.name}
                      style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ color: '#4ecdc4', marginBottom: '0.5rem' }}>{story.gift.name}</h4>
                      <div style={{ color: '#4ecdc4', fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                        {story.gift.price}
                      </div>
                      <div style={{ display: 'flex', gap: '0.3rem' }}>
                        {story.gift.tags.map((tag, index) => (
                          <span key={index} style={{
                            background: '#333',
                            color: '#b8a89c',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '10px',
                            fontSize: '0.7rem'
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link 
                      to="/gifts"
                      style={{
                        background: '#4ecdc4',
                        color: '#000',
                        border: 'none',
                        padding: '0.8rem 1.2rem',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontWeight: 600,
                        alignSelf: 'center'
                      }}
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>

                {/* Story Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button 
                      onClick={() => handleLike(story.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: likedStories.has(story.id) ? '#ff6347' : '#888',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}
                    >
                      {likedStories.has(story.id) ? '❤️' : '🤍'} {story.likes}
                    </button>
                    <button style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#888',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}>
                      💬 {story.comments}
                    </button>
                  </div>
                  <span style={{ color: '#888', fontSize: '0.8rem' }}>{story.story.timestamp}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Right Sidebar */}
        <aside style={{ width: '300px' }}>
          {/* Featured Gifts */}
          <section style={{
            background: '#1a1a1a',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem',
            border: '1px solid #333'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#4ecdc4' }}>Featured Gifts</h3>
              <Link to="/gifts" style={{ color: '#4ecdc4', textDecoration: 'none', fontSize: '0.9rem' }}>
                View All →
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {featuredGifts.map(gift => (
                <div key={gift.id} style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '1rem',
                  background: '#0f0f0f',
                  borderRadius: '8px'
                }}>
                  <img 
                    src={gift.image}
                    alt={gift.name}
                    style={{ width: '60px', height: '60px', borderRadius: '6px', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>{gift.name}</h4>
                    <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem' }}>{gift.description}</p>
                    <div style={{ color: '#4ecdc4', fontWeight: 600 }}>{gift.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Top Gifters */}
          <section style={{
            background: '#1a1a1a',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #333'
          }}>
            <h3 style={{ color: '#4ecdc4', marginBottom: '1.5rem' }}>Top Gifters</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {topGifters.map(gifter => (
                <div key={gifter.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.8rem',
                  background: '#0f0f0f',
                  borderRadius: '8px'
                }}>
                  <div style={{
                    background: gifter.rank <= 3 ? '#ffd700' : '#666',
                    color: gifter.rank <= 3 ? '#000' : '#fff',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}>
                    {gifter.rank}
                  </div>
                  <img 
                    src={gifter.avatar}
                    alt={gifter.name}
                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{gifter.name}</div>
                    <div style={{ color: '#ffd700', fontSize: '0.8rem' }}>⭐ {gifter.stars}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: 'linear-gradient(135deg, rgba(78, 205, 196, 0.1), rgba(255, 99, 71, 0.1))',
              borderRadius: '8px',
              textAlign: 'center',
              border: '1px solid rgba(78, 205, 196, 0.3)'
            }}>
              <h4 style={{ marginBottom: '0.5rem' }}>Join the Community</h4>
              <p style={{ fontSize: '0.8rem', color: '#b8a89c', marginBottom: '1rem' }}>
                Start your gifting journey and become a top gifter!
              </p>
              <button style={{
                background: '#4ecdc4',
                color: '#000',
                border: 'none',
                padding: '0.8rem 1.5rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600,
                width: '100%'
              }}>
                Get Started
              </button>
            </div>
          </section>
        </aside>
      </main>

      {/* Footer */}
      <footer style={{
        background: '#181111',
        padding: '3rem 2rem 2rem',
        borderTop: '1px solid #333',
        marginTop: '4rem'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                <img src={mrGiftLogo} alt="Mr. Gift Logo" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>MR.GIFT</div>
                  <div style={{ fontSize: '0.7rem', color: '#b0b8c1' }}>BY DHE-PLOT</div>
                </div>
              </div>
              <p style={{ color: '#b8a89c', lineHeight: 1.6 }}>
                Your ultimate gifting platform. Discover, share, and give meaningful gifts that create lasting memories.
              </p>
            </div>
            
            <div>
              <h4 style={{ color: '#4ecdc4', marginBottom: '1rem' }}>Quick Links</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Link to="/about" style={{ color: '#b8a89c', textDecoration: 'none' }}>About</Link>
                <a href="#" style={{ color: '#b8a89c', textDecoration: 'none' }}>Contact</a>
                <a href="#" style={{ color: '#b8a89c', textDecoration: 'none' }}>Blog</a>
                <Link to="/seller-dashboard" style={{ color: '#b8a89c', textDecoration: 'none' }}>Become a Seller</Link>
              </div>
            </div>
            
            <div>
              <h4 style={{ color: '#4ecdc4', marginBottom: '1rem' }}>Follow Us</h4>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="#" style={{ color: '#b8a89c', textDecoration: 'none' }}>Discord</a>
                <a href="#" style={{ color: '#b8a89c', textDecoration: 'none' }}>X</a>
                <a href="#" style={{ color: '#b8a89c', textDecoration: 'none' }}>TikTok</a>
                <a href="#" style={{ color: '#b8a89c', textDecoration: 'none' }}>Instagram</a>
                <a href="#" style={{ color: '#b8a89c', textDecoration: 'none' }}>Facebook</a>
              </div>
            </div>
          </div>
          
          <div style={{ 
            borderTop: '1px solid #333',
            marginTop: '2rem',
            paddingTop: '2rem',
            textAlign: 'center',
            color: '#888'
          }}>
            © 2025 MR.GIFT by DHE-PLOT. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
