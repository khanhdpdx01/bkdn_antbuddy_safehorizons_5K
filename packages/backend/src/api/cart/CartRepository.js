import BaseRepository from '../../infrastructure/Repositories/BaseRepository';

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
}

export default CartRepository;
