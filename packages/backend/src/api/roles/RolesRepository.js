import BaseRepository from '../../infrastructure/Repositories/BaseRepository';

class RolesRepository extends BaseRepository {
    static getRolesRepository() {
        if (!RolesRepository.instance) {
            RolesRepository.instance = new RolesRepository();
        }
        return RolesRepository.instance;
    }

    getTableName() {
        return 'roles';
    }

    findAll(pagingAndSort) {
        return this.listByPagingAndSort(pagingAndSort);
    }

    findByRoleId(roleId) {
        return this.getBy({ role_id: roleId });
    }

    findByRoleName(roleName) {
        return this.getBy({ role_name: roleName });
    }

    deleteOne(roleId) {
        return this.delete({ role_id: roleId });
    }
}

export default RolesRepository;
