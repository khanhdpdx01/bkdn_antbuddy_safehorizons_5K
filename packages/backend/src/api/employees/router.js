import EmployeesController from './EmployeesController';
import { routerGroup } from '../../common/helpers/routerGroup';
import ValidationHelper from '../../common/filters/validation';
import catchAsync from '../../utils/catchAsync';

const employeesController = new EmployeesController();

export default routerGroup({
        name: 'employees',
        prefix: '/employees',
    }, [
    {
        method: 'GET',
        path: '/',
        handlers: [catchAsync(employeesController.callMethod('getAllEmployees'))],
    }, {
        method: 'GET',
        path: '/:employeeId',
        handlers: [catchAsync(employeesController.callMethod('getOneEmployee'))],
    }, {
        method: 'POST',
        path: '/',
        handlers: [catchAsync(employeesController.callMethod('createEmployee'))],
    }, {
        method: 'PUT',
        path: '/:employeeId',
        handlers: [catchAsync(employeesController.callMethod('updateEmployee'))],
    }, {
        method: 'DELETE',
        path: '/:employeeId',
        handlers: [catchAsync(employeesController.callMethod('deleteOneEmployee'))],
    },
]);
