import Repository from './RolesRepository';
import paginate from '../../utils/paginate';

class RolesService {
    constructor() {
        this.rolesRepository = Repository.getRolesRepository();
    }

    static getRolesService() {
        if (!RolesService.instance) {
            RolesService.instance = new RolesService();
        }
        return RolesService.instance;
    }

    async addNewRole(role) {
        const newRole = await this.rolesRepository.create(role);
        return newRole;
    }

    async getAllRoles(options) {
        const pagingAndSort = paginate(options);
        const countRoles = this.rolesRepository.count();
        const roles = this.rolesRepository.findAll(pagingAndSort);
        return Promise.all([countRoles, roles]).then((results) => {
            const [counts, data] = results;
            const totalPages = Math.ceil(counts[0].count / pagingAndSort.limit);
            return Promise.resolve({
                roles: data,
                totalPages,
                limit: pagingAndSort.limit,
                page: pagingAndSort.page,
                totalRoles: counts[0].count,
            });
        });
    }

    async findOneByRoleId(roleId) {
        const role = await this.rolesRepository.findByRoleId(roleId);
        return role;
    }

    async findOneByRoleName(roleName) {
        const role = await this.rolesRepository.findByRoleName(roleName);
        return role;
    }

    async updateRole(roleId, roleBody) {
        const roleUpdate = await this.rolesRepository.update(
            { role_id: roleId },
            { ...roleBody },
        );
        return roleUpdate;
    }

    async deleteOne(roleId) {
        const result = await this.rolesRepository.deleteOne(roleId);
        return result;
    }
}

export default RolesService;
