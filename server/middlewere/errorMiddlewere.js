class ErrorHandler extends Error{
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddlewere = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400)
    }
    if (err.name === "JasonWebTokenError") {
        const message = "Jason Web Token Is Invalid, Try Again";
        err = new ErrorHandler(message, 400)
    }
    if (err.name === "TokenExpiredError") {
        const message = "Jason Web Token Is Expired, Try Again";
        err = new ErrorHandler(message, 400)
    }
    if (err.name === "CastError") {
        const message = `Invalid ${err.path}`;
        err = new ErrorHandler(message, 400)
    }
      const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(" ")
    : err.message;
    return res.status(err.statusCode).send({
        success: false,
        // message: err.message,
        message: errorMessage,
    })
}

export default ErrorHandler;