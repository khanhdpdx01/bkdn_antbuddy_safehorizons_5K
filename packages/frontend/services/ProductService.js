import Service from './Service';

class ProductService {
    constructor(callback) {
        this.callback = callback;
    }

    async getProducts(params) {
        try {
            const products = await Service.get('/products', { params });
            return products.data;
        } catch (err) {
            console.log(err);
            return ({ error: JSON.stringify(err) });
        }
    }

    async getProductByProductId(productId) {
        try {
            const product = await Service.get(`/products/${productId}`);
            return product.data;
        } catch (err) {
            return ({ error: JSON.stringify(err) });
        }
    }
}
export default new ProductService();