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
            .where({ cart_id: cartId, product_id: productId}).first();
 
        return result;
    }

    async insertCartItem(cartItemBody) {
        const result = await knex('cart_items').insert(cartItemBody);
        return result;
    }

    async updateCartItem(clauses = {}, cartItemBody) {
        const result = await knex('cart_items').where(clauses)
                            .update(cartItemBody);
        return result;
    }

    async deleteCartItem(clauses = {}) {
        const result = await knex('cart_items').where(clauses)
                            .del();
        return result;
    }

}

export default CartRepository;
