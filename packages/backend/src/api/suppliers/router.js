import SuppliersController from './SuppliersController';
import { routerGroup } from '../../common/helpers/routerGroup';
import ValidationHelper from '../../common/filters/validation';
import catchAsync from '../../utils/catchAsync';

const suppliersController = new SuppliersController();

export default routerGroup({
        name: 'suppliers',
        prefix: '/suppliers',
    }, [
    {
        method: 'GET',
        path: '/',
        handlers: [catchAsync(suppliersController.callMethod('getAllSuppliers'))],
    }, {
        method: 'GET',
        path: '/:supplierId',
        handlers: [catchAsync(suppliersController.callMethod('getOneSupplier'))],
    }, {
        method: 'POST',
        path: '/',
        handlers: [catchAsync(suppliersController.callMethod('createSupplier'))],
    }, {
        method: 'PUT',
        path: '/:supplierId',
        handlers: [catchAsync(suppliersController.callMethod('updateSupplier'))],
    }, {
        method: 'DELETE',
        path: '/:supplierId',
        handlers: [catchAsync(suppliersController.callMethod('deleteOneSupplier'))],
    },
]);
