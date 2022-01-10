import rateLimit from 'express-rate-limit';

export default rateLimit({
    windowMs: 15 * 60 * 60 * 1000, // 15 minutes
    max: 200, // Limit each IP 50 requests per 15 minutes
    skipSuccessfulRequests: true, // Skip requests
});
