import { useState } from "react";
import type { Product } from "../data/products";

type CartItem = { product: Product; qty: number };

type CheckoutPageProps = {
  items: CartItem[];
  onNavigate: (page: string) => void;
  onOrderComplete: () => void;
};

const WHATSAPP_NUMBER = "2349030194735";

function buildWhatsAppMessage(
  items: CartItem[],
  form: { name: string; phone: string; address: string; city: string; state: string; notes: string },
  subtotal: number,
  delivery: number
): string {
  const lines: string[] = [
    "🛒 *New Order — Abdul's Enterprise Supermarket*",
    "",
    "*ORDER ITEMS:*",
  ];
  items.forEach(({ product, qty }) => {
    lines.push(`• ${product.name} ×${qty} — ₦${(product.price * qty).toLocaleString()}`);
  });
  lines.push("");
  lines.push(`*Subtotal:* ₦${subtotal.toLocaleString()}`);
  lines.push(`*Delivery:* ${delivery === 0 ? "FREE" : "₦" + delivery.toLocaleString()}`);
  lines.push(`*TOTAL: ₦${(subtotal + delivery).toLocaleString()}*`);
  lines.push("");
  lines.push("*CUSTOMER DETAILS:*");
  lines.push(`Name: ${form.name}`);
  lines.push(`Phone: ${form.phone}`);
  lines.push("");
  lines.push("*DELIVERY ADDRESS:*");
  lines.push(`${form.address}`);
  lines.push(`${form.city}, ${form.state}`);
  if (form.notes) lines.push(`Notes: ${form.notes}`);
  return encodeURIComponent(lines.join("\n"));
}

export default function CheckoutPage({ items, onNavigate, onOrderComplete }: CheckoutPageProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", state: "", notes: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const delivery = subtotal >= 50000 ? 0 : 2000;
  const total = subtotal + delivery;

  function update(key: keyof typeof form, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  }

  function validateStep0() {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.address.trim()) e.address = "Delivery address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.state.trim()) e.state = "State is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleContinue() {
    if (step === 0 && !validateStep0()) return;
    setStep(1);
  }

  function handleWhatsApp() {
    const msg = buildWhatsAppMessage(items, form, subtotal, delivery);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    onOrderComplete();
    onNavigate("whatsapp-confirm");
  }

  const steps = ["Delivery Details", "Review & Order"];

  return (
    <div style={{ background: "#F9F9F9", minHeight: "100vh" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h1 className="font-bold mb-6 sm:mb-8" style={{ fontFamily: "Montserrat, sans-serif", color: "#005691", fontSize: "clamp(22px, 5vw, 28px)" }}>
          Checkout
        </h1>

        {/* Step indicator */}
        <div className="flex items-center mb-8 sm:mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    background: i <= step ? "#005691" : "#e5e7eb",
                    color: i <= step ? "white" : "#aaa",
                  }}
                >
                  {i < step ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                  ) : i + 1}
                </div>
                <span className="text-sm font-semibold hidden sm:block" style={{ fontFamily: "Montserrat, sans-serif", color: i <= step ? "#005691" : "#aaa" }}>
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="h-px mx-3 sm:mx-4" style={{ width: 40, background: i < step ? "#005691" : "#e5e7eb" }}/>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}>

              {/* Step 0: Delivery & Customer Details */}
              {step === 0 && (
                <div>
                  <h2 className="font-bold text-lg mb-5" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>
                    Your Details & Delivery
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { key: "name", label: "Full Name", placeholder: "Emeka Okafor", type: "text", required: true },
                      { key: "phone", label: "Phone Number", placeholder: "+234 800 123 4567", type: "tel", required: true },
                    ].map(({ key, label, placeholder, type, required }) => (
                      <div key={key}>
                        <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>
                          {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
                        </label>
                        <input
                          type={type}
                          placeholder={placeholder}
                          value={form[key as keyof typeof form]}
                          onChange={(e) => update(key as keyof typeof form, e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                          style={{
                            border: `1.5px solid ${errors[key as keyof typeof form] ? "#ef4444" : "#e5e7eb"}`,
                            fontFamily: "Open Sans, sans-serif",
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "#005691")}
                          onBlur={(e) => (e.target.style.borderColor = errors[key as keyof typeof form] ? "#ef4444" : "#e5e7eb")}
                        />
                        {errors[key as keyof typeof form] && (
                          <p className="text-xs mt-1" style={{ color: "#ef4444", fontFamily: "Open Sans, sans-serif" }}>
                            {errors[key as keyof typeof form]}
                          </p>
                        )}
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>
                        Delivery Address <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="15 Allen Avenue, Ikeja"
                        value={form.address}
                        onChange={(e) => update("address", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                        style={{
                          border: `1.5px solid ${errors.address ? "#ef4444" : "#e5e7eb"}`,
                          fontFamily: "Open Sans, sans-serif",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "#005691")}
                        onBlur={(e) => (e.target.style.borderColor = errors.address ? "#ef4444" : "#e5e7eb")}
                      />
                      {errors.address && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.address}</p>}
                    </div>
                    {[
                      { key: "city", label: "City", placeholder: "Lagos", required: true },
                      { key: "state", label: "State", placeholder: "Lagos State", required: true },
                    ].map(({ key, label, placeholder, required }) => (
                      <div key={key}>
                        <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>
                          {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
                        </label>
                        <input
                          type="text"
                          placeholder={placeholder}
                          value={form[key as keyof typeof form]}
                          onChange={(e) => update(key as keyof typeof form, e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                          style={{
                            border: `1.5px solid ${errors[key as keyof typeof form] ? "#ef4444" : "#e5e7eb"}`,
                            fontFamily: "Open Sans, sans-serif",
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "#005691")}
                          onBlur={(e) => (e.target.style.borderColor = errors[key as keyof typeof form] ? "#ef4444" : "#e5e7eb")}
                        />
                        {errors[key as keyof typeof form] && (
                          <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors[key as keyof typeof form]}</p>
                        )}
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>
                        Delivery Instructions <span style={{ color: "#aaa", fontWeight: 400 }}>(optional)</span>
                      </label>
                      <textarea
                        placeholder="e.g. Call before delivery, leave at gate..."
                        value={form.notes}
                        onChange={(e) => update("notes", e.target.value)}
                        rows={2}
                        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                        style={{ border: "1.5px solid #e5e7eb", fontFamily: "Open Sans, sans-serif" }}
                        onFocus={(e) => (e.target.style.borderColor = "#005691")}
                        onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col xs:flex-row gap-3 mt-6">
                    <button
                      onClick={() => onNavigate("cart")}
                      className="px-5 py-3 rounded-xl font-semibold text-sm"
                      style={{ border: "1.5px solid #e5e7eb", color: "#333", fontFamily: "Montserrat, sans-serif" }}
                    >
                      ← Back to Cart
                    </button>
                    <button
                      onClick={handleContinue}
                      className="flex-1 py-3 rounded-xl font-bold text-sm text-white"
                      style={{ background: "#005691", fontFamily: "Montserrat, sans-serif" }}
                    >
                      Review Order →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 1: Review & WhatsApp CTA */}
              {step === 1 && (
                <div>
                  <h2 className="font-bold text-lg mb-5" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>
                    Review Your Order
                  </h2>

                  {/* Items */}
                  <div className="space-y-3 mb-5">
                    {items.map(({ product, qty }) => (
                      <div key={product.id} className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>{product.name}</p>
                          <p className="text-xs" style={{ color: "#888" }}>×{qty} · {product.unit}</p>
                        </div>
                        <p className="font-bold text-sm flex-shrink-0" style={{ color: "#005691", fontFamily: "Montserrat, sans-serif" }}>
                          ₦{(product.price * qty).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Delivery info */}
                  <div className="p-4 rounded-xl mb-5" style={{ background: "#f0f7ff", border: "1px solid #dbeafe" }}>
                    <p className="text-xs font-bold mb-2" style={{ fontFamily: "Montserrat, sans-serif", color: "#005691" }}>DELIVERY TO</p>
                    <p className="text-sm" style={{ fontFamily: "Open Sans, sans-serif", color: "#333" }}>
                      {form.name} · {form.phone}
                    </p>
                    <p className="text-sm" style={{ fontFamily: "Open Sans, sans-serif", color: "#4F4F4F" }}>
                      {form.address}, {form.city}, {form.state}
                    </p>
                    {form.notes && (
                      <p className="text-xs mt-1" style={{ color: "#888", fontFamily: "Open Sans, sans-serif" }}>Note: {form.notes}</p>
                    )}
                  </div>

                  {/* WhatsApp explanation */}
                  <div className="p-4 rounded-xl mb-6 flex items-start gap-3"
                    style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "#25D366" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-0.5" style={{ fontFamily: "Montserrat, sans-serif", color: "#166534" }}>
                        How does this work?
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>
                        Clicking the button below will open WhatsApp with your order details pre-filled. Simply send the message to our team — we&apos;ll confirm availability, arrange delivery, and share payment details with you directly.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col xs:flex-row gap-3">
                    <button
                      onClick={() => setStep(0)}
                      className="px-5 py-3 rounded-xl font-semibold text-sm"
                      style={{ border: "1.5px solid #e5e7eb", color: "#333", fontFamily: "Montserrat, sans-serif" }}
                    >
                      ← Back
                    </button>
                    <button
                      onClick={handleWhatsApp}
                      className="flex-1 py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2"
                      style={{ background: "#25D366", fontFamily: "Montserrat, sans-serif", boxShadow: "0 4px 16px rgba(37,211,102,0.35)", transition: "background 0.2s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#1da851")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#25D366")}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Complete Order via WhatsApp
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary sidebar */}
          <div>
            <div className="bg-white rounded-2xl p-5 sticky top-24" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
              <h3 className="font-bold mb-4 text-sm" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>
                Order Summary
              </h3>
              <div className="space-y-2 text-sm mb-4">
                {items.map(({ product, qty }) => (
                  <div key={product.id} className="flex justify-between gap-2">
                    <span className="truncate" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>
                      {product.name} ×{qty}
                    </span>
                    <span className="flex-shrink-0 font-semibold" style={{ color: "#333", fontFamily: "Montserrat, sans-serif" }}>
                      ₦{(product.price * qty).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 pt-3 mb-4 text-sm" style={{ borderTop: "1px solid #eee" }}>
                <div className="flex justify-between" style={{ fontFamily: "Open Sans, sans-serif" }}>
                  <span style={{ color: "#888" }}>Subtotal</span>
                  <span style={{ color: "#333", fontWeight: 600 }}>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between" style={{ fontFamily: "Open Sans, sans-serif" }}>
                  <span style={{ color: "#888" }}>Delivery</span>
                  <span style={{ color: delivery === 0 ? "#6AB04C" : "#333", fontWeight: 600 }}>
                    {delivery === 0 ? "FREE" : `₦${delivery.toLocaleString()}`}
                  </span>
                </div>
              </div>
              <div className="flex justify-between pt-3" style={{ borderTop: "1px solid #eee" }}>
                <span className="font-bold text-sm" style={{ fontFamily: "Montserrat, sans-serif" }}>Total</span>
                <span className="font-bold" style={{ color: "#005691", fontFamily: "Montserrat, sans-serif" }}>₦{total.toLocaleString()}</span>
              </div>
              <p className="text-xs mt-3 text-center" style={{ color: "#888", fontFamily: "Open Sans, sans-serif" }}>
                Payment details will be confirmed via WhatsApp
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
