import ProductsController from './ProductsController';
import { routerGroup } from '../../common/helpers/routerGroup';

const productsController = new ProductsController();

export default routerGroup({
        name: 'products',
        prefix: '/products',
    }, [
    {
        method: 'GET',
        path: '/',
        handlers: [productsController.callMethod('getAllProducts')],
    }, {
        method: 'GET',
        path: '/:productId',
        handlers: [productsController.callMethod('getProduct')],
    }, {
        method: 'POST',
        path: '/',
        handlers: [productsController.callMethod('createProduct')],
    }, {
        method: 'PUT',
        path: '/:productId',
        handlers: [productsController.callMethod('updateProduct')],
    }, {
        method: 'DELETE',
        path: '/:productId',
        handlers: [productsController.callMethod('deleteOneProduct')],
    },
]);
