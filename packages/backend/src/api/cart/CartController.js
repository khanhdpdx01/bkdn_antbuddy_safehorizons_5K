import BaseController from '../../infrastructure/Controllers/BaseController';
import Authentication from '../../common/guards/authentication';
import CustomersService from '../customers/CustomersService';
import CartService from './CartService';
import {
    NotFoundError,
} from '../../errors/index';
import {
    CART_NOT_FOUND,
} from '../../constants/HttpMessage';

class CartController extends BaseController {
    constructor() {
        super();
        this.cartService = CartService.getCartService();
        this.authentication = Authentication.getAuthentication();
        this.customerService = CustomersService.getCustomersService();
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

    /* 
        Truong hop: chua login va gio hang chua ton tai
            + Tao moi gio hang
            + Them cart item
        Truong hop: chua login va gio hang da ton tai
            + Them moi cart item
            + Cap nhat cart item (cap nhat so luong)
            + Xoa cart item
        Truong hop: da login va gio hang chua ton tai
            + Tao moi gio hang
            + Them cart item
        Truong hop: da login va gio hang da ton tai
            + Cap nhat cart item
            + Xoa cart item
        Truong hop: chua login, gio hang da ton tai ---> login
            + Kiem tra cart bang sessionId
            + Neu cart ton tai thi xoa card cu ---> update cart item
    */
    async addProductToCart(req, res, next) { 
        const accessToken = req.signedCookies.access_token;
        const sessionId = req.sessionID;
        let cart;
        
        if(!accessToken) {
            cart = await this.cartService.findCartBySessionIdOrCustomerId(sessionId);
            console.log(cart)
            if(!cart) {
                cart = await this.cartService.addNewCart({session_id: sessionId});
            } 
         
        } else {
            const decoded = await this.authentication.verifyToken(accessToken);
            const customer = await this.customerService.findOneByAccountId(decoded.account_id);
            cart = await this.cartService.findCartBySessionIdOrCustomerId(customer.customer_id);
            
            if(!cart) {
                cart = await this.cartService.addNewCart({customer_id: customer.customer_id});
            } 

        }
       
        await this.cartService.addProductToCart(cart.cart_id, req.body);
        const updatedCartItem = await this.cartService.findCartItems(cart.cart_id, req.body.product_id);

        return res.status(201).json({ updatedCartItem });
    } 

    async deleteProductFromCart(req, res, next) {

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
