const errorHandler = (err, req, res, next) => {
    if(res.headersSent) {
        return next(err);
    }

    res.status(err.status).json({ 'error': err.message });
}

module.exports = errorHandler;