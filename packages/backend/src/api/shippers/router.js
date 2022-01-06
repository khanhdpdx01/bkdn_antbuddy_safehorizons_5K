import ShippersController from './ShipperController';
import { routerGroup } from '../../common/helpers/routerGroup';
import ValidationHelper from '../../common/filters/validation';
import catchAsync from '../../utils/catchAsync';

const shippersController = new ShippersController();

export default routerGroup({
        name: 'shippers',
        prefix: '/shippers',
    }, [
    {
        method: 'GET',
        path: '/',
        handlers: [catchAsync(shippersController.callMethod('getAllShippers'))],
    }, {
        method: 'GET',
        path: '/:shipperId',
        handlers: [catchAsync(shippersController.callMethod('getOneShipper'))],
    }, {
        method: 'POST',
        path: '/',
        handlers: [catchAsync(shippersController.callMethod('createShipper'))],
    }, {
        method: 'PUT',
        path: '/:shipperId',
        handlers: [catchAsync(shippersController.callMethod('updateShipper'))],
    }, {
        method: 'DELETE',
        path: '/:shipperId',
        handlers: [catchAsync(shippersController.callMethod('deleteOneShipper'))],
    },
]);
