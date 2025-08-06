import { useState, useEffect } from "react";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import { cn } from "../../lib/utils";
// Styles moved inline to avoid import issues

function V0Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/product_specifications_simplified.json");
        console.log("response", response);

        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    console.log("useEffect");
  }, []);
  console.log("products", products);
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
            Loading products...
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

      <Header />

      <main className="relative z-10 container mx-auto px-6 py-16">
        {products.length > 0 ? (
          <div
            className={cn("space-y-16", "animate-in fade-in-50 duration-1000")}
          >
            {products.map((product, index) => (
              <div
                key={product.model || index}
                className={cn(
                  "animate-in slide-in-from-bottom-8 fade-in-0",
                  "duration-1000"
                )}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <div className="relative">
              <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-3xl border border-white/40 shadow-xl"></div>
              <div className="relative p-12">
                <p className="text-slate-600 text-xl font-light tracking-wide">
                  No products found
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
                Smart Watch Collection — Professional Wearable Technology
                Solutions
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default V0Page;
