import BaseRepository from '../../infrastructure/Repositories/BaseRepository';

class OrderDetailsStatusRepository extends BaseRepository {
    static getOrderDetailsStatusRepository() {
        if (!OrderDetailsStatusRepository.instance) {
            OrderDetailsStatusRepository.instance = new OrderDetailsStatusRepository();
        }
        return OrderDetailsStatusRepository.instance;
    }

    getTableName() {
        return 'order_details_status';
    }

    findAll(pagingAndSort) {
        return this.listByPagingAndSort(pagingAndSort);
    }

    findByOrderDetailsStatusId(orderDetailsStatusId) {
        return this.getBy({ id: orderDetailsStatusId });
    }
    
    deleteOne(orderDetailsStatusId) {
        return this.delete({ id: orderDetailsStatusId });
    }
}

export default OrderDetailsStatusRepository;
