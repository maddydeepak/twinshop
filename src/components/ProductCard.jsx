import { useState } from "react";

function StarRating({ rating }) {
  return (
    <span className="stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ opacity: s <= Math.round(rating) ? 1 : 0.25 }}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function ProductCard({ product, animDelay = 0 }) {
  const badgeClass =
    {
      bestseller: "badge-bestseller",
      toprated: "badge-toprated",
      new: "badge-new",
      sale: "badge-sale",
    }[product.badgeType] || "badge-new";

  return (
    <div className="product-card" style={{ animationDelay: `${animDelay}ms` }}>
      {/* Image area */}
      <div className="card-image">
        {/* <span className="card-image-inner">{product.emoji}</span> */}
        <img className="card-image-inner" src={product.emoji} />
        {product.badge && (
          <span className={`card-badge ${badgeClass}`}>{product.badge}</span>
        )}
      </div>

      {/* Body */}
      <div className="card-body">
        <p className="card-name">{product.name}</p>

        {/* <div className="card-rating">
          <StarRating rating={product.rating} />
          <span className="rating-count">({product.reviews})</span>
        </div> */}

        {/* <div className="card-price">
          <span className="price-current">
            ₹{(product.price * 83).toFixed(0)}
          </span>
          {product.originalPrice && (
            <span className="price-original">
              ₹{(product.originalPrice * 83).toFixed(0)}
            </span>
          )}
        </div> */}

        <a
          href={product.affiliate}
          className="card-btn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Buy ${product.name}`}
        >
          🛒 Buy Now
        </a>
      </div>
    </div>
  );
}
