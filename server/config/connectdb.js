const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Database connection established')
    }
    catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // Exit with failure
    }
};

module.exports = connectDB;