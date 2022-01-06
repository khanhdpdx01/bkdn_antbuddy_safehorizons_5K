import RolesController from './RolesController';
import { routerGroup } from '../../common/helpers/routerGroup';
import ValidationHelper from '../../common/filters/validation';

const rolesController = new RolesController();

export default routerGroup({
        name: 'roles',
        prefix: '/roles',
    }, [
    {
        method: 'GET',
        path: '/',
        handlers: [rolesController.callMethod('getAllRoles')],
    }, {
        method: 'GET',
        path: '/:roleId',
        handlers: [rolesController.callMethod('getOneRole')],
    }, {
        method: 'POST',
        path: '/',
        handlers: [rolesController.callMethod('createRole')],
    }, {
        method: 'PUT',
        path: '/:roleId',
        handlers: [rolesController.callMethod('updateRole')],
    }, {
        method: 'DELETE',
        path: '/:roleId',
        handlers: [rolesController.callMethod('deleteOneRole')],
    },
]);
