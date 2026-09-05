import { useState } from "react";
import type { Product } from "../data/products";

type ProductCardProps = {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onClick?: (product: Product) => void;
};

export default function ProductCard({ product, onAddToCart, onClick }: ProductCardProps) {
  const [added, setAdded] = useState(false);

  function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation();
    if (added) return;
    setAdded(true);
    onAddToCart?.(product);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden cursor-pointer flex flex-col"
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)", transition: "transform 0.25s ease, box-shadow 0.25s ease" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(0,86,145,0.15)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.07)"; }}
      onClick={() => onClick?.(product)}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 flex-shrink-0" style={{ height: "clamp(130px, 28vw, 200px)" }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          style={{ transition: "transform 0.4s ease" }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
        {product.badge && (
          <span
            className="absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full text-white"
            style={{ background: product.discount ? "#6AB04C" : "#005691", fontFamily: "Montserrat, sans-serif", fontSize: "clamp(9px, 2vw, 12px)" }}
          >
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="font-semibold text-gray-500 text-sm" style={{ fontFamily: "Montserrat, sans-serif" }}>Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <div className="text-xs mb-0.5 font-semibold truncate" style={{ color: "#6AB04C", fontFamily: "Montserrat, sans-serif", fontSize: "clamp(9px, 2vw, 12px)" }}>
          {product.category}
        </div>
        <h3 className="font-semibold mb-0.5 line-clamp-2" style={{ color: "#333", fontFamily: "Montserrat, sans-serif", fontSize: "clamp(11px, 2.5vw, 14px)", lineHeight: 1.3 }}>
          {product.name}
        </h3>
        <div className="mb-2" style={{ color: "#888", fontSize: "clamp(9px, 2vw, 12px)" }}>{product.unit}</div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg key={s} width="10" height="10" viewBox="0 0 24 24" fill={s <= Math.floor(product.rating) ? "#f59e0b" : "#e5e7eb"}>
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
              </svg>
            ))}
          </div>
          <span style={{ color: "#888", fontSize: 10 }}>({product.reviews})</span>
        </div>

        {/* Price + Cart — pushed to bottom */}
        <div className="flex items-center justify-between gap-1 mt-auto">
          <div className="min-w-0">
            <span className="font-bold" style={{ color: "#005691", fontFamily: "Montserrat, sans-serif", fontSize: "clamp(12px, 2.8vw, 16px)" }}>
              ₦{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="line-through ml-1" style={{ color: "#bbb", fontSize: "clamp(9px, 2vw, 12px)" }}>
                ₦{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex items-center gap-1 font-semibold rounded-full flex-shrink-0"
            style={{
              background: added ? "#6AB04C" : "#005691",
              color: "white",
              fontFamily: "Montserrat, sans-serif",
              transition: "background 0.25s ease",
              cursor: product.inStock ? "pointer" : "not-allowed",
              opacity: product.inStock ? 1 : 0.5,
              fontSize: "clamp(10px, 2vw, 12px)",
              padding: "6px 10px",
            }}
          >
            {added ? (
              <>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20,6 9,17 4,12"/></svg>
                Added
              </>
            ) : (
              <>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
