import BaseController from '../../infrastructure/Controllers/BaseController';
import Service from './ProductsService';
import {
    NotFoundError,
} from '../../errors/index';
import {
    CUSTOMER_NOT_FOUND,
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
            const product = await this.productService.getBy({ id: req.params.productId });
            if (!product) {
                throw new NotFoundError(CUSTOMER_NOT_FOUND);
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
            const product = await this.productService.findOneByCustomerId(productId);
            if (product) {
                throw new NotFoundError(CUSTOMER_NOT_FOUND);
            }

            const productUpdate = await this.productService.updateProduct(
                productId,
                {
                    company: req.body.company,
                    last_name: req.body.last_name,
                    first_name: req.body.first_name,
                    email_address: req.body.email_address,
                    job_title: req.body.job_title,
                    business_phone: req.body.business_phone,
                    home_phone: req.body.home_phone,
                    mobile_phone: req.body.mobile_phone,
                    fax_number: req.body.fax_number,
                    address: req.body.address,
                    city: req.body.city,
                    state_province: req.body.state_province,
                    zip_postal_code: req.body.zip_postal_code,
                    country_region: req.body.country_region,
                    web_page: req.body.web_page,
                    notes: req.body.notes,
                    attachments: req.body.attachments,
                },
            );

            return res.status(200).json({ updateProduct });
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

            throw new NotFoundError(CUSTOMER_NOT_FOUND);
        } catch (err) {
            next(err);
        }
    }
}
export default ProductController;
