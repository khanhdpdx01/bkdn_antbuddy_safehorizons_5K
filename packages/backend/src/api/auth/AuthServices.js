import bcrypt from 'bcrypt';
import Repository from './AuthRepository';
import paginate from '../../utils/paginate';
import Authentication from '../../common/guards/authentication';
import {
    Unauthorized,
    NotFoundError,
    BadRequest,
} from '../../errors/index';
import {
    UNAUTHORIZED,
    ACCOUNT_NOT_FOUND,
    INVALID_CREDENTIALS,
} from '../../constants/HttpMessage';

class AuthService {
    constructor() {
        this.accountsRepository = Repository.getAuthRepository();
        this.authentication = Authentication.getAuthentication();
    }

    static getAuthService() {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async addNewAccount(account, role_ids = []) {
        const newAccount = await this.accountsRepository.create(account);
        const accounstRoles = role_ids.map((roleId) => ({
            account_id: newAccount,
            role_id: roleId,
        }));
        await this.accountsRepository.createAccountsRoles(accounstRoles);
        return newAccount;
    }

    async getAllAccounts(options) {
        const pagingAndSort = paginate(options);
        const countAccounts = this.accountsRepository.count();
        const accounts = this.accountsRepository.findAll(pagingAndSort);
        return Promise.all([countAccounts, accounts]).then((results) => {
            const [counts, data] = results;
            const totalPages = Math.ceil(counts[0].count / pagingAndSort.limit);
            return Promise.resolve({
                accounts: data,
                totalPages,
                limit: pagingAndSort.limit,
                page: pagingAndSort.page,
                totalAccounts: counts[0].count,
            });
        });
    }

    async findOneByAccountIdAndStatus(accountId, status) {
        const account = await this.accountsRepository.getBy({ account_id: accountId, status });
        return account;
    }

    async findOneByAccountId(accountId) {
        const account = await this.accountsRepository.getBy({ account_id: accountId });
        return account;
    }

    async findByUsernameOrEmail(payload) {
        const account = await this.accountsRepository.findByUsernameOrEmail(payload);
        return account;
    }

    async findByUsername(username) {
        const account = await this.accountsRepository.findByUsername(username);
        return account;
    }

    async findByEmail(email) {
        const account = await this.accountsRepository.findByEmail(email);
        return account;
    }

    async updateAccount(accountId, accountBody) {
        const accountUpdate = await this.accountsRepository.update(
            { account_id: accountId },
            { ...accountBody },
        );
        return accountUpdate;
    }

    async deleteOne(accountId) {
        const result = await this.accountsRepository.deleteOne(accountId);
        return result;
    }

    async generateAuthTokens(accountId) {
        const accessToken = this.authentication.generateToken({ account_id: accountId });
        const refreshToken = this.authentication.generateToken({ account_id: accountId });
        await this.saveOrUpdateRefreshToken(accountId, refreshToken);
        return accessToken;
    }

    async saveOrUpdateRefreshToken(accountId, refreshToken) {
        const authIdentity = await this.accountsRepository.findOneAuthIdentitiesBy({
            account_id: accountId,
        });
        if (authIdentity) {
            await this.accountsRepository.updateAuthIdentities(
                { account_id: accountId },
                { refresh_token: refreshToken },
            );
        } else {
            await this.accountsRepository.createAuthIdentities({
                account_id: accountId,
                refresh_token: refreshToken,
            });
        }
    }

    async refreshAuthTokens(accessToken) {
        const decoded = await this.authentication.verifyToken(accessToken);
        const authIdentity = await this.accountsRepository.findOneAuthIdentitiesBy({
            account_id: decoded.account_id,
        });
        if (!authIdentity) {
            throw new Unauthorized(UNAUTHORIZED);
        }
        const refreshToken = this.authentication.generateToken({
            accountId: authIdentity.account_id,
        });
        await this.accountsRepository.updateAuthIdentities(
            { account_id: authIdentity.account_id },
            { refresh_token: refreshToken },
        );
        return authIdentity.refresh_token;
    }

    async resetPassword(token, password) {
        const decoded = await this.authentication.verifyToken(token);
        const account = await this.accountsRepository.findByEmail(decoded.email);
        if (!account) {
            throw new NotFoundError(ACCOUNT_NOT_FOUND);
        }
        const authIdentity = await this.accountsRepository.findOneAuthIdentitiesBy(
            { password_reset_token: token },
            { account_id: account.account_id },
        );
        if (!authIdentity) {
            throw new BadRequest(INVALID_CREDENTIALS);
        }
        const hash = await bcrypt.hash(password, 12);
        await this.accountsRepository.update({ email: account.email }, { password: hash });
    }

    async saveTokenResetPassword(email, token) {
        const account = await this.accountsRepository.findByEmail(email);
        if (!account) {
            throw new NotFoundError(ACCOUNT_NOT_FOUND);
        }
        await this.accountsRepository.updateAuthIdentities(
            { account_id: account.account_id },
            { password_reset_token: token },
        );
    }

    async saveTokenVerifyEmail(email, token) {
        const account = await this.accountsRepository.findByEmail(email);
        if (!account) {
            throw new NotFoundError(ACCOUNT_NOT_FOUND);
        }
        await this.accountsRepository.updateAuthIdentities(
            { account_id: account.account_id },
            { email_verification_token: token },
        );
    }

    async createTokenVerifyEMail(accountId, token) {
        await this.accountsRepository.createAuthIdentities({
            account_id: accountId,
            email_verification_token: token,
        });
    }

    async verifyEmail(token) {
        const decoded = await this.authentication.verifyToken(token);
        const account = await this.accountsRepository.findByEmail(decoded.email);
        if (!account) {
            throw new NotFoundError(ACCOUNT_NOT_FOUND);
        }
        const authIdentity = await this.accountsRepository.findOneAuthIdentitiesBy({
            email_verification_token: token,
            account_id: account.account_id,
        });
        if (!authIdentity) {
            throw new BadRequest(INVALID_CREDENTIALS);
        }
        await this.accountsRepository.update(
            { account_id: account.account_id },
            { status: 1 },
        );
    }
}

export default AuthService;
