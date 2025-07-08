import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const giftProducts = [
  {
    id: 1,
    name: 'Luxury Spa Set',
    desc: 'Indulge in relaxation with our premium spa collection',
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    price: 49.99,
    originalPrice: 69.99,
    lat: 40.7128, // New York
    lng: -74.0060,
    category: 'Beauty & Wellness',
    occasion: ['Birthday', 'Anniversary', 'Self-care'],
    recipient: ['Mother', 'Wife', 'Friend'],
    rating: 4.8,
    reviews: 124,
    inStock: true,
    seller: 'Giftify',
    tags: ['luxury', 'spa', 'relaxation'],
    discount: 29
  },
  {
    id: 2,
    name: 'Gourmet Chocolate Box',
    desc: 'A sweet treat for any special occasion',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    price: 29.99,
    originalPrice: 39.99,
    lat: 41.8781, // Chicago
    lng: -87.6298,
    category: 'Food & Beverage',
    occasion: ['Valentine\'s Day', 'Birthday', 'Thank You'],
    recipient: ['Anyone', 'Colleague', 'Friend'],
    rating: 4.6,
    reviews: 89,
    inStock: true,
    seller: 'ChocoDelight',
    tags: ['chocolate', 'sweet', 'gourmet'],
    discount: 25
  },
  {
    id: 3,
    name: 'Personalized Jewelry',
    desc: 'Custom-made jewelry with a personal touch',
    img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    price: 89.99,
    originalPrice: 129.99,
    lat: 34.0522, // Los Angeles
    lng: -118.2437,
    category: 'Jewelry & Accessories',
    occasion: ['Anniversary', 'Engagement', 'Birthday'],
    recipient: ['Wife', 'Girlfriend', 'Daughter'],
    rating: 4.9,
    reviews: 156,
    inStock: true,
    seller: 'Giftify',
    tags: ['personalized', 'jewelry', 'custom'],
    discount: 31
  },
  {
    id: 4,
    name: 'Handcrafted Leather Wallet',
    desc: 'A stylish and durable wallet for everyday use',
    img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    price: 39.99,
    originalPrice: 59.99,
    lat: 29.7604, // Houston
    lng: -95.3698,
    category: 'Fashion & Accessories',
    occasion: ['Birthday', 'Father\'s Day', 'Graduation'],
    recipient: ['Father', 'Husband', 'Brother'],
    rating: 4.7,
    reviews: 78,
    inStock: true,
    seller: 'CraftMasters',
    tags: ['leather', 'handcrafted', 'wallet'],
    discount: 33
  },
  {
    id: 5,
    name: 'Artisan Coffee Sampler',
    desc: 'A selection of premium coffees from around the world',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    price: 24.99,
    originalPrice: 34.99,
    lat: 47.6062, // Seattle
    lng: -122.3321,
    category: 'Food & Beverage',
    occasion: ['Birthday', 'Thank You', 'Housewarming'],
    recipient: ['Coffee Lover', 'Colleague', 'Friend'],
    rating: 4.5,
    reviews: 92,
    inStock: true,
    seller: 'ChocoDelight',
    tags: ['coffee', 'artisan', 'sampler'],
    discount: 29
  },
  {
    id: 6,
    name: 'Cozy Knit Blanket',
    desc: 'A soft and warm blanket perfect for cold nights',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    price: 59.99,
    originalPrice: 79.99,
    lat: 39.7392, // Denver
    lng: -104.9903,
    category: 'Home & Living',
    occasion: ['Housewarming', 'Birthday', 'Winter'],
    recipient: ['Anyone', 'Family', 'Friend'],
    rating: 4.4,
    reviews: 67,
    inStock: true,
    seller: 'CozyHome',
    tags: ['blanket', 'cozy', 'warm'],
    discount: 25
  },
  {
    id: 7,
    name: 'Tech Gadget Organizer',
    desc: 'Keep your gadgets organized and easily accessible',
    img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    price: 34.99,
    originalPrice: 49.99,
    lat: 37.7749, // San Francisco
    lng: -122.4194,
    category: 'Technology',
    occasion: ['Birthday', 'Back to School', 'Office'],
    recipient: ['Tech Enthusiast', 'Student', 'Professional'],
    rating: 4.6,
    reviews: 103,
    inStock: true,
    seller: 'TechGenius',
    tags: ['organizer', 'tech', 'gadgets'],
    discount: 30
  },
  {
    id: 8,
    name: 'Gourmet Cheese Selection',
    desc: 'A variety of fine cheeses for the connoisseur',
    img: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80',
    price: 44.99,
    originalPrice: 59.99,
    lat: 42.3601, // Boston
    lng: -71.0589,
    category: 'Food & Beverage',
    occasion: ['Dinner Party', 'Thank You', 'Holiday'],
    recipient: ['Food Lover', 'Host', 'Family'],
    rating: 4.7,
    reviews: 85,
    inStock: false,
    seller: 'GourmetDelights',
    tags: ['cheese', 'gourmet', 'selection'],
    discount: 25
  },
  {
    id: 9,
    name: 'Scented Candle Set',
    desc: 'Fill your home with delightful aromas',
    img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80',
    price: 19.99,
    originalPrice: 29.99,
    lat: 25.7617, // Miami
    lng: -80.1918,
    category: 'Home & Living',
    occasion: ['Housewarming', 'Relaxation', 'Gift'],
    recipient: ['Anyone', 'Friend', 'Family'],
    rating: 4.3,
    reviews: 76,
    inStock: true,
    seller: 'AromaBliss',
    tags: ['candles', 'scented', 'relaxation'],
    discount: 33
  },
  {
    id: 10,
    name: 'Fitness Tracker',
    desc: 'Track your health and fitness goals with style',
    img: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
    price: 79.99,
    originalPrice: 99.99,
    lat: 33.4484, // Phoenix
    lng: -112.0740,
    category: 'Technology',
    occasion: ['New Year', 'Birthday', 'Fitness Journey'],
    recipient: ['Fitness Enthusiast', 'Health Conscious', 'Anyone'],
    rating: 4.8,
    reviews: 142,
    inStock: true,
    seller: 'TechGenius',
    tags: ['fitness', 'tracker', 'health'],
    discount: 20
  }
];

function ProductCard({ product, onAddToCart, onAddToWishlist, isInWishlist }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div style={{
      background: '#1a1a1a',
      borderRadius: '12px',
      padding: '1rem',
      border: '1px solid #333',
      transition: 'transform 0.2s',
      cursor: 'pointer',
      position: 'relative'
    }}
    onMouseEnter={(e) => e.target.style.transform = 'translateY(-4px)'}
    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
    >
      {/* Discount Badge */}
      {product.discount && (
        <div style={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          background: '#ff6347',
          color: 'white',
          padding: '0.3rem 0.6rem',
          borderRadius: '12px',
          fontSize: '0.8rem',
          fontWeight: 600,
          zIndex: 1
        }}>
          -{product.discount}%
        </div>
      )}

      {/* Stock Status */}
      {!product.inStock && (
        <div style={{
          position: 'absolute',
          top: '0.5rem',
          left: '0.5rem',
          background: '#666',
          color: 'white',
          padding: '0.3rem 0.6rem',
          borderRadius: '12px',
          fontSize: '0.8rem',
          fontWeight: 600,
          zIndex: 1
        }}>
          Out of Stock
        </div>
      )}

      <img
        src={product.img}
        alt={product.name}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}
      />

      <div>
        <h3 style={{ color: '#4ecdc4', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
          {product.name}
        </h3>
        <p style={{ color: '#b8a89c', fontSize: '0.9rem', marginBottom: '0.8rem', lineHeight: 1.4 }}>
          {product.desc}
        </p>

        {/* Rating and Reviews */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
          <span style={{ color: '#ffd700' }}>⭐ {product.rating}</span>
          <span style={{ color: '#888', fontSize: '0.8rem' }}>({product.reviews} reviews)</span>
          <span style={{ color: '#888', fontSize: '0.8rem' }}>• {product.seller}</span>
        </div>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <span style={{ color: '#4ecdc4', fontWeight: 600, fontSize: '1.2rem' }}>
            ${product.price}
          </span>
          {product.originalPrice && (
            <span style={{
              color: '#888',
              textDecoration: 'line-through',
              fontSize: '0.9rem'
            }}>
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {product.tags.slice(0, 2).map((tag, index) => (
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

        {/* Distance */}
        {product.distance && (
          <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '1rem' }}>
            📍 {product.distance.toFixed(1)} km away
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            style={{
              flex: 1,
              background: product.inStock ? '#4ecdc4' : '#666',
              color: product.inStock ? '#000' : '#ccc',
              border: 'none',
              padding: '0.8rem',
              borderRadius: '6px',
              cursor: product.inStock ? 'pointer' : 'not-allowed',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
          <button
            onClick={() => onAddToWishlist(product.id)}
            style={{
              background: isInWishlist ? '#ff6347' : 'transparent',
              color: isInWishlist ? 'white' : '#ff6347',
              border: '1px solid #ff6347',
              padding: '0.8rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            {isInWishlist ? '❤️' : '🤍'}
          </button>
        </div>

        {/* Quick Details Toggle */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          style={{
            width: '100%',
            background: 'transparent',
            color: '#4ecdc4',
            border: '1px solid #4ecdc4',
            padding: '0.5rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            marginTop: '0.5rem'
          }}
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>

        {/* Details Panel */}
        {showDetails && (
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            background: '#0f0f0f',
            borderRadius: '8px',
            border: '1px solid #333'
          }}>
            <div style={{ marginBottom: '0.8rem' }}>
              <strong style={{ color: '#4ecdc4' }}>Category:</strong>
              <span style={{ color: '#b8a89c', marginLeft: '0.5rem' }}>{product.category}</span>
            </div>
            <div style={{ marginBottom: '0.8rem' }}>
              <strong style={{ color: '#4ecdc4' }}>Perfect for:</strong>
              <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginTop: '0.3rem' }}>
                {product.occasion.map((occ, index) => (
                  <span key={index} style={{
                    background: '#ff6347',
                    color: 'white',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '10px',
                    fontSize: '0.7rem'
                  }}>
                    {occ}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <strong style={{ color: '#4ecdc4' }}>Great for:</strong>
              <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginTop: '0.3rem' }}>
                {product.recipient.map((rec, index) => (
                  <span key={index} style={{
                    background: '#ffd700',
                    color: '#000',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '10px',
                    fontSize: '0.7rem'
                  }}>
                    {rec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function GiftsShop() {
  const [products, setProducts] = useState(giftProducts);
  const [userLocation, setUserLocation] = useState(null);
  const [sortBy, setSortBy] = useState('distance');
  const [filterCategory, setFilterCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Beauty & Wellness', 'Food & Beverage', 'Jewelry & Accessories', 'Fashion & Accessories', 'Home & Living', 'Technology'];

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
  }, []);

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const handleAddToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleAddToWishlist = (productId) => {
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
    } else {
      newWishlist.add(productId);
    }
    setWishlist(newWishlist);
  };

  const filteredAndSortedProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === 'All' || product.category === filterCategory) &&
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .map(product => ({
      ...product,
      distance: userLocation && product.lat && product.lng
        ? calculateDistance(userLocation.lat, userLocation.lng, product.lat, product.lng)
        : null
    }))
    .sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          if (a.distance !== null && b.distance !== null) {
            return a.distance - b.distance;
          }
          return 0;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div style={{ background: '#181312', minHeight: '100vh', color: 'white' }}>
      {/* Navigation */}
      <nav style={{
        background: '#181111',
        padding: '1rem 2rem',
        borderBottom: '1px solid #333',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{ color: '#4ecdc4', textDecoration: 'none', fontWeight: 600 }}>
          ← Back to Home
        </Link>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <span style={{ color: '#b8a89c' }}>🛒 Cart ({cart.length})</span>
            {cart.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: '#ff6347',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem'
              }}>
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </div>
          <span style={{ color: '#b8a89c' }}>❤️ Wishlist ({wishlist.size})</span>
          <span style={{ color: '#4ecdc4', fontWeight: 600 }}>
            Total: ${cartTotal.toFixed(2)}
          </span>
        </div>
      </nav>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #4ecdc4, #ff6347)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Gifts Shop
          </h1>
          <p style={{ color: '#b8a89c', fontSize: '1.1rem' }}>
            Discover amazing gifts from trusted sellers. Find the perfect gift for any occasion.
          </p>
        </div>

        {/* Search and Filters */}
        <div style={{
          background: '#1a1a1a',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          border: '1px solid #333'
        }}>
          {/* Search Bar */}
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Search for gifts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem',
                background: '#0f0f0f',
                border: '1px solid #333',
                borderRadius: '8px',
                color: 'white',
                fontSize: '1rem'
              }}
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              background: '#4ecdc4',
              color: '#000',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              marginBottom: showFilters ? '1rem' : '0'
            }}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Filters */}
          {showFilters && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginTop: '1rem'
            }}>
              <div>
                <label style={{ color: '#b8a89c', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                  Category
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    background: '#0f0f0f',
                    border: '1px solid #333',
                    borderRadius: '6px',
                    color: 'white'
                  }}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ color: '#b8a89c', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    background: '#0f0f0f',
                    border: '1px solid #333',
                    borderRadius: '6px',
                    color: 'white'
                  }}
                >
                  <option value="distance">Distance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                  <option value="name">Name</option>
                </select>
              </div>

              <div>
                <label style={{ color: '#b8a89c', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div style={{ marginBottom: '2rem', color: '#b8a89c' }}>
          Showing {filteredAndSortedProducts.length} of {products.length} products
        </div>

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {filteredAndSortedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              isInWishlist={wishlist.has(product.id)}
            />
          ))}
        </div>

        {filteredAndSortedProducts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            background: '#1a1a1a',
            borderRadius: '12px',
            border: '1px solid #333'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ color: '#4ecdc4', marginBottom: '0.5rem' }}>No products found</h3>
            <p style={{ color: '#b8a89c' }}>Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            background: '#1a1a1a',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #333',
            minWidth: '300px',
            zIndex: 1000
          }}>
            <h4 style={{ color: '#4ecdc4', marginBottom: '1rem' }}>Cart Summary</h4>
            {cart.slice(0, 3).map(item => (
              <div key={item.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
                fontSize: '0.9rem'
              }}>
                <span style={{ color: '#b8a89c' }}>{item.name} x{item.quantity}</span>
                <span style={{ color: '#4ecdc4' }}>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            {cart.length > 3 && (
              <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                +{cart.length - 3} more items
              </div>
            )}
            <hr style={{ border: '1px solid #333', margin: '1rem 0' }} />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 600,
              fontSize: '1.1rem'
            }}>
              <span style={{ color: '#fff' }}>Total:</span>
              <span style={{ color: '#4ecdc4' }}>${cartTotal.toFixed(2)}</span>
            </div>
            <Link
              to="/payment-success"
              style={{
                display: 'block',
                background: '#4ecdc4',
                color: '#000',
                padding: '0.8rem',
                borderRadius: '6px',
                textAlign: 'center',
                textDecoration: 'none',
                fontWeight: 600,
                marginTop: '1rem'
              }}
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}