import Service from './Service';

class AuthService {
    constructor(callback) {
        this.callback = callback;
    }

    async login(data) {
        try {
            const account = await Service.post('/auth/login', JSON.stringify(data));
            return account.data;
        } catch (err) {
            return ({ Error: JSON.stringify(err.response.data.message) });
        }
    }

    async register(data) {
        try {
            const account = await Service.post('/auth/register', JSON.stringify(data));
            return account.data;
        } catch (err) {
            return ({ Error: JSON.stringify(err.response.data.message) });
        }
    }

    async forgotPassword(email) {
        try {
            await Service.post('/auth/forgot-password', JSON.stringify(email));
        } catch (err) {
            return ({ Error: JSON.stringify(err.response.data.message) });
        }
    }

    async resetPassword(password, resetPwdToken) {
        try {
            await Service.post(`/auth/forgot-password?token=${resetPwdToken}`,
                JSON.stringify(password));
        } catch (err) {
            return ({ Error: JSON.stringify(err.response.data.message) });
        }
    }

    async sendVerifyEmail(email) {
        try {
            await Service.post('/auth/send-verify-email', JSON.stringify(email));
        } catch (err) {
            return ({ Error: JSON.stringify(err.response.data.message) });
        }
    }

    async verifyEmail(verifyEmailToken) {
        try {
            await Service.post(`/auth/verification-email?token=${verifyEmailToken}`);
        } catch (err) {
            return ({ Error: JSON.stringify(err.response.data.message) });
        }
    }
}
export default new AuthService();