import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { cn } from "../../lib/utils";
import BusinessCardComponent from "./components/BusinessCard";

function BusinessCardPage() {
  const [businessCards, setBusinessCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusinessCards = async () => {
      try {
        const response = await fetch("/business_cards.json");
        const data = await response.json();
        setBusinessCards(data.cards || []);
      } catch (error) {
        setBusinessCards([]);
        console.error("Error fetching business cards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessCards();
  }, []);

  const handleBackClick = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center relative overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-red-200/30 to-red-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-red-200/20 to-red-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative z-10 text-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-full border border-white/50 shadow-2xl"></div>
            <div className="relative w-16 h-16 mx-auto">
              <div className="animate-spin rounded-full h-16 w-16 border-2 border-slate-300 border-t-slate-600"></div>
            </div>
          </div>
          <p className="text-slate-700 font-light text-lg tracking-wide">
            Loading business cards...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-red-200/10 to-red-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-red-200/8 to-red-400/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-br from-red-100/12 to-red-200/12 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-red-50 via-white to-red-25 overflow-hidden">
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-red-50/60 to-red-100/40 backdrop-blur-3xl"></div>
        
        {/* Floating orbs with glow effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-red-400/20 to-red-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-red-300/15 to-red-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-red-200/10 to-red-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        {/* Back button in top left corner */}
        <div className="absolute top-6 left-6 z-20">
          <button 
            onClick={handleBackClick}
            className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <ArrowLeft className="w-6 h-6 text-red-700 group-hover:text-red-800 transition-colors" />
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
              Professional Business Cards
            </div>
            
            {/* Main Heading - Apple style */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-thin tracking-tight text-red-900 leading-none">
                Business
              </h1>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-thin tracking-tight text-red-600 leading-none">
                Cards
              </h2>
            </div>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-red-700 max-w-3xl mx-auto leading-relaxed font-light">
              Connect with our professional team members
            </p>
            
            {/* Description */}
            <p className="text-lg text-red-600 max-w-4xl mx-auto leading-relaxed font-light">
              Discover our team of experts and their professional profiles,<br className="hidden md:block" />
              ready to assist you with your smart wearable needs
            </p>
          </div>
        </div>
      </section>

      {/* Business Cards Section */}
      <main className="relative z-10 container mx-auto px-6 py-16">
        {businessCards.length > 0 ? (
          <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", "animate-in fade-in-50 duration-1000")}>
            {businessCards.map((card, index) => (
              <div
                key={card.id || index}
                className={cn(
                  "animate-in slide-in-from-bottom-8 fade-in-0",
                  "duration-1000"
                )}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <BusinessCardComponent card={card} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <div className="relative">
              <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-3xl border border-white/40 shadow-xl"></div>
              <div className="relative p-12">
                <p className="text-slate-600 text-xl font-light tracking-wide">
                  No business cards found
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Minimalist footer */}
      <footer className="relative z-10 mt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-50/60 via-red-50/40 to-red-50/60 backdrop-blur-xl rounded-2xl border border-red-100/50 shadow-lg"></div>
            <div className="relative p-8 text-center">
              <p className="text-red-600 font-light tracking-wide">
                © 2024 Smart Watch Solutions. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default BusinessCardPage;