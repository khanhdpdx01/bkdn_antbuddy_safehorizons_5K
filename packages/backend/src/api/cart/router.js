import CartController from './CartController';
import { routerGroup } from '../../common/helpers/routerGroup';

const cartController = new CartController();

export default routerGroup({
        name: 'cart',
        prefix: '/cart',
    }, [{
        method: 'POST',
        path: '/test',
        handlers: [cartController.callMethod('addProductToCart')],
    },
    {
        method: 'GET',
        path: '/',
        handlers: [cartController.callMethod('getAllCart')],
    }, {
        method: 'GET',
        path: '/:cartId',
        handlers: [cartController.callMethod('getCart')],
    }, {
        method: 'PUT',
        path: '/:cartId',
        handlers: [cartController.callMethod('updateCart')],
    }, {
        method: 'DELETE',
        path: '/:cartId',
        handlers: [cartController.callMethod('deleteOneCart')],
    }
]);
