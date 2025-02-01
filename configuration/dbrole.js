const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database is connected successfully");
    } catch (err) {
        console.log(`Error on database, ${err}`);
        // Optionally, you can rethrow the error to let the calling code handle it
        throw err;
    }
};

module.exports = connectDB;