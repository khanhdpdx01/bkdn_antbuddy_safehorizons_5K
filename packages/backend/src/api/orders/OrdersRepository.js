import BaseRepository from '../../infrastructure/Repositories/BaseRepository';
import knex from '../../config/connection';

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

    deleteOne(orderId) {
        return this.delete({ id: orderId });
    }

    async addOrderDetails(orderDetails) {
        const result = await knex('order_details').insert(orderDetails);
        return result;
    }

    async findOrderDetails(clauses = {}, columns = '*') {
        const result = await knex('order_details').select(columns)
                            .where(clauses);
        return result;
    }

    async findOrderDetailsStatus(clauses = {}, columns = '*') {
        const result = await knex('order_details_status').select(columns)
                            .where(clauses);
        return result;
    }

    async findOrdersStatus(clauses = {}, columns = '*') {
        const result = await knex('orders_status').select(columns)
                            .where(clauses).first();
        return result;
    }
}

export default OrdersRepository;
