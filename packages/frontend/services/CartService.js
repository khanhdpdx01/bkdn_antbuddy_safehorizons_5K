import Service from './Service';

class CartService {
    constructor(callback) {
        this.callback = callback;
    }

    async addProductToCart(product) {
        try {
            const cartItem = await Service.post('/cart', JSON.stringify(product));
            return cartItem.data;
        } catch (err) {
            return ({ error: JSON.stringify(err) });
        }
    }

    async descreaseQuantityProduct(product) {
        try {
            const cartItem = await Service.patch('/cart', JSON.stringify(product));
            return cartItem.data;
        } catch (err) {
            return ({ error: JSON.stringify(err) });
        }
    }
}
export default new CartService();