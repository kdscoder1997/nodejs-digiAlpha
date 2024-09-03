// * Module for request validations
const { body, validationResult, param, query } = require('express-validator');
const { BAD_REQUEST_ERROR, NOT_FOUND_ERROR } = require("../utils/errorHandler")
const mongoose = require("mongoose")

// * Validation for register request body
const reqValidation = [
    body('firstName')
        .trim()
        .notEmpty().withMessage('First name is required.')
        .isLength({ max: 19 }).withMessage('First name must be less than 20 characters'),
    body('lastName')
        .trim()
        .notEmpty().withMessage('Last name is required.')
        .isLength({ max: 19 }).withMessage('Last name must be less than 20 characters.'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Invalid email.'),
    body('phoneNo')
        .trim()
        .notEmpty().withMessage('Phone number is required.')
        .isLength({ max: 10, min: 10 }).withMessage('Phone number must be 10 characters.')
        .isNumeric().withMessage('Phone number must be numeric.')
];

// * Validation for valid mongo ID

const validateId = (paramName) => [
    param(paramName)
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {

                throw new BAD_REQUEST_ERROR('Invalid MongoDB ObjectId');
            }
            return true;
        })
];


// * Validation for getting user via filters

const userFilterValidation = [
    query('firstName')
        .optional()
        .trim()
        .isLength({ max: 19 }).withMessage('First name must be less than 20 characters'),
    query('lastName')
        .optional()
        .trim()
        .isLength({ max: 19 }).withMessage('Last name must be less than 20 characters'),
    query('email')
        .optional()
        .trim()
        .isEmail().withMessage('Invalid email address'),
    query('phoneNo')
        .optional()
        .trim()
        .isLength({ max: 10, min: 10 }).withMessage('Phone number must be 10 characters')
        .isNumeric().withMessage('Phone number must be numeric')
];


const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        try {

            const errorMessages = errors.array().map((err) => err.msg)
            throw new BAD_REQUEST_ERROR(errorMessages)
        } catch (err) {
            console.log(err)
            const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
            const message = err.message || "Something went wrong"
            return res.status(statusCode).json({ message, err, stack: err?.stack })
        }
    }
    next();
};


module.exports = { reqValidation, handleValidationErrors, validateId, userFilterValidation }


