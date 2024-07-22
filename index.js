const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

// routes
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');

dotenv.config();

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit the process with a failure code
    }
}

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

// connect to the database
connectToDatabase();

// routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

// start the server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});
