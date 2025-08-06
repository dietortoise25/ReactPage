import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { cn } from '../lib/utils'

const ProductCard = ({ product }) => {
  const getImagePath = (imagePath) => {
    if (!imagePath) return null
    const filename = imagePath.split('\\').pop()
    return `/${filename}`
  }

  const renderAllSpecifications = () => {
    const allSpecs = []
    
    // 硬件规格
    const hardwareMapping = {
      chipset: 'Chipset',
      heart_rate_sensor: 'Heart Rate',
      screen: 'Display',
      screen_resolution: 'Resolution',
      battery_capacity: 'Battery',
      waterproof_level: 'Water Resistance'
    }
    
    if (product.hardware_specifications) {
      Object.entries(product.hardware_specifications).forEach(([key, value]) => {
        if (value && value !== 'Not available' && value !== 'N/A' && value !== '' && hardwareMapping[key]) {
          allSpecs.push({ label: hardwareMapping[key], value })
        }
      })
    }
    
    // 连接功能
    const connectivityMapping = {
      bluetooth_call: 'BT Calling',
      bluetooth_version: 'BT Version'
    }
    
    if (product.connectivity_features) {
      Object.entries(product.connectivity_features).forEach(([key, value]) => {
        if (value && value !== 'Not available' && value !== 'N/A' && value !== '' && connectivityMapping[key]) {
          allSpecs.push({ label: connectivityMapping[key], value })
        }
      })
    }
    
    // 使用时间
    const usageMapping = {
      charging_time: 'Charging',
      normal_using_time: 'Battery Life'
    }
    
    if (product.usage_time) {
      Object.entries(product.usage_time).forEach(([key, value]) => {
        if (value && value !== 'Not available' && value !== 'N/A' && value !== '' && usageMapping[key]) {
          allSpecs.push({ label: usageMapping[key], value })
        }
      })
    }
    
    // 软件
    if (product.software?.app && product.software.app !== 'Not available') {
      allSpecs.push({ label: 'App', value: product.software.app })
    }
    
    return allSpecs.map((spec, index) => (
      <div key={index} className={`group/spec relative ${
        index % 2 === 0 
          ? 'bg-white/40 border-white/30' 
          : 'bg-red-50/40 border-red-100/30'
      } backdrop-blur-sm rounded-md border transition-all duration-300 hover:scale-[1.01]`}>
        <div className="relative p-2 flex justify-between items-center">
          <span className="text-xs font-medium text-red-600">{spec.label}</span>
          <span className="text-xs text-red-800 font-light">
            {spec.value}
          </span>
        </div>
      </div>
    ))
  }

  const colors = product.appearance?.colour ? 
    product.appearance.colour.split(',').map(color => color.trim()).filter(Boolean) : []

  return (
    <div className="group relative">
      {/* Glassmorphism card background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/50 to-red-50/30 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl transition-all duration-500 group-hover:shadow-3xl group-hover:scale-[1.02]"></div>
      
      {/* Glow effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-400/5 via-red-300/5 to-red-200/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative overflow-hidden rounded-3xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* Product Image - 增大占比 */}
          <div className="lg:col-span-2 relative bg-gradient-to-br from-white/80 to-red-50/60 p-8 lg:p-12 flex items-center justify-center min-h-[600px]">
            {/* Floating orbs in image area */}
            <div className="absolute top-8 right-8 w-24 h-24 bg-gradient-to-br from-red-300/20 to-red-400/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-12 left-12 w-20 h-20 bg-gradient-to-br from-red-200/15 to-red-300/15 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-red-100/10 to-red-200/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            
            {product.white_background_image && (
              <img
                src={getImagePath(product.white_background_image)}
                alt={`${product.model} Smart Watch`}
                className="relative z-10 max-w-full max-h-[500px] object-contain drop-shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-3xl"
              />
            )}
          </div>

          {/* Product Details - 紧凑布局 */}
          <div className="relative p-8 lg:p-10 space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex flex-col space-y-3">
                <h3 className="text-2xl font-thin text-red-900 tracking-wide leading-tight">
                  {product.model}
                </h3>
                {colors.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {colors.map((color, index) => (
                      <div key={index} className="relative group/badge">
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-full border border-white/50 shadow-md"></div>
                        <div className="relative px-3 py-1 text-xs font-medium text-red-700">
                          {color}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Specifications - 平铺布局 */}
            <div className="space-y-1">
              {renderAllSpecifications()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard