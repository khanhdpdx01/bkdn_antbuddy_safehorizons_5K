import BaseController from '../../infrastructure/Controllers/BaseController';
import Service from './ProductsService';
import { uploadFile, getFile } from '../../utils/s3';
import {
    NotFoundError,
} from '../../errors/index';
import {
    PRODUCT_NOT_FOUND,
} from '../../constants/HttpMessage';

require('dotenv').config({ path: `${__dirname}/../../.env` });

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

    mapModifyProduct(product) {
        if (JSON.parse(product.images) instanceof Array) {
            const images = JSON.parse(product.images).map((image) => `${process.env.URL_ENDPOINT_API}/products/images/${image}`);
            return {
                ...product,
                images,
                thumbnail: `${process.env.URL_ENDPOINT_API}/products/images/${product.thumbnail}`,
            };
        }

        return {
            ...product,
            thumbnail: `${process.env.URL_ENDPOINT_API}/products/images/${product.thumbnail}`,
        };
    }

    async getAllProducts(req, res) {
        const {
            sortBy, limit, page,
        } = req.query;
        const data = await this.productService.getAllProducts({
            sortBy, limit, page,
        });

        const responseData = data.products.map((product) => this.mapModifyProduct(product));

        return res.status(200).json({ data: responseData });
    }

    async getProduct(req, res, next) {
        try {
            const product = await this.productService.findOneByProductId(req.params.productId);
            if (!product) {
                throw new NotFoundError(PRODUCT_NOT_FOUND);
            }
            return res.status(200).json({ product: this.mapModifyProduct(product) });
        } catch (err) {
            return next(err);
        }
    }

    async createProduct(req, res, next) {
        try {
            const files = await uploadFile(req.files);
            const data = {
                ...req.body,
                thumbnail: req.files[0].filename,
                images: JSON.stringify(req.files.map((file) => file.filename)),
            };
            const product = await this.productService.addNewProduct(data);
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
                productId,
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
                    statusCode: 200,
                    message: 'Delete product successfully completed',
                });
            }

            throw new NotFoundError(PRODUCT_NOT_FOUND);
        } catch (err) {
            next(err);
        }
    }

    async getImage(req, res, next) {
        try {
            const readStream = await getFile(req.params.key);
            return readStream.pipe(res);
        } catch (err) {
            next(err);
        }
    }
}
export default ProductController;
