import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="newsletter">
          <div className="newsletter-emoji">💌</div>
          <h2 className="newsletter-title">Get Exclusive Baby Deals</h2>
          <p className="newsletter-sub">
            Join 12,000+ parents getting weekly deals, reviews & parenting tips
          </p>

          {submitted ? (
            <p style={{ color: "var(--text-dark)", fontWeight: 700, fontSize: "1rem" }}>
              🎉 You're in! Check your inbox for a welcome gift.
            </p>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address"
              />
              <button type="submit" className="newsletter-btn">
                Subscribe 🎁
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
