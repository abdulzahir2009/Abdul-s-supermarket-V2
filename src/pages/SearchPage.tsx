import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import type { Product } from "../data/products";

type SearchPageProps = {
  query: string;
  onNavigate: (page: string, data?: unknown) => void;
  onAddToCart: (product: Product) => void;
};

export default function SearchPage({ query, onNavigate, onAddToCart }: SearchPageProps) {
  const [localQuery, setLocalQuery] = useState(query);
  const [activeQuery, setActiveQuery] = useState(query);

  const results = products.filter(
    (p) =>
      p.name.toLowerCase().includes(activeQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(activeQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(activeQuery.toLowerCase())
  );

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setActiveQuery(localQuery);
  }

  return (
    <div style={{ background: "#F9F9F9", minHeight: "100vh" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Search input */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative max-w-xl">
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-5 pr-14 py-3.5 rounded-2xl text-sm outline-none bg-white"
              style={{ border: "1.5px solid #e5e7eb", fontFamily: "Open Sans, sans-serif", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
              onFocus={(e) => (e.target.style.borderColor = "#005691")}
              onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              autoFocus
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#005691" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
          </div>
        </form>

        {activeQuery && (
          <div className="mb-5">
            <h2 className="font-bold" style={{ fontFamily: "Montserrat, sans-serif", color: "#333", fontSize: "clamp(16px, 3vw, 20px)" }}>
              {results.length > 0 ? `Results for "${activeQuery}"` : `No results for "${activeQuery}"`}
            </h2>
            {results.length > 0 && <p className="text-sm mt-1" style={{ color: "#888", fontFamily: "Open Sans, sans-serif" }}>{results.length} products found</p>}
          </div>
        )}

        {results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onClick={() => onNavigate("product-detail", p)} />
            ))}
          </div>
        ) : activeQuery ? (
          <div className="text-center py-14 bg-white rounded-2xl px-4">
            <div className="text-5xl mb-4">🔍</div>
            <p className="font-semibold text-sm mb-2" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>No products found</p>
            <p className="text-sm mb-6" style={{ color: "#888", fontFamily: "Open Sans, sans-serif" }}>
              Try searching for another product or explore our categories.
            </p>
            <button onClick={() => onNavigate("products")} className="px-7 py-3 rounded-full font-bold text-sm text-white" style={{ background: "#005691", fontFamily: "Montserrat, sans-serif" }}>
              Browse Categories
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
