const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend working');
});

const cartRoutes = require('./routes/cartRoutes'); 
app.use('/api', cartRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
