import jwt from 'jsonwebtoken';
import { BadRequest } from '../../errors/index';
import { LOGIN_REQUIRED } from '../../constants/HttpMessage';

require('dotenv').config({ path: `${__dirname}/../../../.env` });

/**
 * @description This is middleware used for authenticating validation.
 * Inject this in  your routing configuration
 */
class Authentication {
    static getAuthentication() {
        if (!Authentication.instance) {
            Authentication.instance = new Authentication();
        }

        return Authentication.instance;
    }

    /**
     * Generate token
     * @param {ObjectId} accountId
     * @param {Moment} expires
     * @param {string} [secret]
     * @returns {string}
     */
    generateToken(payload = {}, expires = process.env.JWT_EXPIRE, secret = process.env.JWT_SECRET) {
        return jwt.sign(payload, secret, {
            expiresIn: parseInt(expires, 10),
            noTimestamp: true,
        });
    }

    verifyToken(token, secret = process.env.JWT_SECRET) {
        try {
            return jwt.verify(token, secret);
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError || err instanceof jwt.JsonWebTokenError) {
                throw new BadRequest(LOGIN_REQUIRED);
            }
        }
    }
}

export default Authentication;
