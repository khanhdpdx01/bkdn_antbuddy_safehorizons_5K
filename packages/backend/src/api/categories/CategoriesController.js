import BaseController from '../../infrastructure/Controllers/BaseController';
import Service from './CategoriesService';
import {
    NotFoundError,
} from '../../errors/index';
import {
    CUSTOMER_NOT_FOUND,
} from '../../constants/HttpMessage';

class CategoriesController extends BaseController {
    constructor() {
        super();
        this.categoriesService = Service.getCategoriesService();
    }

    static getProductsController() {
        if (!CategoriesController.instance) {
            CategoriesController.instance = new CategoriesController();
        }
        return CategoriesController.instance;
    }

    async getAllCategories(req, res) {
        const {
            sortBy, limit, page,
        } = req.query;
        const categories = await this.categoriesService.getAllCategories({
            sortBy, limit, page,
        });
        return res.status(200).json({ categories });
    }

    async getOneCategory(req, res) {
        const category = await this.categoriesService.findOneByCategoryId(req.params.productId);
        if (!category) {
            throw new NotFoundError(CUSTOMER_NOT_FOUND);
        }

        return res.status(200).json({ category });
    }

    async createCategory(req, res) {
        const category = await this.categoriesService.addNewCategory(req.body);
        return res.status(201).json({ category });
    }

    async updateCategory(req, res) {
        const { categoryId } = req.params;
        const product = await this.categoriesService.findOneByCategoryId(categoryId);
        if (product) {
            throw new NotFoundError(CUSTOMER_NOT_FOUND);
        }

        const categoryUpdate = await this.categoriesService.updateCategory(
            categoryId,
            req.body,
        );

        return res.status(200).json({ categoryUpdate });
    }

    async deleteOneCategory(req, res) {
        const result = await this.categoriesService.deleteOne(req.params.categoryId);
        if (result) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Delete product successfully completed',
            });
        }

        throw new NotFoundError(CUSTOMER_NOT_FOUND);
    }
}
export default CategoriesController;
