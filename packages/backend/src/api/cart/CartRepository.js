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

    async findByCartId(cartId, columns = '*') {
        let subTotalPrice = 0, shippingFee = 0, totalPrice = 0;
        const cart = await knex('cart').select(columns)
                        .where({'cart.cart_id': cartId}).first();  

        let lineItems = await knex('cart_items').select(columns)
                        .where({'cart_items.cart_id': cart.cart_id});

        lineItems = await Promise.all(lineItems.map(async function(lineItem) {
            let product = await knex('products').select(columns)
                            .where({'products.product_id': lineItem.product_id}).first();
            let supplier = await knex('suppliers').select(columns)
                            .where({'suppliers.supplier_id': product.supplier_id}).first();
            product.supplier = supplier;
            delete product.supplier_id;

            lineItem.product = product;
            delete lineItem.product_id;
            delete lineItem.cart_id;
            
            subTotalPrice += lineItem.quantity * lineItem.price * lineItem.discount / 100;
            shippingFee += lineItem.ship_fee;
            return lineItem;
        }));        
        totalPrice = subTotalPrice + shippingFee;
      
        cart.line_items = lineItems;
        cart.sub_total_price = subTotalPrice;
        cart.shipping_fee = shippingFee;
        cart.total_price = totalPrice;
        return cart;
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
        let cartItem = await knex('cart_items').select(columns)
            .where({ cart_id: cartId, product_id: productId}).first();

        if(cartItem) {
            let product = await knex('products').select(columns)
            .where({'products.product_id': cartItem.product_id}).first();
            let supplier = await knex('suppliers').select(columns)
                .where({'suppliers.supplier_id': product.supplier_id}).first();
            product.supplier = supplier;
            delete product.supplier_id;

            cartItem.product = product;
            delete cartItem.product_id;
        }
        return cartItem;
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
