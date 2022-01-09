const CustomApiError = require('./CustomApiError');

class BadRequest extends CustomApiError {
    constructor(message) {
        super(message);
        this.message = message;
        this.statusCode = 400;
    }
}

module.exports = BadRequest;
