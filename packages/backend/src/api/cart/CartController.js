import BaseController from '../../infrastructure/Controllers/BaseController';
import Service from './CartService';
import {
    NotFoundError,
} from '../../errors/index';
import {
    CART_NOT_FOUND,
} from '../../constants/HttpMessage';

class CartController extends BaseController {
    constructor() {
        super();
        this.cartService = Service.getCartService();
    }

    static getCartController() {
        if (!CartController.instance) {
            CartController.instance = new CartController();
        }
        return CartController.instance;
    }

    async getAllCart(req, res) {
        const {
            sortBy, limit, page,
        } = req.query;
        const cart = await this.cartService.getAllCart({
            sortBy, limit, page,
        });
        return res.status(200).json({ cart });
    }

    async getCart(req, res, next) {
        try {
            const cart = await this.cartService.getBy({ cartId: req.params.cartId });
            if (!cart) {
                throw new NotFoundError(CART_NOT_FOUND);
            }

            return res.status(200).json({ cart });
        } catch (err) {
            return next(err);
        }
    }

    async createCart(req, res, next) {
        try {
            const cart = await this.cartService.addNewCart(req.body);
            return res.status(201).json({ cart });
        } catch (err) {
            next(err);
        }
    }

    async updateCart(req, res, next) {
        try {
            const { cartId } = req.params;
            const cart = await this.cartService.findOneByCustomerId(cartId);
            if (cart) {
                throw new NotFoundError(CART_NOT_FOUND);
            }

            const cartUpdate = await this.cartService.updateCart(
                cartId,
                cartBody,
            );

            return res.status(200).json({ updateCart });
        } catch (err) {
            next(err);
        }
    }

    async deleteOneCart(req, res, next) {
        try {
            const result = await this.cartService.deleteOne(req.params.cartId);
            if (result) {
                return res.status(200).json({
                    statusCOde: 200,
                    message: 'Delete cart successfully completed',
                });
            }

            throw new NotFoundError(CART_NOT_FOUND);
        } catch (err) {
            next(err);
        }
    }
}
export default CartController;
