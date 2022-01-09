import BaseRepository from '../../infrastructure/Repositories/BaseRepository';
import knex from '../../config/connection';

class CartRepository extends BaseRepository {
    static getCartRepository() {
        if (!CartRepository.instance) {
            CartRepository.instance = new CartRepository();
        }
        return CartRepository.instance;
    }

    getTableName() {
        return 'cart';
    }

    findAll(pagingAndSort) {
        return this.listByPagingAndSort(pagingAndSort);
    }

    findByCartId(cartId) {
        return this.getBy({ cart_id: cartId });
    }

    deleteOne(cartId) {
        return this.delete({ cart_id: cartId });
    }

    async findCartBySessionIdOrCustomerId(sessionIdOrCustomerId, columns = ['*']) {
        let result;
        if(typeof(sessionIdOrCustomerId) === 'number') {
            result = await knex('cart').select(columns).where({customer_id: sessionIdOrCustomerId}).first();
                                //.innerJoin('cart_items','cart.cart_id','cart_items.cart_id');
        } else {
            result = await knex('cart').select(columns).where({session_id: sessionIdOrCustomerId}).first();
                                // .innerJoin('cart_items','cart.cart_id','cart_items.cart_id');
        }
        
        return result;
    }

    async findCartItems(cartId, productId, columns = ['*']) {
        let result = await knex('cart_items').select(columns)
            .where({ cart_id: cartId, product_id: productId});
 
        return result;
    }

    async addProductToCart(cartId, cartItemBody) {
        let cartItem = await this.findCartItems(cartId, cartItemBody.product_id);
        
        if (cartItem.length === 0) {
            await knex('cart_items').insert({
                cart_id: cartId,
                product_id: cartItemBody.product_id,
                quantity: cartItemBody.quantity
            });
            
        } else {
          
            cartItemBody.quantity += cartItem[0].quantity;
    
            await knex('cart_items').where({ cart_id: cartId, product_id: cartItemBody.product_id })
                .update({ quantity: cartItemBody.quantity});
        }
    }
    
    updateCartItem(cartItem) {
        
    }
}

export default CartRepository;
