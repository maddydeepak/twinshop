import { useState, useEffect } from "react";
import { featuredBanners } from "../data/products";

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % featuredBanners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = featuredBanners[current];

  const heroEmojis = ["🌸", "🌙", "🍼"];
  const emojiList = heroEmojis;

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-slider">
          <div
            className="hero-slide"
            key={current}
            style={{ background: slide.bg }}
          >
            <div className="hero-content">
              <span className="hero-tag">✨ Featured Collection</span>
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-sub">{slide.subtitle}</p>
              <a
                href="#products"
                className="hero-cta"
                style={{ background: slide.accent }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {slide.cta} →
              </a>
            </div>
            <div className="hero-emoji">{emojiList[current]}</div>
          </div>

          {/* Dots */}
          <div className="hero-dots">
            {featuredBanners.map((_, i) => (
              <button
                key={i}
                className={`hero-dot${i === current ? " active" : ""}`}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
