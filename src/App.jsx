import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import TrustStrip from "./components/TrustStrip";
import ProductsSection from "./components/ProductsSection";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="app">
      <Navbar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      {/* <HeroBanner /> */}
      {/* <TrustStrip /> */}
      <ProductsSection
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      {/* <Newsletter /> */}
      <Footer />
    </div>
  );
}
