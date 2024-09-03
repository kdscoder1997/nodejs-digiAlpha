const mongoose = require("mongoose")
const { type } = require("os")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [
            true,
            "Please input the first name."
        ]
    },
    lastName: {
        type: String,
        required: [
            true,
            "Please input the lastName."
        ]
    },
    email: {
        type: String,
        required: [
            true,
            "Please input the email."
        ]
    },
    phoneNo: {
        type: String,
        default: "0000000000"
    },
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User", userSchema)