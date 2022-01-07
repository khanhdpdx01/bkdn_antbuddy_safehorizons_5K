import CartController from './CartController';
import { routerGroup } from '../../common/helpers/routerGroup';

const ordersController = new CartController();

export default routerGroup({
        name: 'cart',
        prefix: '/cart',
    }, [
    {
        method: 'GET',
        path: '/',
        handlers: [ordersController.callMethod('getAllCart')],
    }, {
        method: 'GET',
        path: '/:cartId',
        handlers: [ordersController.callMethod('getCart')],
    }, {
        method: 'POST',
        path: '/',
        handlers: [ordersController.callMethod('createCart')],
    }, {
        method: 'PUT',
        path: '/:cartId',
        handlers: [ordersController.callMethod('updateCart')],
    }, {
        method: 'DELETE',
        path: '/:cartId',
        handlers: [ordersController.callMethod('deleteOneCart')],
    },
]);
