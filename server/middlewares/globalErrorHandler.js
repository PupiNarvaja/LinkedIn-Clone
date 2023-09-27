const logger = require("../log/winston");
const CustomError = require("../utils/CustomError");

const devErrors = (res, error) => {
  const errorObj = { 
    status: error.statusCode,
    message: error.message,
    stackTrace: error.stack,
    error,
  };

  res.status(error.statusCode).send(errorObj);
}

const castErrorHandler = (error) => {
  const message = `Invalid value for ${error.path}: ${error.value}.`;
  return new CustomError(message, 400);
}

const prodErrors = (res, error) => {
  if (error.isOperational) {
    const errorObj = { 
      status: error.statusCode,
      message: error.message,
    };
  
    return res.status(error.statusCode).send(errorObj);
  }

  res.status(500).send({
    status: "Error",
    message: "Internal server error. Please, try again later.",
  });
}

module.exports = (error, req, res, next) => {
  logger.error(error?.message);

  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  error.message = error.message || "Unexpected error occurred.";

  const isDevelopmentMode = process.env.NODE_ENV === "development";

  if (isDevelopmentMode) {
    return devErrors(res, error);
  }
  
  if (!isDevelopmentMode) {
    const isCastError = error.name === "CastError";

    if (isCastError) {
      error = castErrorHandler(error);
    }

    return prodErrors(res, error);
  }
};
