export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-brand">
          <div className="footer-logo-icon">🍼</div>
          <span className="footer-logo-text">TwinShop</span>
        </div>
        <p className="footer-tagline">
          Carefully curated baby products for your little one's every journey.
        </p>

        <div className="footer-cols">
          <div className="footer-col">
            <h4>Shop</h4>
            <a href="#products">New Arrivals</a>
            <a href="#products">Best Sellers</a>
            <a href="#products">Sale</a>
            <a href="#products">Gift Sets</a>
          </div>
          <div className="footer-col">
            <h4>Categories</h4>
            <a href="#products">Feeding</a>
            <a href="#products">Sleep</a>
            <a href="#products">Clothing</a>
            <a href="#products">Toys</a>
          </div>
          <div className="footer-col">
            <h4>Info</h4>
            <a href="#">About Us</a>
            <a href="#">How It Works</a>
            <a href="#">Safety Guide</a>
            <a href="#">Blog</a>
          </div>
          {/* <div className="footer-col">
            <h4>Support</h4>
            <a href="#">Contact Us</a>
            <a href="#">Returns</a>
            <a href="#">Track Order</a>
            <a href="#">FAQ</a>
          </div> */}
        </div>

        <div className="footer-bottom">
          {/* <p className="footer-copy">© 2025 TwinShop. All rights reserved.</p> */}
          <p className="footer-disclaimer">
            <b>Disclaimer:</b> Links are affiliate links, so we may earn a
            commission at no extra cost to you. Product images and trademarks
            belong to their owners. Please verify details on the official
            website.
          </p>
        </div>
      </div>
    </footer>
  );
}
