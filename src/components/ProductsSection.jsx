import { useMemo } from "react";
import { products, categories } from "../data/products";
import ProductCard from "./ProductCard";

export default function ProductsSection({ activeCategory, onCategoryChange }) {
  const filtered = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="section" id="products">
      <div className="container">
        <h2 className="section-title">Our Top Picks 🌟</h2>
        <p className="section-subtitle">
          Handpicked, parent-trusted products for every little milestone
        </p>

        {/* Category Filter */}
        <div className="category-bar">
          <div className="category-scroll">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`cat-chip${activeCategory === cat.id ? " active" : ""}`}
                onClick={() => onCategoryChange(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="products-grid">
          {filtered.length > 0 ? (
            filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                animDelay={i * 60}
              />
            ))
          ) : (
            <div className="no-results">
              <div className="no-results-emoji">🔍</div>
              <p>No products found in this category yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
