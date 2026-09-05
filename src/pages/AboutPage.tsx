type AboutPageProps = {
  onNavigate: (page: string) => void;
};

const values = [
  { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#6AB04C" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: "Quality First", desc: "Every product passes strict quality checks. We source only from trusted suppliers and local farmers.", bg: "#edf7e8" },
  { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#005691" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>, title: "Fast & Reliable", desc: "Our delivery team works every day to get fresh products to your door on time.", bg: "#e8f2fa" },
  { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#6AB04C" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: "Community Rooted", desc: "We support local farmers, create local jobs, and serve local families.", bg: "#edf7e8" },
  { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#005691" strokeWidth="2"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>, title: "Always Improving", desc: "We listen to our customers and constantly refine our product selection and service.", bg: "#e8f2fa" },
];

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #003d6b 0%, #005691 60%, #0070b8 100%)", minHeight: "clamp(300px, 60vw, 420px)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1440 420" className="absolute top-0 left-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
            <ellipse cx="1200" cy="80" rx="380" ry="300" fill="rgba(106,176,76,0.07)" transform="rotate(-20 1200 80)"/>
            <circle cx="100" cy="380" r="200" fill="rgba(255,255,255,0.03)"/>
          </svg>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center flex flex-col items-center justify-center" style={{ minHeight: "clamp(300px, 60vw, 420px)" }}>
          <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(106,176,76,0.2)", color: "#a8e890", fontFamily: "Montserrat, sans-serif" }}>
            OUR STORY
          </span>
          <h1 className="font-bold text-white mb-4 leading-tight" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(28px, 6vw, 56px)" }}>
            Good Food.<br/>Better Living.
          </h1>
          <p className="leading-relaxed max-w-2xl" style={{ color: "rgba(255,255,255,0.82)", fontFamily: "Open Sans, sans-serif", fontSize: "clamp(14px, 2vw, 18px)" }}>
            Abdul&apos;s Enterprise Supermarket was founded with one mission: to make fresh, quality groceries accessible and convenient for every Nigerian household.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full" style={{ height: 60, display: "block", fill: "white" }}>
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z"/>
          </svg>
        </div>
      </section>

      {/* Story */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -top-6 -left-6 rounded-full hidden sm:block" style={{ width: 160, height: 160, background: "rgba(106,176,76,0.08)" }}/>
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden" style={{ height: "clamp(220px, 55vw, 400px)" }}>
                <img src="https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?w=700&h=500&fit=crop&auto=format" alt="Fresh produce at Abdul's" className="w-full h-full object-cover"/>
              </div>
              <div className="absolute -bottom-4 right-3 sm:-bottom-5 sm:right-6 bg-white rounded-xl sm:rounded-2xl p-3 flex items-center gap-2" style={{ boxShadow: "0 8px 32px rgba(0,86,145,0.12)" }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#edf7e8" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6AB04C" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>Freshness Guaranteed</div>
                  <div className="text-xs" style={{ color: "#888" }}>Sourced daily from local farms</div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-xs sm:text-sm font-semibold mb-2 block" style={{ color: "#6AB04C", fontFamily: "Montserrat, sans-serif" }}>WHO WE ARE</span>
              <h2 className="font-bold mb-4 leading-tight" style={{ fontFamily: "Montserrat, sans-serif", color: "#005691", fontSize: "clamp(22px, 4vw, 38px)" }}>
                Your Neighbourhood Supermarket, Now Online
              </h2>
              <p className="text-sm sm:text-base leading-relaxed mb-3" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>
                What began as a local store serving our immediate community has grown into a trusted name in grocery delivery across Nigeria. We built Abdul&apos;s on the belief that everyone deserves access to fresh, quality food — delivered with care.
              </p>
              <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>
                We work directly with local farmers and vetted suppliers to bring you the best produce every day. Every item is selected with your family&apos;s health and satisfaction in mind.
              </p>
              <button
                onClick={() => onNavigate("products")}
                className="px-7 py-3 rounded-full font-bold text-sm text-white w-full sm:w-auto"
                style={{ background: "#6AB04C", fontFamily: "Montserrat, sans-serif", transition: "background 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#4e8a35")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#6AB04C")}
              >
                Shop Our Products
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8" style={{ background: "#F9F9F9" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs sm:text-sm font-semibold block mb-2" style={{ color: "#6AB04C", fontFamily: "Montserrat, sans-serif" }}>WHAT DRIVES US</span>
            <h2 className="font-bold" style={{ fontFamily: "Montserrat, sans-serif", color: "#005691", fontSize: "clamp(20px, 3vw, 36px)" }}>Our Values</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map(({ icon, title, desc, bg }) => (
              <div key={title} className="rounded-2xl p-4 sm:p-6 flex flex-col items-start" style={{ background: bg }}>
                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center mb-3" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>{icon}</div>
                <h4 className="font-bold text-xs sm:text-sm mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>{title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Freshness section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <span className="text-xs sm:text-sm font-semibold block mb-2" style={{ color: "#6AB04C", fontFamily: "Montserrat, sans-serif" }}>FRESHNESS & QUALITY</span>
              <h2 className="font-bold mb-4 leading-tight" style={{ fontFamily: "Montserrat, sans-serif", color: "#005691", fontSize: "clamp(20px, 3vw, 36px)" }}>
                From Farm to Your Doorstep
              </h2>
              <p className="text-sm sm:text-base leading-relaxed mb-3" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>
                Freshness is not a promise — it&apos;s our standard. We source produce directly from local farms to ensure the shortest possible journey from field to your kitchen.
              </p>
              <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>
                Our same-day dispatch ensures that what arrives at your door is as fresh as what you&apos;d pick yourself.
              </p>
              <div className="flex gap-5 sm:gap-8">
                {[["Daily", "Fresh sourcing"], ["24h", "Delivery window"], ["100%", "Quality checked"]].map(([val, label]) => (
                  <div key={label} className="text-center">
                    <div className="font-bold" style={{ color: "#005691", fontFamily: "Montserrat, sans-serif", fontSize: "clamp(18px, 4vw, 24px)" }}>{val}</div>
                    <div className="text-xs mt-0.5" style={{ color: "#888", fontFamily: "Open Sans, sans-serif" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden" style={{ height: "clamp(200px, 50vw, 360px)" }}>
              <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&h=500&fit=crop&auto=format" alt="Fresh vegetables" className="w-full h-full object-cover"/>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8" style={{ background: "linear-gradient(135deg, #edf7e8 0%, #e8f2fa 100%)" }}>
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs sm:text-sm font-semibold block mb-2" style={{ color: "#6AB04C", fontFamily: "Montserrat, sans-serif" }}>SUSTAINABILITY</span>
          <h2 className="font-bold mb-4" style={{ fontFamily: "Montserrat, sans-serif", color: "#005691", fontSize: "clamp(20px, 3vw, 36px)" }}>
            Our Promise to the Planet
          </h2>
          <p className="text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-7" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>
            We are committed to reducing food waste, supporting sustainable farming practices, and minimising our environmental footprint. Every order supports a local farmer and a more sustainable food system.
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {["🌱 Local Sourcing", "♻️ Eco-Friendly Packaging", "🤝 Farmer Partnerships", "🌍 Community Investment"].map((tag) => (
              <span key={tag} className="text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-full"
                style={{ background: "white", color: "#005691", fontFamily: "Montserrat, sans-serif", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-bold mb-3" style={{ fontFamily: "Montserrat, sans-serif", color: "#005691", fontSize: "clamp(20px, 3vw, 36px)" }}>
            Ready to Experience the Freshness?
          </h2>
          <p className="mb-7 text-sm sm:text-base" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>
            Shop fresh groceries and everyday essentials with fast delivery to your door.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button onClick={() => onNavigate("products")} className="px-8 py-3.5 rounded-full font-bold text-sm text-white"
              style={{ background: "#6AB04C", fontFamily: "Montserrat, sans-serif", boxShadow: "0 4px 20px rgba(106,176,76,0.35)", transition: "background 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#4e8a35")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#6AB04C")}>
              Shop Now
            </button>
            <button onClick={() => onNavigate("deals")} className="px-8 py-3.5 rounded-full font-bold text-sm"
              style={{ border: "2px solid #005691", color: "#005691", fontFamily: "Montserrat, sans-serif", transition: "all 0.2s", background: "white" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#005691"; (e.currentTarget as HTMLButtonElement).style.color = "white"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "white"; (e.currentTarget as HTMLButtonElement).style.color = "#005691"; }}>
              View Today&apos;s Deals
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
