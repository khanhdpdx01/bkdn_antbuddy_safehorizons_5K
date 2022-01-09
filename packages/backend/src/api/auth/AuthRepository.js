import knex from '../../config/connection';
import BaseRepository from '../../infrastructure/Repositories/BaseRepository';

class AuthRepository extends BaseRepository {
    static getAuthRepository() {
        if (!AuthRepository.instance) {
            AuthRepository.instance = new AuthRepository();
        }
        return AuthRepository.instance;
    }

    getTableName() {
        return 'accounts';
    }

    findAll(pagingAndSort) {
        return this.listByPagingAndSort(pagingAndSort);
    }

    findByAccountId(accountId) {
        return this.getBy({ account_id: accountId });
    }

    findByEmail(email) {
        return this.getBy({ email });
    }

    findByUsername(username) {
        return this.getBy({ username });
    }

    findByUsernameOrEmail(username, columns = ['*']) {
        return knex('accounts').select(columns)
            .where({ username })
            .orWhere({ email: username })
            .innerJoin('accounts_roles', 'accounts.account_id', 'accounts_roles.account_id')
            .innerJoin('roles', 'accounts_roles.role_id', 'roles.role_id');
    }

    deleteOne(customerId) {
        return this.delete({ customer_id: customerId });
    }

    createAccountsRoles(attributes, returning = ['*']) {
        return knex('accounts_roles').insert(attributes).returning(returning);
    }

    findOneAuthIdentitiesBy(clauses = {}, columns = ['*']) {
        return knex('auth_identities').where(clauses).select(columns).first();
    }

    updateAuthIdentities(clauses = {}, attributes = {}, returning = ['*']) {
        return knex('auth_identities').where(clauses).update(attributes).returning(returning);
    }

    createAuthIdentities(attributes = {}, returning = ['*']) {
        return knex('auth_identities').insert(attributes).returning(returning);
    }
}

export default AuthRepository;
