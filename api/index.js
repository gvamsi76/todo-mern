const express = require('express');
const connectDB = require('./config/config');
const userRoutes = require('./routes/index');
require('dotenv').config();
const cors = require('cors');


const app = express();
connectDB();
app.use(cors());

app.use(express.json());

app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
