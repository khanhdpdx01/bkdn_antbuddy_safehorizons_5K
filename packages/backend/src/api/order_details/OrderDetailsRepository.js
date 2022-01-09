import BaseRepository from '../../infrastructure/Repositories/BaseRepository';

class OrderDetailsRepository extends BaseRepository {
    static getOrderDetailsRepository() {
        if (!OrderDetailsRepository.instance) {
            OrderDetailsRepository.instance = new OrderDetailsRepository();
        }
        return OrderDetailsRepository.instance;
    }

    getTableName() {
        return 'order_details';
    }

    findAll(pagingAndSort) {
        return this.listByPagingAndSort(pagingAndSort);
    }

    findByOrderDetailsId(orderDetailsId) {
        return this.getBy({ id: orderDetailsId });
    }

    deleteOne(orderDetailsId) {
        return this.delete({ id: orderDetailsId });
    }
}

export default OrderDetailsRepository;
