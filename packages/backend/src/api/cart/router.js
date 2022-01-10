import CartController from './CartController';
import { routerGroup } from '../../common/helpers/routerGroup';

const cartController = new CartController();

export default routerGroup({
        name: 'cart',
        prefix: '/cart',
    }, [
    {
        method: 'GET',
        path: '/all',
        handlers: [cartController.callMethod('getAllCart')],
    }, {
        method: 'GET',
        path: '/',
        handlers: [cartController.callMethod('getCart')],
    }, {
        method: 'POST',
        path: '/',
        handlers: [cartController.callMethod('addProductToCart')],
    }, {
        method: 'PATCH',
        path: '/',
        handlers: [cartController.callMethod('decreaseProductQuantity')],
    }, {
        method: 'PUT',
        path: '/',
        handlers: [cartController.callMethod('updateCart')],
    }, {
        method: 'DELETE',
        path: '/',
        handlers: [cartController.callMethod('deleteCartItem')],
    },
]);
