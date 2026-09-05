import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { products, categories } from "../data/products";
import type { Product } from "../data/products";

type ProductListPageProps = {
  onNavigate: (page: string, data?: unknown) => void;
  onAddToCart: (product: Product) => void;
};

const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Rating"];

export default function ProductListPage({ onNavigate, onAddToCart }: ProductListPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");
  const [maxPrice, setMaxPrice] = useState(20000);
  const [showFilters, setShowFilters] = useState(false);

  let filtered = selectedCategory === "All" ? products : products.filter((p) => p.category === selectedCategory);
  filtered = filtered.filter((p) => p.price <= maxPrice);
  if (sortBy === "Price: Low to High") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortBy === "Price: High to Low") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sortBy === "Rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <div style={{ background: "#F9F9F9", minHeight: "100vh" }}>
      {/* Page header */}
      <div style={{ background: "white", borderBottom: "1px solid #eee" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <nav className="text-xs mb-1.5 flex gap-1 items-center flex-wrap" style={{ color: "#888", fontFamily: "Open Sans, sans-serif" }}>
            <button onClick={() => onNavigate("home")} className="hover:underline">Home</button>
            <span>/</span>
            <span style={{ color: "#333" }}>{selectedCategory === "All" ? "All Products" : selectedCategory}</span>
          </nav>
          <h1 className="font-bold" style={{ fontFamily: "Montserrat, sans-serif", color: "#005691", fontSize: "clamp(18px, 4vw, 30px)" }}>
            {selectedCategory === "All" ? "All Products" : selectedCategory}
          </h1>
          <p className="text-xs mt-1" style={{ color: "#888", fontFamily: "Open Sans, sans-serif" }}>{filtered.length} products found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm"
            style={{ background: showFilters ? "#005691" : "white", border: "1.5px solid #e5e7eb", color: showFilters ? "white" : "#333", fontFamily: "Montserrat, sans-serif", transition: "all 0.2s" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/>
            </svg>
            Filters
          </button>

          <div className="flex items-center gap-2 flex-1 justify-end">
            <span className="text-sm hidden sm:block" style={{ color: "#888", fontFamily: "Open Sans, sans-serif" }}>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl text-sm outline-none border flex-1 sm:flex-none"
              style={{ border: "1.5px solid #e5e7eb", fontFamily: "Open Sans, sans-serif", color: "#333", maxWidth: 200 }}
            >
              {sortOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>

        <div className="flex gap-5">
          {/* Sidebar filters */}
          {showFilters && (
            <aside className="w-56 flex-shrink-0 hidden sm:block">
              <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
                <h3 className="font-bold mb-3 text-sm" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>Categories</h3>
                <div className="space-y-0.5 mb-5">
                  {["All", ...categories.map((c) => c.name)].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors"
                      style={{ fontFamily: "Open Sans, sans-serif", background: selectedCategory === cat ? "#e8f2fa" : "transparent", color: selectedCategory === cat ? "#005691" : "#333", fontWeight: selectedCategory === cat ? 600 : 400 }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <h3 className="font-bold mb-2 text-sm" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>Max Price</h3>
                <input
                  type="range" min={1000} max={20000} step={500} value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: "#888", fontFamily: "Open Sans, sans-serif" }}>
                  <span>₦1,000</span>
                  <span style={{ color: "#005691", fontWeight: 600 }}>₦{maxPrice.toLocaleString()}</span>
                </div>
              </div>
            </aside>
          )}

          {/* Mobile filter drawer */}
          {showFilters && (
            <div className="sm:hidden fixed inset-0 z-50 flex" onClick={() => setShowFilters(false)}>
              <div className="absolute inset-0 bg-black/40"/>
              <div className="relative ml-auto w-72 max-w-full h-full bg-white overflow-y-auto p-5" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-base" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>Filters</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
                <h4 className="font-semibold text-sm mb-2" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>Categories</h4>
                <div className="space-y-0.5 mb-5">
                  {["All", ...categories.map((c) => c.name)].map((cat) => (
                    <button key={cat} onClick={() => { setSelectedCategory(cat); setShowFilters(false); }}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-sm"
                      style={{ background: selectedCategory === cat ? "#e8f2fa" : "transparent", color: selectedCategory === cat ? "#005691" : "#333", fontWeight: selectedCategory === cat ? 600 : 400, fontFamily: "Open Sans, sans-serif" }}>
                      {cat}
                    </button>
                  ))}
                </div>
                <h4 className="font-semibold text-sm mb-2" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>Max Price</h4>
                <input type="range" min={1000} max={20000} step={500} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-blue-600"/>
                <div className="flex justify-between text-xs mt-1" style={{ color: "#888", fontFamily: "Open Sans, sans-serif" }}>
                  <span>₦1,000</span>
                  <span style={{ color: "#005691", fontWeight: 600 }}>₦{maxPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl">
                <div className="text-4xl mb-3">🛒</div>
                <p className="font-semibold text-sm" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>No products found</p>
                <p className="text-sm mt-1" style={{ color: "#888" }}>Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onClick={() => onNavigate("product-detail", p)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
