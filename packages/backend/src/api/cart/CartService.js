import Repository from './CartRepository';
import ProductsRepository from '../products/ProductsRepository';
import paginate from '../../utils/paginate';
import {
    BadRequest,
    NotFoundError,
} from '../../errors/index';
import {
    PRODUCT_NOT_ENOUGH,
    CART_ITEM_NOT_FOUND,
} from '../../constants/HttpMessage';

class CartService {
    constructor() {
        this.cartRepository = Repository.getCartRepository();
        this.productRepository = ProductsRepository.getProductsRepository();
    }

    static getCartService() {
        if (!CartService.instance) {
            CartService.instance = new CartService();
        }
        return CartService.instance;
    }

    async addNewCart(cart) {
        let newCart = await this.cartRepository.create(cart);
        newCart = await this.findOneByCartId(newCart[0]);
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
        const cart = await this.cartRepository.findByCartId(cartId);
        return cart;
    }

    async updateCart(cartId, cartBody) {
        const cartUpdate = await this.cartRepository.update(
            { cartId },
            { cartBody },
        );
        return cartUpdate;
    }

    async deleteOne(cartId) {
        const result = await this.cartRepository.deleteOne(cartId);
        return result;
    }

    async findCartBySessionIdOrCustomerId(sessionIdOrCustomerId) {
        const result = await this.cartRepository.findCartBySessionIdOrCustomerId(
            sessionIdOrCustomerId,
        );
        return result;
    }

    async mergeGuestCartToCustomerCart(guestCartId, customerCartId) {
        await this.cartRepository.updateCartItem({
            cart_id: guestCartId,
        }, {
            cart_id: customerCartId,
        });

        await this.cartRepository.deleteOne(guestCartId);
    }

    async findCartItems(cartId, productId) {
        const cartItem = await this.cartRepository.findCartItems(cartId, productId);
        return cartItem;
    }

    async addProductToCart(cartId, cartItemBody) {
        const cartItem = await this.cartRepository.findCartItems(cartId, cartItemBody.product_id);
        const product = await this.productRepository.getBy({ product_id: cartItemBody.product_id });

        if (cartItemBody.product_id > product.quantity) {
            throw new BadRequest(PRODUCT_NOT_ENOUGH);
        } else if (!cartItem) {
                await this.cartRepository.insertCartItem({
                    cart_id: cartId,
                    product_id: cartItemBody.product_id,
                    quantity: cartItemBody.quantity,
                    price: product.price,
                    discount: product.discount,
                });
            } else {
                cartItem.quantity += cartItemBody.quantity;
                await this.cartRepository.updateCartItem({
                    cart_id: cartId, product_id: cartItemBody.product_id,
                }, {
                    quantity: cartItem.quantity,
                    price: product.price,
                    discount: product.discount,
                });
            }
    }

    async decreaseProductQuantity(cartId, cartItemBody) {
        const cartItem = await this.cartRepository.findCartItems(cartId, cartItemBody.product_id);
        if (!cartItem) {
            throw new NotFoundError(CART_ITEM_NOT_FOUND);
        }

        const quantity = cartItem.quantity - cartItemBody.quantity;
        if (quantity < 0) {
            throw new BadRequest(PRODUCT_NOT_ENOUGH);
        } else if (quantity > 0) {
            await this.cartRepository.updateCartItem({
                cart_id: cartId, product_id: cartItemBody.product_id,
            }, {
                quantity,
            });
        } else {
            await this.cartRepository.deleteCartItem({
                cart_id: cartId,
                product_id: cartItemBody.product_id,
            });
        }
    }

    async deleteCartItem(cartId, productId) {
        const result = await this.cartRepository.deleteCartItem({
            cart_id: cartId,
            product_id: productId,
        });
        return result;
    }
}

export default CartService;
