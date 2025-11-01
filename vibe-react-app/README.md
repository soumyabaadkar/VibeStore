VibeStore

VibeStore is a fullstack e-commerce web application that allows users to browse products, add them to their cart, and proceed to checkout. It focuses on building seamless frontend–backend integration using React, Node.js, and Express.js.


---

Features

-Browse a variety of products with images, names, and prices.

- Add and remove items from the shopping cart.

- Dynamic cart updates with total price calculation.

- Checkout functionality that clears the cart after successful order completion.

- Modern and responsive UI with Bootstrap styling.

- Integrated backend API for managing products and cart data.


---

Tech Stack

- Frontend: React.js, Bootstrap, JavaScript, CSS
- Backend: Node.js, Express.js
- Other Tools: Axios, React Router


---

Installation & Setup

1. Clone the repository

   git clone https://github.com/yourusername/VibeStore.git

2. Navigate to the main folder

   cd VibeStore

3. Install dependencies

   Frontend:

   cd app
   npm install

   Backend:

   cd ../backend
   npm install

4. Run the project

   Open two terminals:

   Terminal 1 (Backend):

   cd backend
   node server.js

   Terminal 2 (Frontend):

   cd app
   npm start


---

📂VibeStore/
│
├── backend/
│   ├── routes/
│   │   └── cartRoutes.js
│   ├── server.js
│   ├── package.json
│
├── vibe-react-app/
│   ├── src/
│   │   ├── context/
│   │   │   ├── cartContext.js
│   │   │── index.css
│   │   │── Checkout.js
│   │   │── Cart.js
│   │   ├── App.js
│   │   ├── index.js
│   ├── package.json
│
└── README.md


---

Future Improvements

- Add a database (MongoDB or MySQL) for persistent cart data

- Implement user authentication

- Add product filters and sorting options

- Integrate online payment gateway



---


Author
Soumya Baadkar

🚀 Passionate about building fullstack web applications


---



