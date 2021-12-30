import { UNEXPECTED_EXCEPTION } from '../../constants/HttpMessage';

const handleError = (err, res) => {
    if (err.statusCode && err.message) {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode,
            message: err.message,
        });
    }

    // // Database exception
    // return res.status(500).json({
    //     message: UNEXPECTED_EXCEPTION,
    //     statusCode: err.statusCode || 500,
    // });
};

module.exports = {
    handleError,
};
