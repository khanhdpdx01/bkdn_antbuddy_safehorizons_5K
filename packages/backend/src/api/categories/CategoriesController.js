import BaseController from '../../infrastructure/Controllers/BaseController';
import Service from './CategoriesService';
import {
    NotFoundError,
} from '../../errors/index';
import {
    CATEGORY_NOT_FOUND,
} from '../../constants/HttpMessage';

class CategoriesController extends BaseController {
    constructor() {
        super();
        this.categoriesService = Service.getCategoriesService();
    }

    static getCategoriesController() {
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

    async getCategory(req, res, next) {
        try {
            const category = await this.categoriesService.getBy({ id: req.params.categoryId });
            if (!category) {
                throw new NotFoundError(CATEGORY_NOT_FOUND);
            }

            return res.status(200).json({ category });
        } catch (err) {
            return next(err);
        }
    }

    async createCategory(req, res, next) {
        try {
            const category = await this.categoriesService.addNewCategory(req.body);
            return res.status(201).json({ category });
        } catch (err) {
            next(err);
        }
    }

    async updateCategory(req, res, next) {
        try {
            const { categoryId } = req.params;
            const category = await this.categoriesService.findOneByCategoryId(categoryId);
            if (category) {
                throw new NotFoundError(CATEGORY_NOT_FOUND);
            }

            const categoryUpdate = await this.categoriesService.updateCategory(
                categoryId,
                {
                    product_name: req.body.product_name,
                    supplier_id: req.body.supplier_id,
                    category_id: req.body.category_id,
                    unit: req.body.unit,
                    price: req.body.price,
                    quantity: req.body.quantity,
                    discount: req.body.discount,
                },
            );

            return res.status(200).json({ updateCategory });
        } catch (err) {
            next(err);
        }
    }

    async deleteOneCategory(req, res, next) {
        try {
            const result = await this.categoriesService.deleteOne(req.params.categoryId);
            if (result) {
                return res.status(200).json({
                    statusCOde: 200,
                    message: 'Delete category successfully completed',
                });
            }

            throw new NotFoundError(CATEGORY_NOT_FOUND);
        } catch (err) {
            next(err);
        }
    }
}
export default CategoriesController;
