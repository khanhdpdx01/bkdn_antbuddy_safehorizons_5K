import Repository from './ProductsRepository';
import paginate from '../../utils/paginate';

class ProductsService {
    constructor() {
        this.productRepository = Repository.getProductsRepository();
    }

    static getProductsService() {
        if (!ProductsService.instance) {
            ProductsService.instance = new ProductsService();
        }
        return ProductsService.instance;
    }

    async addNewProduct(product) {
        const newProduct = await this.productRepository.create(product);
        return newProduct;
    }

    async getAllProducts(options, categoryId) {
        const pagingAndSort = paginate(options);
        const countProducts = categoryId ? this.productRepository
            .countBy({ category_id: categoryId })
            : this.productRepository.count();
        const products = this.productRepository.findAll(pagingAndSort, categoryId);
        return Promise.all([countProducts, products]).then((results) => {
            const [counts, data] = results;
            const totalPages = Math.ceil(counts[0].count / pagingAndSort.limit);
            return Promise.resolve({
                products: data,
                totalPages,
                limit: pagingAndSort.limit,
                page: pagingAndSort.page,
                totalProducts: counts[0].count,
            });
        });
    }

    async findOneByProductId(productId) {
        const product = await this.productRepository.getBy({ product_id: productId });
        return product;
    }

    async updateProduct(productId, productBody) {
        const productUpdate = await this.productRepository.update(
            { product_id: productId },
            productBody,
        );
        return productUpdate;
    }

    async deleteOne(productId) {
        const result = await this.productRepository.deleteOne(productId);
        return result;
    }
}

export default ProductsService;
