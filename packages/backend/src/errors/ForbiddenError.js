const CustomApiError = require('./CustomApiError');

class ForbiddenError extends CustomApiError {
    constructor(message) {
        super(message);
        this.statusCode = 403;
    }
}

module.exports = ForbiddenError;
