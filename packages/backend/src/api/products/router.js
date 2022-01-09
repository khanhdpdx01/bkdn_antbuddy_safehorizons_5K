import multer from 'multer';
import ProductsController from './ProductsController';
import { routerGroup } from '../../common/helpers/routerGroup';

const productsController = new ProductsController();
// const storage = multer.memoryStorage({
//     destination(req, file, callback) {
//         callback(null, 'uploads/');
//     },
// });
// const multipleUpload = multer({ storage }).array('file');
const distStorage = multer({ dest: 'uploads/' });
const multipleUpload = distStorage.array('file');

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
        handlers: [multipleUpload, productsController.callMethod('createProduct')],
    }, {
        method: 'PUT',
        path: '/:productId',
        handlers: [productsController.callMethod('updateProduct')],
    }, {
        method: 'DELETE',
        path: '/:productId',
        handlers: [productsController.callMethod('deleteOneProduct')],
    }, {
        method: 'GET',
        path: '/images/:key',
        handlers: [productsController.callMethod('getImage')],
    },
]);
