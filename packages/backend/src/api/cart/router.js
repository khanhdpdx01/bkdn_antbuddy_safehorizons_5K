import CartController from './CartController';
import { routerGroup } from '../../common/helpers/routerGroup';
import catchAsync from '../../utils/catchAsync';

const cartController = new CartController();

export default routerGroup({
        name: 'cart',
        prefix: '/cart',
    }, [
    {
        method: 'GET',
        path: '/all',
        handlers: [catchAsync(cartController.callMethod('getAllCart'))],
    }, {
        method: 'GET',
        path: '/:cartId',
        handlers: [catchAsync(cartController.callMethod('getCart'))],
    }, {
        method: 'POST',
        path: '/',
        handlers: [catchAsync(cartController.callMethod('addProductToCart'))],
    }, {
        method: 'PATCH',
        path: '/',
        handlers: [catchAsync(cartController.callMethod('decreaseProductQuantity'))],
    }, {
        method: 'PUT',
        path: '/',
        handlers: [catchAsync(cartController.callMethod('updateCart'))],
    }, {
        method: 'DELETE',
        path: '/',
        handlers: [(cartController.callMethod('deleteCartItem'))],
    },
]);
