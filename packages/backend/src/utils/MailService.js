import nodemailer from 'nodemailer';
import logger from '../config/logger';

require('dotenv').config({ path: `${__dirname}/../../.env` });

class MailService {
    constructor() {
        this.transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
        });
        if (process.env.NODE_ENV !== 'staging') {
            this.transport.verify().then(() => logger.info('Connected to email server'))
                .catch((err) => logger.warn(`Failed to connect to email server: ${err.message}`));
        }
    }

    static getMailService() {
        if (!MailService.instance) {
            MailService.instance = new MailService();
        }
        return MailService.instance;
    }

    /**
     * Send an email
     * @param {string} to
     * @param {string} subject
     * @param {string} text
     * @returns {Promise}
     */
    async sendMail(to, subject, text) {
        const msg = {
            from: process.env.EMAIL_FROM,
            to,
            subject,
            text,
        };
        await this.transport.sendMail(msg);
    }

    /**
     * @param {string} to
     * @param {string} tokens
     * @return {Promise}
     */
    async sendMailResetPassword(to, tokens) {
        const subject = 'Reset password';
        const resetPasswordUrl = `${process.env.URL_APP}/reset-password?token=${tokens}`;
        const message = `Dear sir,
        To reset your password, click on this link: ${resetPasswordUrl}
        If you did not request any password resets, then ignore this email.`;
        await this.sendMail(to, subject, message);
    }

    /**
     * Send verification email
     * @param {string} to
     * @param {string} tokens
     * @returns {Promise}
     */
    async sendVerificationEmail(to, tokens) {
        const subject = 'Email Verification';
        const verificationEmailUrl = `${process.env.URL_APP}/verification-email?token=${tokens}`;
        const message = `Dear sir,
        To verify your email, click on this link: ${verificationEmailUrl}\n
        If you not wanna create an account, then ignore this email.`;
        await this.sendMail(to, subject, message);
    }
}

export default MailService;
