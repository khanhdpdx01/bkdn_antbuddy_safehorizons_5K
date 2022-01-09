import CategoriesController from './CategoriesController';
import { routerGroup } from '../../common/helpers/routerGroup';
import ValidationHelper from '../../common/filters/validation';
import catchAsync from '../../utils/catchAsync';

const categoriesController = new CategoriesController();

export default routerGroup({
        name: 'categories',
        prefix: '/categories',
    }, [
    {
        method: 'GET',
        path: '/',
        handlers: [catchAsync(categoriesController.callMethod('getAllCategories'))],
    }, {
        method: 'GET',
        path: '/:categoryId',
        handlers: [catchAsync(categoriesController.callMethod('getOneCategory'))],
    }, {
        method: 'POST',
        path: '/',
        handlers: [catchAsync(categoriesController.callMethod('createCategory'))],
    }, {
        method: 'PUT',
        path: '/:categoryId',
        handlers: [catchAsync(categoriesController.callMethod('updateCategory'))],
    }, {
        method: 'DELETE',
        path: '/:categoryId',
        handlers: [catchAsync(categoriesController.callMethod('deleteOneCategory'))],
    },
]);
