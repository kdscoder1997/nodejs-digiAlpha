const mongoose = require("mongoose")

const connectDb = async (URI) => {
    try {
        await mongoose.connect(URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDb