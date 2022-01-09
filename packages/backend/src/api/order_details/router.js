import OrdersController from './OrdersController';
import { routerGroup } from '../../common/helpers/routerGroup';

const ordersController = new OrdersController();

export default routerGroup({
        name: 'order_details',
        prefix: '/order-details',
    }, [
    {
        method: 'GET',
        path: '/',
        handlers: [ordersController.callMethod('getAllOrders')],
    }, {
        method: 'GET',
        path: '/:orderId',
        handlers: [ordersController.callMethod('getOrder')],
    }, {
        method: 'POST',
        path: '/',
        handlers: [ordersController.callMethod('createOrder')],
    }, {
        method: 'PUT',
        path: '/:orderId',
        handlers: [ordersController.callMethod('updateOrder')],
    }, {
        method: 'DELETE',
        path: '/:orderId',
        handlers: [ordersController.callMethod('deleteOneOrder')],
    },
]);
