import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://vibestore-sbzb.onrender.com/api/cart")
      .then((res) => res.json())
      .then((data) => {
        setCart(data.cart);
        setTotal(data.total);
      })
      .catch((err) => console.error("Error fetching cart:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("https://vibestore-sbzb.onrender.com/api/cart/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Checkout failed!");

    const data = await response.json();

    alert(`Order placed successfully!\nTotal: ₹${data.total}\nThank you, ${form.name}!`);

    
    setForm({ name: "", email: "", address: "" });
    setCart([]);
    setTotal(0);

    setTimeout(() => {
      navigate("/");
    }, 2000)

  } catch (err) {
    console.error("Error during checkout:", err);
    alert("Something went wrong during checkout!");
  }
};

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Checkout</h2>

        {cart.length === 0 ? (
          <p style={styles.emptyCart}>🛒 Your cart is empty!</p>
        ) : (
          <div>
          
            <div style={styles.summaryBox}>
              <h3 style={styles.sectionTitle}>🧾 Order Summary</h3>
              {cart.map((item) => (
                <div key={item.id} style={styles.cartItem}>
                  <span>
                    {item.name}{" "}
                    <span style={{ color: "#888" }}>(x{item.qty})</span>
                  </span>
                  <span>₹{item.price * item.qty}</span>
                </div>
              ))}
              <h3 style={styles.totalText}>
                Total: <span style={styles.totalAmount}>₹{total}</span>
              </h3>
            </div>

            
            <h3 style={styles.sectionTitle}>🚚 Shipping Details</h3>
            <form onSubmit={handleCheckout} style={styles.form}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <textarea
                name="address"
                placeholder="Shipping Address"
                value={form.address}
                onChange={handleChange}
                required
                style={styles.textarea}
              ></textarea>
              <button
                type="submit"
                style={styles.button}
                onMouseOver={(e) =>
                  (e.target.style.background =
                    "linear-gradient(45deg, #218838, #28a745)")
                }
                onMouseOut={(e) =>
                  (e.target.style.background =
                    "linear-gradient(45deg, #28a745, #2ecc71)")
                }
              >
                Place Order
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
const styles = {
  page: {
    padding: "20px",
    fontFamily: "Poppins, sans-serif",
    background: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
    minHeight: "100vh",
  },
  container: {
    maxWidth: "800px",
    margin: "auto",
    backgroundColor: "white",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    padding: "25px",
  },
  title: {
    textAlign: "center",
    color: "#333",
    fontWeight: "600",
    marginBottom: "25px",
  },
  emptyCart: {
    textAlign: "center",
    color: "#777",
    fontSize: "18px",
  },
  summaryBox: {
    marginBottom: "30px",
    borderBottom: "2px solid #eee",
    paddingBottom: "15px",
  },
  sectionTitle: {
    color: "#555",
    marginBottom: "10px",
  },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px dashed #ddd",
    fontSize: "16px",
  },
  totalText: {
    textAlign: "right",
    marginTop: "15px",
    color: "#222",
  },
  totalAmount: {
    color: "#28a745",
    fontWeight: "600",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "100%",
    marginBottom: "15px",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
    outline: "none",
  },
  textarea: {
    width: "100%",
    marginBottom: "15px",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
    height: "100px",
    resize: "none",
    outline: "none",
  },
  button: {
    background: "linear-gradient(45deg, #28a745, #2ecc71)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "12px 25px",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",
    transition: "all 0.3s ease",
  },
};

export default Checkout;
