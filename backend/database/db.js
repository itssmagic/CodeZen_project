const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const DBConnection = async () => {
    const MONGODB_URL = process.env.MONGODB_URL;
    try {
        await mongoose.connect(MONGODB_URL, { useNewUrlParser: true });
        console.log("DB connection is established!");
    } catch (error) {
        console.log("error connecting to MongoDb: " + error);
    }
};

module.exports = { DBConnection };