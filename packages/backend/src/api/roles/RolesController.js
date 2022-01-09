import BaseController from '../../infrastructure/Controllers/BaseController';
import Service from './RolesService';
import {
    NotFoundError,
} from '../../errors/index';
import {
    ROLE_NOT_FOUND,
} from '../../constants/HttpMessage';

class RolesController extends BaseController {
    constructor() {
        super();
        this.rolesService = Service.getRolesService();
    }

    static getRolesController() {
        if (!RolesController.instance) {
            RolesController.instance = new RolesController();
        }
        return RolesController.instance;
    }

    async getAllRoles(req, res) {
        const {
            sortBy, limit, page,
        } = req.query;
        const roles = await this.rolesService.getAllRoles({
            sortBy, limit, page,
        });
        return res.status(200).json({ roles });
    }

    async getOneRole(req, res, next) {
        try {
            const role = await this.rolesService
                .findOneByRoleId(req.params.roleId);
            if (!role) {
                throw new NotFoundError(ROLE_NOT_FOUND);
            }

            return res.status(200).json({ role });
        } catch (err) {
            return next(err);
        }
    }

    async createRole(req, res, next) {
        try {
            const role = await this.rolesService.addNewRole(req.body);
            return res.status(201).json({ role });
        } catch (err) {
            next(err);
        }
    }

    async updateRole(req, res, next) {
        try {
            const { roleId } = req.params;
            const role = await this.rolesService.findOneByRoleId(roleId);
            if (!role) {
                throw new NotFoundError(ROLE_NOT_FOUND);
            }

            const customerUpdate = await this.rolesService.updateRole(
                roleId,
                {
                    role_name: req.body.role_name,
                },
            );

            return res.status(200).json({ customerUpdate });
        } catch (err) {
            next(err);
        }
    }

    async deleteOneRole(req, res, next) {
        try {
            const result = await this.rolesService.deleteOne(req.params.roleId);
            if (result) {
                return res.status(200).json({
                    statusCode: 200,
                    message: 'Delete role successfully completed',
                });
            }

            throw new NotFoundError(ROLE_NOT_FOUND);
        } catch (err) {
            next(err);
        }
    }
}
export default RolesController;
