import bcrypt from 'bcrypt';
import BaseController from '../../infrastructure/Controllers/BaseController';
import Service from './AuthServices';
import CustomersService from '../customers/CustomersService';
import ShippersService from '../shippers/ShippersService';
import SuppliersService from '../suppliers/SuppliersService';
import RolesService from '../roles/RolesService';
import Authentication from '../../common/guards/authentication';
import MailService from '../../utils/MailService';
import {
    NotFoundError,
    BadRequest,
    Unauthorized,
} from '../../errors/index';
import {
    CUSTOMER_NOT_FOUND,
    ACCOUNT_NOT_FOUND,
    INVALID_CREDENTIALS,
    VERIFY_EMAIL_REQUIRED,
    USERNAME_EXISTS,
    EMAIL_EXISTS,
    UNAUTHORIZED,
} from '../../constants/HttpMessage';

class AuthController extends BaseController {
    constructor() {
        super();
        this.authService = Service.getAuthService();
        this.authentication = Authentication.getAuthentication();
        this.mailService = MailService.getMailService();
        this.customerService = CustomersService.getCustomersService();
        this.shippersService = ShippersService.getShippersService();
        this.suppliersService = SuppliersService.getSuppliersService();
        this.rolesService = RolesService.getRolesService();
    }

    static getAuthController() {
        if (!AuthController.instance) {
            AuthController.instance = new AuthController();
        }
        return AuthController.instance;
    }

    async getAllAccounts(req, res) {
        const {
            sortBy, limit, page,
        } = req.query;
        const accounts = await this.authService.getAllAccounts({
            sortBy, limit, page,
        });
        return res.status(200).json({ accounts });
    }

    async getAccount(req, res) {
        const account = await this.authService
            .getBy({ account_id: req.params.accountId });
        if (!account) {
            throw new NotFoundError(CUSTOMER_NOT_FOUND);
        }

        return res.status(200).json({ account });
    }

    async register(req, res) {
        const {
            username, password, email, roleIds,
        } = req.body;
        const [isUsername, isEmail, hash] = await Promise.all([
            this.authService.findByUsername(username),
            this.authService.findByEmail(email),
            bcrypt.hash(password, 12),
        ]);
        if (isUsername) throw new BadRequest(USERNAME_EXISTS);
        if (isEmail) throw new BadRequest(EMAIL_EXISTS);

        const [account, roles] = await Promise.all([
            this.authService.addNewAccount({
                username, email, password: hash,
            }, roleIds),
            this.rolesService.getListByRoleIds(roleIds),
        ]);

        const ids = this.insertAccountIdIntoTables(account[0], roles);
        // save verify email token into database
        const verifyEmailToken = await this.authentication.generateToken({ email });
        res.status(201).json({ account });
        await Promise.all([
            this.authService.createTokenVerifyEMail(account[0], verifyEmailToken),
            this.mailService.sendVerificationEmail(email, verifyEmailToken),
        ]);
    }

    async login(req, res) {
        const { username, password } = req.body;
        const account = await this.authService.findByUsernameOrEmail(username);
        if (account.length === 0) {
            throw new NotFoundError(ACCOUNT_NOT_FOUND);
        }
        if (!account[0].status) {
            throw new BadRequest(VERIFY_EMAIL_REQUIRED);
        }
        const check = await bcrypt.compare(password, account[0].password);
        if (!check) {
            throw new BadRequest(INVALID_CREDENTIALS);
        }
        const accessToken = await this.authService.generateAuthTokens(account[0].account_id);
        const roles = account.map((acc) => ({ role_id: acc.role_id, role_name: acc.role_name }));
        return res.cookie('access_token', accessToken, {
            httpOnly: true,
            signed: true,
            secure: process.env.NODE_ENV === 'production',
        }).status(200).json({
            status: 'success',
            data: roles,
        });
    }

    async deleteOneAccount(req, res) {
        const result = await this.authService.deleteOne(req.params.accountId);
        if (result) {
            return res.status(200).json({
                statusCodde: 200,
                message: 'Delete account successfully completed',
            });
        }

        throw new NotFoundError(ACCOUNT_NOT_FOUND);
    }

    async updateAccount(req, res) {
        const data = req.body;
        const { accountId } = req.params;
        const account = await this.authService.findOneByAccountId(accountId);
        if (!account) {
            throw new NotFoundError(ACCOUNT_NOT_FOUND);
        }

        if (data.password) {
            data.password = await bcrypt.hash(data.password, 12);
        }
        const accountUpdate = await this.authService.updateAccount(accountId, data);
        return res.status(200).json({
            statusCode: 200,
            message: 'Update account successfully completed',
            data: {
                email: accountUpdate.email,
                username: accountUpdate.username,
            },
        });
    }

    async refreshToken(req, res) {
        const accessToken = req.signedCookies.access_token;
        if (!accessToken) {
            throw new Unauthorized(UNAUTHORIZED);
        }
        const updateToken = await this.authService.refreshAuthTokens(accessToken);
        return res.cookie('access_token', updateToken, {
            httpOnly: true,
            signed: true,
            secure: process.env.NODE_ENV === 'production',
        }).status(200).json({
            status: 'success',
            message: 'Refresh tokens success',
        });
    }

    async forgotPassword(req, res) {
        const { email } = req.body;
        const resetPasswordToken = await this.authentication.generateToken({ email });
        res.status(204).send();
        await Promise.all([
            this.authService.saveTokenResetPassword(email, resetPasswordToken),
            this.mailService.sendMailResetPassword(email, resetPasswordToken),
        ]);
    }

    async resetPassword(req, res) {
        const { token } = req.query;
        if (!token) {
            throw new Unauthorized(UNAUTHORIZED);
        }
        await this.authService.resetPassword(token, req.body.password);
        return res.status(200).json({
            status: 'success',
            message: 'reset password successfully',
        });
    }

    async sendVerifyEmail(req, res) {
        const { email } = req.body;
        const verifyEmailToken = await this.authentication.generateToken({ email });
        res.status(403).send();
        await Promise.all([
            this.authService.saveTokenVerifyEmail(email, verifyEmailToken),
            this.mailService.sendVerificationEmail(email, verifyEmailToken),
        ]);
    }

    async verifyEmail(req, res) {
        const { token } = req.query;
        if (!token) {
            throw new Unauthorized(UNAUTHORIZED);
        }
        await this.authService.verifyEmail(token);
        return res.status(200).json({
            status: 'success',
            message: 'Verification email success!',
        });
    }

    async insertAccountIdIntoTables(accountId, roles) {
        let result = [];
        let temp;
        const authController = AuthController.getAuthController();
        
        roles.forEach(function(role) {
            switch(role.role_name) {
                case 'CUSTOMER':
                    temp =  authController.customerService.addNewCustomer({account_id: accountId});
                    result.push(temp);
                    break;
                case 'SHIPPER':
                    temp =  authController.shippersService.addNewShipper({account_id: accountId});
                    result.push(temp);
                    break;
                case 'SUPPLIER':
                    temp =  authController.suppliersService.addNewSupplier({account_id: accountId});
                    result.push(temp);
                    break;
            }
        })
        return result;
    }
}
export default AuthController;
