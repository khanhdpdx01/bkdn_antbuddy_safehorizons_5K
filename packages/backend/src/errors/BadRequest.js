import CustomApiError from './CustomApiError';

class BadRequest extends CustomApiError {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    }
}

export default BadRequest;
