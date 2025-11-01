import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  
  useEffect(() => {
    fetch("http://localhost:5000/api/cart")
      .then((res) => res.json())
      .then((data) => {
        setCart(data.cart);
        setTotal(data.total);
      })
      .catch((err) => console.error("Error fetching cart:", err));
  }, []);

  const handleCheckout = () => {
    navigate("/Checkout");
  };

  const handleRemove = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/cart/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      setCart(data.cart);
      setTotal(data.cart.reduce((sum, item) => sum + item.price * item.qty, 0));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Poppins, sans-serif"}}>
      <div style={styles.page}>
      <div style={styles.container}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display:"grid", gridTemplateColumns:"1fr 100px 100px", 
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
                padding: "10px",
                borderBottom: "1px solid #ccc",
              }}
            >
              <p style= {{marginTop: "25px"}}>
                <strong>{item.name}</strong> (x{item.qty})
              </p>
              <p style= {{marginTop: "25px"}} >₹{item.price * item.qty}</p>
              <button
                onClick={() => handleRemove(item.id)}
                style={{
                  backgroundColor: "#ff4d4d",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <h4 style={{fontWeight: "bolder"}}>Total: ₹{total}</h4>
          <button
            onClick={ handleCheckout }
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "10px 20px",
              marginTop: "18px",
              cursor: "pointer",
            }
          }
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
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
};


export default Cart;
