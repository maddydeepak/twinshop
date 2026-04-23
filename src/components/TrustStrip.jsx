const TRUST_ITEMS = [
  { icon: "🚚", label: "Free Delivery ₹999+" },
  { icon: "♻️", label: "Eco Packaging" },
  { icon: "✅", label: "Safety Certified" },
  { icon: "↩️", label: "Easy Returns" },
  { icon: "💳", label: "Secure Checkout" },
];

export default function TrustStrip() {
  return (
    <div className="trust-strip">
      <div className="container">
        <div className="trust-items">
          {TRUST_ITEMS.map((item) => (
            <div className="trust-item" key={item.label}>
              <span className="trust-icon">{item.icon}</span>
              <span className="trust-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
