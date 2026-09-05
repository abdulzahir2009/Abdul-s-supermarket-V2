import Logo from "./Logo";

type FooterProps = {
  onNavigate: (page: string) => void;
};

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer style={{ background: "#005691" }}>
      {/* Wave top */}
      <div className="relative h-12 overflow-hidden" style={{ background: "#F9F9F9" }}>
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="absolute bottom-0 w-full" style={{ fill: "#005691" }}>
          <path d="M0,48 C360,0 1080,48 1440,16 L1440,48 Z"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo size="md" white />
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "#a8d8f0", fontFamily: "Open Sans, sans-serif" }}>
              Fresh groceries, everyday essentials, and quality products delivered conveniently to your door. Your trusted supermarket, now online.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { name: "facebook", href: "https://facebook.com" },
                { name: "instagram", href: "https://instagram.com" },
                { name: "twitter", href: "https://twitter.com" },
                { name: "whatsapp", href: "https://wa.me/2349030194735" },
              ].map(({ name, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#6AB04C")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.1)")}
                  aria-label={name}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    {name === "facebook" && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>}
                    {name === "twitter" && <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>}
                    {name === "instagram" && <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="white" strokeWidth="2"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="white" strokeWidth="2"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="2"/></>}
                    {name === "whatsapp" && <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-white" style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.05em" }}>SHOP</h4>
            <ul className="space-y-2.5">
              {[
                { label: "All Products", page: "products" },
                { label: "Categories", page: "products" },
                { label: "Fresh Produce", page: "products" },
                { label: "Deals", page: "deals" },
                { label: "New Arrivals", page: "products" },
              ].map(({ label, page }) => (
                <li key={label}>
                  <button
                    onClick={() => onNavigate(page)}
                    className="text-sm transition-colors text-left"
                    style={{ color: "#a8d8f0", fontFamily: "Open Sans, sans-serif" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#6AB04C")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#a8d8f0")}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-white" style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.05em" }}>CONTACT</h4>
            <div className="space-y-3 mb-5">
              {[
                { icon: "phone", text: "+234 903 019 4735" },
                { icon: "mail", text: "hello@abdulsmarket.ng" },
                { icon: "map", text: "Lagos, Abuja & Kano" },
              ].map(({ icon, text }) => (
                <div key={icon} className="flex items-start gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6AB04C" strokeWidth="2" className="mt-0.5 flex-shrink-0">
                    {icon === "phone" && <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.38 2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16z"/>}
                    {icon === "mail" && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>}
                    {icon === "map" && <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>}
                  </svg>
                  <span className="text-sm" style={{ color: "#a8d8f0", fontFamily: "Open Sans, sans-serif" }}>{text}</span>
                </div>
              ))}
            </div>
            {/* WhatsApp order CTA */}
            <a
              href={`https://wa.me/2349030194735?text=${encodeURIComponent("Hello! 👋 I'd like to place an order from Abdul's Enterprise Supermarket. Could you please help me with available products and delivery options? Thank you!")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full"
              style={{ background: "#25D366", color: "white", fontFamily: "Montserrat, sans-serif" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Order via WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom bar — no legal links */}
        <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <p className="text-xs" style={{ color: "#a8d8f0", fontFamily: "Open Sans, sans-serif" }}>
            © 2026 Abdul&apos;s Enterprise Supermarket. All rights reserved.
          </p>
          <div className="flex gap-4">
            {["About Us", "Help & FAQs", "Delivery Info"].map((item) => (
              <button
                key={item}
                onClick={() => onNavigate(item === "About Us" ? "about" : "home")}
                className="text-xs transition-colors"
                style={{ color: "#a8d8f0", fontFamily: "Open Sans, sans-serif" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "white")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#a8d8f0")}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
