import CategoriesController from './CategoriesController';
import { routerGroup } from '../../common/helpers/routerGroup';
import ValidationHelper from '../../common/filters/validation';

const categoriesController = new CategoriesController();

export default routerGroup({
        name: 'categories',
        prefix: '/categories',
    }, [
    {
        method: 'GET',
        path: '/',
        handlers: [categoriesController.callMethod('getAllCategories')],
    }, {
        method: 'GET',
        path: '/:categoryId',
        handlers: [categoriesController.callMethod('getCategory')],
    }, {
        method: 'POST',
        path: '/',
        handlers: [categoriesController.callMethod('createCategory')],
    }, {
        method: 'PUT',
        path: '/:categoryId',
        handlers: [categoriesController.callMethod('updateCategory')],
    }, {
        method: 'DELETE',
        path: '/:categoryId',
        handlers: [categoriesController.callMethod('deleteOneCategory')],
    },
]);
