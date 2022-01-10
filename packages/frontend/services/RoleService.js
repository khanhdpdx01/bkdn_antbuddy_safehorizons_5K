import Service from './Service';

class RoleService {
    constructor(callback) {
        this.callback = callback;
    }

    async getRoles(params) {
        try {
            const roles = await Service.get('/roles', { params });
            return roles.data;
        } catch (err) {
            return ({ error: JSON.stringify(err) });
        }
    }

    async getRoleByRoleId(roleId) {
        try {
            const category = await Service.get(`/roles/${roleId}`);
            return category.data;
        } catch (err) {
            return ({ error: JSON.stringify(err) });
        }
    }
}
export default new RoleService();