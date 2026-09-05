import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import type { Product } from "../data/products";

type ProductDetailPageProps = {
  product: Product;
  onNavigate: (page: string, data?: unknown) => void;
  onAddToCart: (product: Product, qty?: number) => void;
};

export default function ProductDetailPage({ product, onNavigate, onAddToCart }: ProductDetailPageProps) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const images = [product.image, ...related.slice(0, 2).map((p) => p.image)];

  function handleAdd() {
    setAdded(true);
    onAddToCart(product, qty);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div style={{ background: "#F9F9F9", minHeight: "100vh" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="text-xs mb-5 flex flex-wrap gap-1 items-center" style={{ color: "#888", fontFamily: "Open Sans, sans-serif" }}>
          <button onClick={() => onNavigate("home")} className="hover:underline">Home</button>
          <span>/</span>
          <button onClick={() => onNavigate("products")} className="hover:underline">{product.category}</button>
          <span>/</span>
          <span className="truncate max-w-[160px]" style={{ color: "#333" }}>{product.name}</span>
        </nav>

        <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden" style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.08)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Images */}
            <div className="p-4 sm:p-6">
              <div className="rounded-xl sm:rounded-2xl overflow-hidden bg-gray-50 mb-3" style={{ height: "clamp(220px, 55vw, 360px)" }}>
                <img src={images[activeImg]} alt={product.name} className="w-full h-full object-cover"/>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0"
                    style={{ border: activeImg === i ? "2px solid #005691" : "2px solid transparent" }}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover"/>
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="p-4 sm:p-8 border-t lg:border-t-0 lg:border-l" style={{ borderColor: "#f3f4f6" }}>
              {product.badge && (
                <span className="inline-block text-xs font-bold px-3 py-1 rounded-full text-white mb-3" style={{ background: "#6AB04C", fontFamily: "Montserrat, sans-serif" }}>
                  {product.badge}
                </span>
              )}
              <h1 className="font-bold mb-1 leading-tight" style={{ fontFamily: "Montserrat, sans-serif", color: "#333", fontSize: "clamp(18px, 4vw, 30px)" }}>
                {product.name}
              </h1>
              <p className="text-sm mb-3" style={{ color: "#6AB04C", fontFamily: "Montserrat, sans-serif", fontWeight: 600 }}>{product.category}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill={s <= Math.floor(product.rating) ? "#f59e0b" : "#e5e7eb"}>
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-semibold" style={{ color: "#333" }}>{product.rating}</span>
                <span className="text-sm" style={{ color: "#888" }}>({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-1">
                <span className="font-bold" style={{ color: "#005691", fontFamily: "Montserrat, sans-serif", fontSize: "clamp(22px, 5vw, 32px)" }}>
                  ₦{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-base sm:text-lg line-through" style={{ color: "#ccc" }}>₦{product.originalPrice.toLocaleString()}</span>
                )}
                {product.discount && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "#edf7e8", color: "#4e8a35", fontFamily: "Montserrat, sans-serif" }}>
                    {product.discount}% OFF
                  </span>
                )}
              </div>
              <p className="text-xs mb-4" style={{ color: "#888" }}>{product.unit}</p>

              <p className="text-sm leading-relaxed mb-5" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>{product.description}</p>

              {/* Delivery info chips */}
              <div className="flex flex-wrap gap-2 mb-5">
                {["🚚 Free delivery over ₦50,000", "🕐 Delivered within 24h", "↩️ Easy returns"].map((t) => (
                  <span key={t} className="text-xs px-3 py-1.5 rounded-full" style={{ background: "#F9F9F9", color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>{t}</span>
                ))}
              </div>

              {/* Qty + Cart */}
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <div className="flex items-center rounded-xl overflow-hidden" style={{ border: "1.5px solid #e5e7eb" }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center font-bold text-lg" style={{ color: "#005691" }}>−</button>
                  <span className="w-10 text-center font-semibold" style={{ fontFamily: "Montserrat, sans-serif" }}>{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center font-bold text-lg" style={{ color: "#005691" }}>+</button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 rounded-xl font-bold text-sm text-white min-w-[120px]"
                  style={{ background: added ? "#6AB04C" : "#005691", fontFamily: "Montserrat, sans-serif", transition: "background 0.25s" }}
                >
                  {added ? "✓ Added to Cart" : "Add to Cart"}
                </button>

                <button
                  onClick={() => { onAddToCart(product, qty); onNavigate("checkout"); }}
                  className="flex-1 py-3 rounded-xl font-bold text-sm min-w-[100px]"
                  style={{ border: "2px solid #005691", color: "#005691", fontFamily: "Montserrat, sans-serif" }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="font-bold mb-5" style={{ fontFamily: "Montserrat, sans-serif", color: "#005691", fontSize: "clamp(18px, 3vw, 24px)" }}>
              Related Products
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onClick={() => onNavigate("product-detail", p)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
