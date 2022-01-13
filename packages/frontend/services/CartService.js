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

    async getCart(cartId) {
        try {
            const cart = await Service.get(`/cart/${cartId}`);
            return cart.data;
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

    async deleteProductFromCart(product) {
        try {
            const response = await Service.delete('/cart', { data: JSON.stringify(product)});
            return response.data;
        } catch (err) {
            return ({ error: JSON.stringify(err) });
        }
    }
}
export default new CartService();