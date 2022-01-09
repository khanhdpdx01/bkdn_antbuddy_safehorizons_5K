import BaseRepository from '../../infrastructure/Repositories/BaseRepository';

class OrdersRepository extends BaseRepository {
    static getOrdersRepository() {
        if (!OrdersRepository.instance) {
            OrdersRepository.instance = new OrdersRepository();
        }
        return OrdersRepository.instance;
    }

    getTableName() {
        return 'orders';
    }

    findAll(pagingAndSort) {
        return this.listByPagingAndSort(pagingAndSort);
    }

    findByOrdersId(orderId) {
        return this.getBy({ id: orderId });
    }

    deleteOne(orderId) {
        return this.delete({ id: orderId });
    }
}

export default OrdersRepository;
