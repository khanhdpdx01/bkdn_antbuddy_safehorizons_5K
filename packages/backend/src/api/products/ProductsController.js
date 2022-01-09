import BaseController from '../../infrastructure/Controllers/BaseController';
import Service from './ProductsService';
import {
    NotFoundError,
} from '../../errors/index';
import {
    PRODUCT_NOT_FOUND,
} from '../../constants/HttpMessage';

class ProductController extends BaseController {
    constructor() {
        super();
        this.productService = Service.getProductsService();
    }

    static getProductsController() {
        if (!ProductController.instance) {
            ProductController.instance = new ProductController();
        }
        return ProductController.instance;
    }

    async getAllProducts(req, res) {
        const {
            sortBy, limit, page,
        } = req.query;
        const products = await this.productService.getAllProducts({
            sortBy, limit, page,
        });

        return res.status(200).json({ products });
    }

    async getProduct(req, res, next) {
        try {
            const product = await this.productService.findOneByProductId(req.params.productId);
            if (!product) {
                throw new NotFoundError(PRODUCT_NOT_FOUND);
            }

            return res.status(200).json({ product });
        } catch (err) {
            return next(err);
        }
    }

    async createProduct(req, res, next) {
        try {
            const product = await this.productService.addNewProduct(req.body);
            return res.status(201).json({ product });
        } catch (err) {
            next(err);
        }
    }

    async updateProduct(req, res, next) {
        try {
            const { productId } = req.params;
            const product = await this.productService.findOneByProductId(productId);
            if (!product) {
                throw new NotFoundError(PRODUCT_NOT_FOUND);
            }

            const productUpdate = await this.productService.updateProduct(
                productId, req.body
            );

            return res.status(200).json({ productUpdate });
        } catch (err) {
            next(err);
        }
    }

    async deleteOneProduct(req, res, next) {
        try {
            const result = await this.productService.deleteOne(req.params.productId);
            if (result) {
                return res.status(200).json({
                    statusCOde: 200,
                    message: 'Delete product successfully completed',
                });
            }

            throw new NotFoundError(PRODUCT_NOT_FOUND);
        } catch (err) {
            next(err);
        }
    }
}
export default ProductController;
