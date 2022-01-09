import BaseRepository from '../../infrastructure/Repositories/BaseRepository';

class OrdersStatusRepository extends BaseRepository {
    static getOrdersStatusRepository() {
        if (!OrdersStatusRepository.instance) {
            OrdersStatusRepository.instance = new OrdersStatusRepository();
        }
        return OrdersStatusRepository.instance;
    }

    getTableName() {
        return 'orders_status';
    }

    findAll(pagingAndSort) {
        return this.listByPagingAndSort(pagingAndSort);
    }

    findByOrdersStatusId(ordersStatusId) {
        return this.getBy({ id: ordersStatusId });
    }
    
    deleteOne(ordersStatusId) {
        return this.delete({ id: ordersStatusId });
    }
}

export default OrdersStatusRepository;
