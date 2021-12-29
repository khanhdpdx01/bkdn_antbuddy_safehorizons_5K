import CustomApiError from './CustomApiError';

class Unauthorized extends CustomApiError {
    constructor(message) {
        super(message);
        this.statusCode = 401;
    }
}

export default Unauthorized;
