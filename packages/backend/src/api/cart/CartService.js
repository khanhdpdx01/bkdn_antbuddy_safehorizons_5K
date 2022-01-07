import Repository from './CartRepository';
import paginate from '../../utils/paginate';

class CartService {
    constructor() {
        this.cartRepository = Repository.getCartRepository();
    }

    static getCartService() {
        if (!CartService.instance) {
            CartService.instance = new CartService();
        }
        return CartService.instance;
    }

    async addNewCart(cart) {
        const newCart = await this.cartRepository.create(cart);
        return newCart;
    }

    async getAllCart(options) {
        const pagingAndSort = paginate(options);
        const countCart = this.cartRepository.count();
        const cart = this.cartRepository.findAll(pagingAndSort);
        return Promise.all([countCart, cart]).then((results) => {
            const [counts, data] = results;
            const totalPages = Math.ceil(counts[0].count / pagingAndSort.limit);
            return Promise.resolve({
                cart: data,
                totalPages,
                limit: pagingAndSort.limit,
                page: pagingAndSort.page,
                totalCart: counts[0].count,
            });
        });
    }

    async findOneByCartId(cartId) {
        const cart = await this.cartRepository.getBy({ cart_id: cartId });
        return cart;
    }

    async updateCart(cartId, cartBody) {
        const cartUpdate = await this.cartRepository.update(
            { cartId: cartId },
            { cartBody },
        );
        return cartUpdate;
    }

    async deleteOne(cartId) {
        const result = await this.cartRepository.deleteOne(cartId);
        return result;
    }
}

export default CartService;
