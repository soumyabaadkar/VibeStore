const express = require('express');
const router = express.Router();

let products = [
  { id: 1, name: "Hoodie", price: 1200, image: "Hoodies.jpg" },
  { id: 2, name: "Denim Jacket", price: 2000, image: "Denim.jpg" },
  { id: 3, name: "Sunglasses", price: 800, image: "sunglasses.jpg" },
  { id: 4, name: "Sneakers", price: 1500, image: "shoes.jpg" },
  { id: 5, name: "Luxury Watch", price: 3000, image: "Watch.jpg" },
  { id: 6, name: "Dress", price: 1800, image: "dress.jpg" },
  { id: 7, name: "T-Shirt", price: 700, image: "tshirt.jpg" },
  { id: 8, name: "Analog Watch", price: 2500, image: "watch2.jpg" },
  { id: 9, name: "Leather Bag", price: 2200, image: "Bag.jpg" },
  { id: 10, name: "Handbag", price: 1300, image: "bag1.jpg" },
];

let cart = [];


router.get('/products', (req, res) => {
  res.json(products);
});


router.get('/cart', (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  res.json({ cart, total });
});


router.post('/cart', (req, res) => {
  const { productId, qty } = req.body;

  const product = products.find(p => p.id === productId);

  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const itemInCart = cart.find(i => i.id === productId);

  if (itemInCart) {
    itemInCart.qty += qty;
  } else {
    cart.push({ ...product, qty });
  }

  res.json({ message: 'Added to cart', cart });
});


router.delete('/cart/:id', (req, res) => {
  const id = parseInt(req.params.id);
  cart = cart.filter(i => i.id !== id);
  res.json({ message: 'Item removed', cart });
});


router.post('/cart/Checkout', (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const receipt = {
    total,
    timestamp: new Date().toISOString(),
  };
  cart = [];
  res.json(receipt);
});

module.exports = router;
