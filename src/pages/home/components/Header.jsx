import { cn } from '../../../lib/utils'
import { Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();

  const handleMailClick = () => {
    navigate('/business-card');
  };
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-red-50 via-white to-red-25 overflow-hidden">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-red-50/60 to-red-100/40 backdrop-blur-3xl"></div>
      
      {/* Floating orbs with glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-red-400/20 to-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-red-300/15 to-red-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-red-200/10 to-red-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      {/* Mail icon in top right corner */}
      <div className="absolute top-6 right-6 z-20">
        <button 
          onClick={handleMailClick}
          className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl group"
        >
          <Mail className="w-6 h-6 text-red-700 group-hover:text-red-800 transition-colors" />
        </button>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 py-20 lg:py-32">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src="/logo.svg" 
              alt="Smart Watch Logo" 
              className="h-16 w-auto"
            />
          </div>
          
          {/* Apple-style badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-red-700 text-sm font-medium shadow-lg">
            Professional Smart Wearable Solutions
          </div>
          
          {/* Main Heading - Apple style */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-thin tracking-tight text-red-900 leading-none">
              Smart Watch
            </h1>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-thin tracking-tight text-red-600 leading-none">
              Product Catalog
            </h2>
          </div>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-red-700 max-w-3xl mx-auto leading-relaxed font-light">
            Experience the perfect fusion of cutting-edge technology and elegant design
          </p>
          
          {/* Description */}
          <p className="text-lg text-red-600 max-w-4xl mx-auto leading-relaxed font-light">
            From health monitoring to smart calling, from fitness tracking to fashion accessories,<br className="hidden md:block" />
            we provide comprehensive smart wearable experiences
          </p>
          
          {/* Features - Apple style cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-4xl mx-auto">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-md rounded-3xl border border-white/30 shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105"></div>
              <div className="relative p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-400/20 to-pink-400/20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm">
                  <span className="text-3xl">❤️</span>
                </div>
                <h3 className="text-xl font-medium text-red-800">Health Monitoring</h3>
                <p className="text-sm text-red-600 leading-relaxed">24/7 heart rate tracking<br />Blood oxygen detection</p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-md rounded-3xl border border-white/30 shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105"></div>
              <div className="relative p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm">
                  <span className="text-3xl">📱</span>
                </div>
                <h3 className="text-xl font-medium text-red-800">Smart Calling</h3>
                <p className="text-sm text-red-600 leading-relaxed">Bluetooth connectivity<br />Voice assistant support</p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-md rounded-3xl border border-white/30 shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105"></div>
              <div className="relative p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm">
                  <span className="text-3xl">🏃</span>
                </div>
                <h3 className="text-xl font-medium text-red-800">Fitness Tracking</h3>
                <p className="text-sm text-red-600 leading-relaxed">Multiple sport modes<br />Precise activity recording</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Header