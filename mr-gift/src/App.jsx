import './App.css'
import { Routes, Route } from 'react-router-dom'

// Import pages
import About from './About'
import Brands from './Brands'
import GiftsShop from './GiftsShop'
import PaymentSuccess from './PaymentSuccess'
import SellerDashboard from './SellerDashboard'
import SellerProfile from './SellerProfile'

// Import the enhanced HomePage
import HomePage from './HomePage'

// Import the floating chatbot
import SimpleChatbot from './components/ui/simple-chatbot'
import ChatbotDemo from './components/ui/chatbot-demo'

// Main App component with routing
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/gifts" element={<GiftsShop />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/seller-profile" element={<SellerProfile />} />
        <Route path="/chatbot-demo" element={<ChatbotDemo />} />
      </Routes>

      {/* Global Floating Chatbot - Available on all pages */}
      <SimpleChatbot />
    </>
  )
}

export default App