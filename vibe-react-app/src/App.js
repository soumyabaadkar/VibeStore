import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import cover1 from "./assets/images/cover1.jpg";
import cover5 from "./assets/images/cover5.jpg";
import cover3 from "./assets/images/cover3.jpg";
import cover4 from "./assets/images/cover4.jpg";

import Hoodies from "./assets/images/Hoodies.jpg";
import Denim from "./assets/images/Denim.jpg";
import sunglasses from "./assets/images/sunglasses.jpg";
import shoes from "./assets/images/shoes.jpg";
import Watch from "./assets/images/Watch.jpg";
import dress from "./assets/images/dress.jpg";
import tshirt from "./assets/images/tshirt.jpg";
import watch2 from "./assets/images/watch2.jpg";
import Bag from "./assets/images/Bag.jpg";
import bag1 from "./assets/images/bag1.jpg";


import Cart from "./Cart";

import Checkout from "./Checkout";


function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const imageMap = {
    "Hoodies.jpg": Hoodies,
    "Denim.jpg": Denim,
    "sunglasses.jpg": sunglasses,
    "shoes.jpg": shoes,
    "Watch.jpg": Watch,
    "dress.jpg": dress,
    "tshirt.jpg": tshirt,
    "watch2.jpg": watch2,
    "Bag.jpg": Bag,
    "bag1.jpg": bag1,
  };

  const handleAddToCart = async (product) => {
  const confirmAdd = window.confirm(`Do you want to add "${product.name}" to cart?`);

  if (!confirmAdd) {
    alert("Cancelled adding to cart.");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id, qty: 1 }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.message || "Failed to add");
      return;
    }

    const data = await res.json();
    alert(`${product.name} added to cart!`);
    console.log("Cart:", data.cart);

  } catch (err) {
    alert("Error adding product to cart!");
    console.error(err);
  }
};


  return (
    <div >
      <header className="navbar">
        <h1 className="store-title">Vibe Store</h1>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/cart" className="nav-link">Cart</Link>
          <Link to="/checkout" className="nav-link">Checkout</Link>
        </nav>
      </header>
       
      <Router> 
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={cover5}
                      className="d-block w-100"
                      alt="Banner 1"
                    />
                  </div>
                  <div className="carousel-item">
                    <img src={cover4}
                      className="d-block w-100"
                      alt="Banner 2"
                    />
                  </div>
                  <div className="carousel-item">
                    <img src={cover1}
                      className="d-block w-100"
                      alt="Banner 3"
                    />
                  </div>
                  <div className="carousel-item">
                    <img src={cover3}
                      className="d-block w-100"
                      alt="Banner 4"
                    />
                  </div>
                </div>

                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#heroCarousel"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>

                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#heroCarousel"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>

              <div className="product-grid">
                {products.map((p) => (
                  <div key={p.id} className="product-card">
                    <img src={imageMap[p.image]} alt={p.name} className="product-img"></img>
                    <h3>{p.name}</h3>
                    <p>&#8377; {p.price}</p>
                    <button className="add-btn" onClick={() => handleAddToCart(p)}>Add to Cart</button>
                  </div>
                ))}

              </div>

            </>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      </Router>
      
      <footer className="footer">
        <h3 className="footer-logo">Vibe Store</h3>
        <p className="footer-tagline">Style that speaks. Deals that delight.</p>
        <div className="footer-icons">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
        <p className="footer-bottom">© 2025 Vibe Store. All rights reserved.</p>
      </footer>
      
    </div >

  );
}


export default App;
