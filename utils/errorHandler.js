const { StatusCodes } = require("http-status-codes")


class NOT_FOUND_ERROR extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
        this.name = "NotFoundError"
        Error.captureStackTrace(this, this.constructor)
    }
}

class BAD_REQUEST_ERROR extends Error {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
        this.name = "BadRequestError"
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = { NOT_FOUND_ERROR, BAD_REQUEST_ERROR }

