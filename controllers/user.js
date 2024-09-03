const User = require("../Models/User")
const { BAD_REQUEST_ERROR, NOT_FOUND_ERROR } = require("../utils/errorHandler")
const { StatusCodes } = require("http-status-codes")



const register = async (req, res) => {
    try {
        console.log(req.body)
        const { firstName, lastName, email, phoneNo } = req.body
        let user = await User.findOne({ email: email })
        if (user)
            throw new BAD_REQUEST_ERROR("Email already present!")
        user = await User.create({ firstName, lastName, email, phoneNo })
        return res.status(StatusCodes.OK).json({ user, message: "User created" })
    } catch (error) {
        console.log(error)
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
        const message = error.message || "Internal Server Error"
        if (process.env.NODE_ENV == "development")
            return res.status(statusCode).json({ message, stack: error?.stack })
        return res.status(statusCode).json({ message })

    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
        }
        console.log("here");
        res.status(StatusCodes.OK).json({ message: "user found.", user });
    } catch (error) {
        console.log(error)
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
        const message = error.message || "Internal Server Error"
        if (process.env.NODE_ENV == "development")
            return res.status(statusCode).json({ message, stack: error?.stack })
        return res.status(statusCode).json({ message })
    }
}
const updateUser = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNo } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { firstName, lastName, email, phoneNo }, { new: true });
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
        }
        res.status(StatusCodes.OK).json({ user, message: 'User updated' });
    } catch (error) {
        console.log(error)
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
        const message = error.message || "Internal Server Error"
        if (process.env.NODE_ENV == "development")
            return res.status(statusCode).json({ message, stack: error?.stack })
        return res.status(statusCode).json({ message })
    }
}
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
        }
        res.status(StatusCodes.OK).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error)
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
        const message = error.message || "Internal Server Error"
        if (process.env.NODE_ENV == "development")
            return res.status(statusCode).json({ message, stack: error?.stack })
        return res.status(statusCode).json({ message })
    }
}
const getUserByFilter = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNo } = req.query;
        const filter = {};

        if (firstName) filter.firstName = new RegExp(firstName, 'i');
        if (lastName) filter.lastName = new RegExp(lastName, 'i');
        if (email) filter.email = new RegExp(email, 'i');
        if (phoneNo) filter.phoneNo = new RegExp(phoneNo, 'i');

        const users = await User.find(filter);
        res.status(StatusCodes.OK).json({ users, message: "Users." });
    } catch (error) {
        console.log(error)
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
        const message = error.message || "Internal Server Error"
        if (process.env.NODE_ENV == "development")
            return res.status(statusCode).json({ message, stack: error?.stack })
        return res.status(statusCode).json({ message })
    }
}

module.exports = { register, getUserByFilter, getUserById, updateUser, deleteUser }