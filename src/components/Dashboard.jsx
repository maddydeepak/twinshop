import { useState, useMemo } from "react";

const PRODUCTS = [
  {
    id: 1,
    name: "Ergobaby Omni 360 Baby Carrier",
    price: 3499,
    originalPrice: 4200,
    rating: 4.8,
    reviews: 2341,
    category: "Carriers",
    badge: "Best Seller",
    image: "👶",
    description:
      "All-position baby carrier with lumbar support. Suitable from newborn to toddler.",
    inStock: true,
  },
  {
    id: 2,
    name: "Chicco Bravo Trio Travel System",
    price: 18999,
    originalPrice: 22000,
    rating: 4.7,
    reviews: 987,
    category: "Strollers",
    badge: "Top Pick",
    image: "🛺",
    description:
      "Complete travel system includes stroller, car seat & base. Perfect for twins!",
    inStock: true,
  },
  {
    id: 3,
    name: "MAM Anti-Colic Baby Bottles Set",
    price: 1299,
    originalPrice: 1599,
    rating: 4.6,
    reviews: 4520,
    category: "Feeding",
    badge: "Twin Fav",
    image: "🍼",
    description:
      "Set of 4 self-sterilising anti-colic bottles. Reduces colic & fussiness.",
    inStock: true,
  },
  {
    id: 4,
    name: "Fisher-Price Snugapuppy Bouncer",
    price: 2799,
    originalPrice: 3200,
    rating: 4.5,
    reviews: 1876,
    category: "Bouncers",
    badge: "Sale",
    image: "🐶",
    description:
      "Soothing seat with calming vibrations and soft overhead mobile.",
    inStock: true,
  },
  {
    id: 5,
    name: "Pampers Swaddlers Diapers (Size 1, 164ct)",
    price: 1899,
    originalPrice: 2199,
    rating: 4.9,
    reviews: 8921,
    category: "Diapers",
    badge: "Essential",
    image: "🧷",
    description:
      "Soft, absorbent diapers with wetness indicator. Dermatologist tested.",
    inStock: true,
  },
  {
    id: 6,
    name: "Summer Infant Twin Nursing Pillow",
    price: 2499,
    originalPrice: 2999,
    rating: 4.7,
    reviews: 654,
    category: "Feeding",
    badge: "Twin Fav",
    image: "🤱",
    description:
      "Specially designed for nursing twins simultaneously. Firm foam support.",
    inStock: true,
  },
  {
    id: 7,
    name: "Baby Monitor with 2 Cameras",
    price: 6499,
    originalPrice: 7999,
    rating: 4.6,
    reviews: 1243,
    category: "Safety",
    badge: "Must Have",
    image: "📷",
    description:
      "Split-screen monitor with 2 cameras. Night vision, temperature alert, 2-way talk.",
    inStock: true,
  },
  {
    id: 8,
    name: "Graco Pack 'n Play Playard",
    price: 8999,
    originalPrice: 10500,
    rating: 4.8,
    reviews: 3102,
    category: "Sleep",
    badge: "Best Seller",
    image: "🛏️",
    description:
      "Portable playard with changing station and bassinet. Folds flat for travel.",
    inStock: false,
  },
  {
    id: 9,
    name: "Aden + Anais Swaddle Blankets (4-pack)",
    price: 1799,
    originalPrice: 2200,
    rating: 4.9,
    reviews: 6234,
    category: "Clothing",
    badge: "Twin Fav",
    image: "🧣",
    description:
      "Ultra-soft muslin swaddles. Breathable and gets softer with every wash.",
    inStock: true,
  },
  {
    id: 10,
    name: "BabyBjörn Bouncer Balance Soft",
    price: 12999,
    originalPrice: 14999,
    rating: 4.7,
    reviews: 789,
    category: "Bouncers",
    badge: "Premium",
    image: "🌟",
    description:
      "Award-winning bouncer that moves naturally with baby. No batteries needed.",
    inStock: true,
  },
  {
    id: 11,
    name: "Infantino Flip 4-in-1 Carrier",
    price: 1999,
    originalPrice: 2500,
    rating: 4.4,
    reviews: 2890,
    category: "Carriers",
    badge: "Budget Pick",
    image: "👜",
    description:
      "4 carrying positions for newborn through toddler. Ergonomic design.",
    inStock: true,
  },
  {
    id: 12,
    name: "Waterwipes Baby Wipes (720 count)",
    price: 1599,
    originalPrice: 1899,
    rating: 4.8,
    reviews: 12430,
    category: "Diapers",
    badge: "Essential",
    image: "🧻",
    description: "99.9% water wipes. Purest wipe for sensitive newborn skin.",
    inStock: true,
  },
];

const CATEGORIES = [
  "All",
  "Carriers",
  "Strollers",
  "Feeding",
  "Bouncers",
  "Diapers",
  "Safety",
  "Sleep",
  "Clothing",
];

const StarRating = ({ rating }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          style={{
            color: s <= Math.round(rating) ? "#f59e0b" : "#d1d5db",
            fontSize: 13,
          }}
        >
          ★
        </span>
      ))}
      <span style={{ fontSize: 12, color: "#6b7280", marginLeft: 4 }}>
        {rating}
      </span>
    </div>
  );
};

const BadgeColors = {
  "Best Seller": { bg: "#fff7ed", color: "#c2410c", border: "#fed7aa" },
  "Top Pick": { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
  "Twin Fav": { bg: "#fdf4ff", color: "#7e22ce", border: "#e9d5ff" },
  Sale: { bg: "#fef2f2", color: "#dc2626", border: "#fecaca" },
  Essential: { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
  "Must Have": { bg: "#fefce8", color: "#a16207", border: "#fef08a" },
  Premium: { bg: "#f8fafc", color: "#334155", border: "#cbd5e1" },
  "Budget Pick": { bg: "#f0fdfa", color: "#0f766e", border: "#99f6e4" },
};

export default function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [cartOpen, setCartOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const showNotif = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 2500);
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing)
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      return [...prev, { ...product, qty: 1 }];
    });
    showNotif(
      `${product.name.split(" ").slice(0, 3).join(" ")} added to cart!`,
    );
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((i) => i.id !== id));
  const updateQty = (id, qty) => {
    if (qty < 1) {
      removeFromCart(id);
      return;
    }
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (search === "" ||
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase())),
    );
    if (sortBy === "price-asc")
      list = [...list].sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc")
      list = [...list].sort((a, b) => b.price - a.price);
    else if (sortBy === "rating")
      list = [...list].sort((a, b) => b.rating - a.rating);
    else if (sortBy === "reviews")
      list = [...list].sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [category, search, sortBy]);

  const styles = {
    app: {
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      minHeight: "100vh",
      background: "#f3f4f6",
      color: "#111827",
    },
    header: {
      background: "#1a1a2e",
      color: "#fff",
      padding: "0 24px",
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
    },
    headerInner: {
      maxWidth: 1200,
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      gap: 16,
      height: 64,
    },
    logo: {
      fontSize: 22,
      fontWeight: 700,
      color: "#f59e0b",
      whiteSpace: "nowrap",
      cursor: "pointer",
    },
    logoSub: {
      fontSize: 11,
      color: "#9ca3af",
      display: "block",
      fontWeight: 400,
      marginTop: -4,
    },
    searchBar: {
      flex: 1,
      display: "flex",
      borderRadius: 8,
      overflow: "hidden",
      border: "2px solid #f59e0b",
    },
    searchInput: {
      flex: 1,
      padding: "10px 16px",
      border: "none",
      outline: "none",
      fontSize: 14,
      background: "#fff",
    },
    searchBtn: {
      background: "#f59e0b",
      border: "none",
      padding: "0 20px",
      cursor: "pointer",
      fontSize: 16,
      fontWeight: 700,
      color: "#1a1a2e",
    },
    cartBtn: {
      background: "transparent",
      border: "2px solid #f59e0b",
      color: "#f59e0b",
      padding: "8px 16px",
      borderRadius: 8,
      cursor: "pointer",
      fontSize: 14,
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
      gap: 8,
      whiteSpace: "nowrap",
    },
    cartBadge: {
      background: "#ef4444",
      color: "#fff",
      borderRadius: "50%",
      width: 20,
      height: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 11,
      fontWeight: 700,
    },
    nav: { background: "#16213e", padding: "0 24px" },
    navInner: {
      maxWidth: 1200,
      margin: "0 auto",
      display: "flex",
      gap: 0,
      overflowX: "auto",
    },
    navItem: (active) => ({
      background: "transparent",
      border: "none",
      color: active ? "#f59e0b" : "#d1d5db",
      padding: "10px 16px",
      cursor: "pointer",
      fontSize: 13,
      fontWeight: active ? 600 : 400,
      borderBottom: active ? "2px solid #f59e0b" : "2px solid transparent",
      whiteSpace: "nowrap",
    }),
    hero: {
      background:
        "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      color: "#fff",
      padding: "48px 24px",
      textAlign: "center",
    },
    heroTitle: {
      fontSize: 36,
      fontWeight: 800,
      margin: "0 0 12px",
      lineHeight: 1.2,
    },
    heroSub: { fontSize: 16, color: "#9ca3af", margin: "0 0 24px" },
    heroBadge: {
      display: "inline-block",
      background: "#f59e0b",
      color: "#1a1a2e",
      padding: "6px 20px",
      borderRadius: 20,
      fontSize: 13,
      fontWeight: 700,
    },
    main: { maxWidth: 1200, margin: "24px auto", padding: "0 24px" },
    toolbar: {
      display: "flex",
      gap: 12,
      marginBottom: 20,
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
    },
    resultsText: { fontSize: 14, color: "#6b7280" },
    sortSelect: {
      padding: "8px 12px",
      borderRadius: 8,
      border: "1px solid #d1d5db",
      fontSize: 13,
      background: "#fff",
      cursor: "pointer",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      gap: 16,
    },
    card: {
      background: "#fff",
      borderRadius: 12,
      overflow: "hidden",
      border: "1px solid #e5e7eb",
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "pointer",
    },
    cardImg: {
      background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
      height: 160,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 64,
      position: "relative",
    },
    badge: (b) => ({
      position: "absolute",
      top: 10,
      left: 10,
      fontSize: 10,
      fontWeight: 700,
      padding: "3px 8px",
      borderRadius: 20,
      background: BadgeColors[b]?.bg || "#f3f4f6",
      color: BadgeColors[b]?.color || "#374151",
      border: `1px solid ${BadgeColors[b]?.border || "#e5e7eb"}`,
    }),
    wishBtn: {
      position: "absolute",
      top: 10,
      right: 10,
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: "50%",
      width: 32,
      height: 32,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: 16,
    },
    cardBody: { padding: "14px" },
    cardTitle: {
      fontSize: 14,
      fontWeight: 600,
      color: "#111827",
      marginBottom: 4,
      lineHeight: 1.4,
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    },
    cardCat: {
      fontSize: 11,
      color: "#6b7280",
      marginBottom: 6,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
    priceRow: {
      display: "flex",
      alignItems: "baseline",
      gap: 8,
      margin: "8px 0",
    },
    price: { fontSize: 18, fontWeight: 700, color: "#111827" },
    originalPrice: {
      fontSize: 13,
      color: "#9ca3af",
      textDecoration: "line-through",
    },
    discount: { fontSize: 12, color: "#16a34a", fontWeight: 600 },
    addBtn: (inStock) => ({
      width: "100%",
      padding: "10px",
      borderRadius: 8,
      border: "none",
      background: inStock ? "#f59e0b" : "#e5e7eb",
      color: inStock ? "#1a1a2e" : "#9ca3af",
      fontWeight: 700,
      fontSize: 14,
      cursor: inStock ? "pointer" : "not-allowed",
      marginTop: 8,
    }),
    outOfStock: {
      fontSize: 12,
      color: "#ef4444",
      fontWeight: 500,
      marginTop: 4,
    },
    overlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      zIndex: 200,
      display: "flex",
      justifyContent: "flex-end",
    },
    cartPanel: {
      background: "#fff",
      width: "min(420px, 100vw)",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
    },
    cartHeader: {
      padding: "20px 24px",
      borderBottom: "1px solid #e5e7eb",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    cartTitle: { fontSize: 18, fontWeight: 700 },
    closeBtn: {
      background: "transparent",
      border: "none",
      fontSize: 22,
      cursor: "pointer",
      color: "#6b7280",
    },
    cartItem: {
      display: "flex",
      gap: 12,
      padding: "16px 24px",
      borderBottom: "1px solid #f3f4f6",
    },
    cartItemImg: {
      width: 60,
      height: 60,
      background: "#f8fafc",
      borderRadius: 8,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 28,
      flexShrink: 0,
    },
    cartItemName: {
      fontSize: 13,
      fontWeight: 600,
      marginBottom: 4,
      lineHeight: 1.4,
    },
    cartItemPrice: { fontSize: 14, fontWeight: 700, color: "#1a1a2e" },
    qtyRow: { display: "flex", alignItems: "center", gap: 8, marginTop: 6 },
    qtyBtn: {
      background: "#f3f4f6",
      border: "none",
      width: 28,
      height: 28,
      borderRadius: 6,
      cursor: "pointer",
      fontSize: 16,
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    removeBtn: {
      background: "transparent",
      border: "none",
      color: "#ef4444",
      fontSize: 12,
      cursor: "pointer",
      marginLeft: "auto",
    },
    cartFooter: {
      padding: "20px 24px",
      borderTop: "1px solid #e5e7eb",
      marginTop: "auto",
    },
    totalRow: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 16,
      fontWeight: 700,
      marginBottom: 16,
    },
    checkoutBtn: {
      width: "100%",
      padding: "14px",
      background: "#f59e0b",
      border: "none",
      borderRadius: 10,
      fontSize: 16,
      fontWeight: 700,
      cursor: "pointer",
      color: "#1a1a2e",
    },
    notif: (type) => ({
      position: "fixed",
      bottom: 24,
      left: "50%",
      transform: "translateX(-50%)",
      background: type === "success" ? "#1a1a2e" : "#ef4444",
      color: "#fff",
      padding: "12px 24px",
      borderRadius: 10,
      fontSize: 14,
      fontWeight: 500,
      zIndex: 300,
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      whiteSpace: "nowrap",
    }),
    emptyCart: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#9ca3af",
      gap: 12,
      padding: 40,
    },
  };

  const disc = (p) =>
    Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);

  return (
    <div style={styles.app}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div onClick={() => setPage("home")} style={styles.logo}>
            ✨ TwinVibes
            <span style={styles.logoSub}>Shop for Ishan & Shanaya</span>
          </div>
          <div style={styles.searchBar}>
            <input
              style={styles.searchInput}
              placeholder="Search baby products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button style={styles.searchBtn}>🔍</button>
          </div>
          <button style={styles.cartBtn} onClick={() => setCartOpen(true)}>
            🛒 Cart
            {cartCount > 0 && <span style={styles.cartBadge}>{cartCount}</span>}
          </button>
        </div>
      </header>

      {/* Category Nav */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              style={styles.navItem(category === c)}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Everything Your Twins Need 👯</h1>
        <p style={styles.heroSub}>
          Handpicked by IT parents Ishan & Shanaya's family — trusted, tested,
          loved
        </p>
        <span style={styles.heroBadge}>
          🚚 Free delivery on orders above ₹999
        </span>
      </div>

      {/* Main */}
      <main style={styles.main}>
        <div style={styles.toolbar}>
          <p style={styles.resultsText}>
            {filtered.length} products{" "}
            {category !== "All" ? `in ${category}` : ""}{" "}
            {search ? `for "${search}"` : ""}
          </p>
          <select
            style={styles.sortSelect}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="reviews">Most Reviewed</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: 60, color: "#9ca3af" }}>
            <div style={{ fontSize: 48 }}>🔍</div>
            <p style={{ fontSize: 16, marginTop: 12 }}>
              No products found for "{search}"
            </p>
          </div>
        ) : (
          <div style={styles.grid}>
            {filtered.map((product) => (
              <div
                key={product.id}
                style={styles.card}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={styles.cardImg}>
                  <span>{product.image}</span>
                  <span style={styles.badge(product.badge)}>
                    {product.badge}
                  </span>
                  <button
                    style={{
                      ...styles.wishBtn,
                      color: wishlist.includes(product.id)
                        ? "#ef4444"
                        : "#9ca3af",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                  >
                    {wishlist.includes(product.id) ? "❤️" : "🤍"}
                  </button>
                </div>
                <div style={styles.cardBody}>
                  <div style={styles.cardCat}>{product.category}</div>
                  <div style={styles.cardTitle}>{product.name}</div>
                  <StarRating rating={product.rating} />
                  <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>
                    {product.reviews.toLocaleString()} reviews
                  </div>
                  <div style={styles.priceRow}>
                    <span style={styles.price}>
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span style={styles.originalPrice}>
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <span style={styles.discount}>{disc(product)}% off</span>
                  </div>
                  {!product.inStock && (
                    <div style={styles.outOfStock}>Out of stock</div>
                  )}
                  <button
                    style={styles.addBtn(product.inStock)}
                    onClick={() => product.inStock && addToCart(product)}
                  >
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Cart Panel */}
      {cartOpen && (
        <div style={styles.overlay} onClick={() => setCartOpen(false)}>
          <div style={styles.cartPanel} onClick={(e) => e.stopPropagation()}>
            <div style={styles.cartHeader}>
              <span style={styles.cartTitle}>🛒 Your Cart ({cartCount})</span>
              <button
                style={styles.closeBtn}
                onClick={() => setCartOpen(false)}
              >
                ✕
              </button>
            </div>
            {cart.length === 0 ? (
              <div style={styles.emptyCart}>
                <span style={{ fontSize: 48 }}>🛒</span>
                <p style={{ fontWeight: 600, color: "#374151" }}>
                  Your cart is empty
                </p>
                <p style={{ fontSize: 13 }}>
                  Add some products for Ishan & Shanaya!
                </p>
              </div>
            ) : (
              <>
                <div style={{ flex: 1, overflowY: "auto" }}>
                  {cart.map((item) => (
                    <div key={item.id} style={styles.cartItem}>
                      <div style={styles.cartItemImg}>{item.image}</div>
                      <div style={{ flex: 1 }}>
                        <div style={styles.cartItemName}>{item.name}</div>
                        <div style={styles.cartItemPrice}>
                          ₹{(item.price * item.qty).toLocaleString()}
                        </div>
                        <div style={styles.qtyRow}>
                          <button
                            style={styles.qtyBtn}
                            onClick={() => updateQty(item.id, item.qty - 1)}
                          >
                            −
                          </button>
                          <span
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              minWidth: 20,
                              textAlign: "center",
                            }}
                          >
                            {item.qty}
                          </span>
                          <button
                            style={styles.qtyBtn}
                            onClick={() => updateQty(item.id, item.qty + 1)}
                          >
                            +
                          </button>
                          <button
                            style={styles.removeBtn}
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={styles.cartFooter}>
                  <div style={styles.totalRow}>
                    <span>Total</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <button
                    style={styles.checkoutBtn}
                    onClick={() => {
                      showNotif("Order placed! 🎉 Thank you!");
                      setCart([]);
                      setCartOpen(false);
                    }}
                  >
                    Proceed to Checkout →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div style={styles.notif(notification.type)}>{notification.msg}</div>
      )}

      {/* Footer */}
      <footer
        style={{
          background: "#1a1a2e",
          color: "#9ca3af",
          textAlign: "center",
          padding: "24px",
          marginTop: 40,
          fontSize: 13,
        }}
      >
        <p
          style={{
            color: "#f59e0b",
            fontWeight: 700,
            fontSize: 16,
            marginBottom: 8,
          }}
        >
          ✨ TwinVibes Shop
        </p>
        <p>
          Curated by IT parents for twin families · Made with ❤️ for Ishan &
          Shanaya
        </p>
        <p style={{ marginTop: 8 }}>
          © 2026 twinvibesworld · All affiliate links are products we personally
          use and love
        </p>
      </footer>
    </div>
  );
}
