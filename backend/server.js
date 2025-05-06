// // backend/server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use('/api/auth', authRoutes);

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => app.listen(process.env.PORT, () => console.log('Server started')))
//   .catch(err => console.log(err));

// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();

// ✅ Configure CORS to allow your frontend domain
app.use(
  cors({
    origin: 'https://armtonix.net', // replace with your frontend Render domain
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
