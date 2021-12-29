import { BadRequest } from '../../errors/index';

class ValidationHelper {
    static isEmail(field, optional = false) {
        return (req, next) => {
            if (optional && !(field in req.body)) return next();
            const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (regex.test(String(req.body[field]).toLowerCase())) return next();
            return next(new BadRequest(`Field ${field} is not email`));
        };
    }

    static isNotEmpty(field, optional = false) {
        return (req, next) => {
            if (optional && !(field in req.body)) return next();
            if (req.body[field]) return next();
            return next(new BadRequest(`Field ${field} should not be empty`));
        };
    }

    static isLength(field, maxLength, optional = false) {
        return (req, next) => {
            if (optional && !(field in req.body)) return next();
            if (req.body[field].length <= maxLength) return next();
            return next(new BadRequest(`Field ${field} should not longer than ${maxLength}`));
        };
    }
}

export default ValidationHelper;
