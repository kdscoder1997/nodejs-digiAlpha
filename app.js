const express = require("express")
const morgan = require("morgan")
const { StatusCodes } = require("http-status-codes")
require("dotenv").config()

const connectDb = require("./config/mongoConnect")
const user = require("./routes/userRoutes")
const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use("/api/v1/user", user)

app.use("*", (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({ message: "Page not found (404)" })
})

const port = process.env.PORT || 3000

app.listen(port, async () => {
    try {
        const mongoURI = process.env.NODE_ENV === "development" ? process.env.MONGO_URI : "production mongo url";
        await connectDb(mongoURI)
        console.log(`Server is running on port ${port} in ${process.env.NODE_ENV}`)
    } catch (error) {
        console.log(error)
    }
})
