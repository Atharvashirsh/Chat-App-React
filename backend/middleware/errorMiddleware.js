const notFound = (request, response, next) => {
    const error = new Error(`URL not found - ${request.originalUrl}`);
    response.status(404);
    next(error);
};

const errorHandler = (error, request, response, next) => {
    const statusCode = response.statusCode === 200 ? 500 : response.statusCode;
    response.status(statusCode).json({ message: error.message, stack: process.env.NODE_ENV === "production" ? null : error.stack });
};

module.exports = { notFound, errorHandler };
