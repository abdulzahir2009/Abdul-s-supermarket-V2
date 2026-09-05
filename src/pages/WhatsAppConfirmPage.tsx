type WhatsAppConfirmPageProps = {
  onNavigate: (page: string) => void;
};

const WHATSAPP_NUMBER = "2349030194735";

export default function WhatsAppConfirmPage({ onNavigate }: WhatsAppConfirmPageProps) {
  return (
    <div style={{ background: "#F9F9F9", minHeight: "100vh" }} className="flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        {/* WhatsApp icon */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)", border: "4px solid #25D366" }}
        >
          <svg width="44" height="44" viewBox="0 0 24 24" fill="#25D366">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>

        <h1 className="font-bold mb-3" style={{ fontFamily: "Montserrat, sans-serif", color: "#333", fontSize: "clamp(22px, 5vw, 30px)" }}>
          Your Order Is Ready!
        </h1>
        <p className="mb-8 leading-relaxed" style={{ color: "#4F4F4F", fontFamily: "Open Sans, sans-serif" }}>
          Your order details have been prepared in WhatsApp. Send the message to our team so we can confirm your order, delivery, and payment details.
        </p>

        {/* Steps */}
        <div className="bg-white rounded-2xl p-6 mb-6 text-left" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          <p className="font-bold text-sm mb-4" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>What happens next?</p>
          <div className="space-y-4">
            {[
              { step: "1", title: "Send via WhatsApp", desc: "WhatsApp has opened with your order pre-filled. Just tap Send." },
              { step: "2", title: "We confirm your order", desc: "Our team will verify product availability and delivery details." },
              { step: "3", title: "Payment & Delivery", desc: "We'll share secure payment instructions and confirm your delivery time." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-3 items-start">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0"
                  style={{ background: "#25D366", color: "white", fontFamily: "Montserrat, sans-serif" }}
                >
                  {step}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>{title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#888", fontFamily: "Open Sans, sans-serif" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important notice */}
        <div className="rounded-xl p-4 mb-6 text-sm text-left" style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
          <p style={{ color: "#92400e", fontFamily: "Open Sans, sans-serif" }}>
            <strong>Note:</strong> Your order is not yet confirmed. It will be confirmed once our team responds on WhatsApp.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank")}
            className="flex-1 py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2"
            style={{ background: "#25D366", fontFamily: "Montserrat, sans-serif" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Open WhatsApp
          </button>
          <button
            onClick={() => onNavigate("home")}
            className="flex-1 py-3.5 rounded-xl font-bold text-sm"
            style={{ border: "2px solid #005691", color: "#005691", fontFamily: "Montserrat, sans-serif" }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
