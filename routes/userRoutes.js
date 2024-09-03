const express = require("express")
const router = express.Router()
const { register, getUserByFilter, getUserById, updateUser, deleteUser } = require("../controllers/user")
const { reqValidation, handleValidationErrors, validateId, userFilterValidation } = require("../utils/validation")

router.route("/register").post(reqValidation, handleValidationErrors, register)
router.route("/getUser/:id").get(validateId("id"), handleValidationErrors, getUserById)
router.route("/delete/:id").delete(validateId("id"), handleValidationErrors, deleteUser)
router.route("/update/:id").patch(validateId("id"), handleValidationErrors, updateUser)
router.route("/getUser").get(userFilterValidation, handleValidationErrors, getUserByFilter)

module.exports = router

