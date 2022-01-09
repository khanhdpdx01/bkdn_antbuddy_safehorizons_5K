import Repository from './OrdersRepository';
import paginate from '../../utils/paginate';

class OrdersService {
    constructor() {
        this.orderRepository = Repository.getOrdersRepository();
    }

    static getOrdersService() {
        if (!OrdersService.instance) {
            OrdersService.instance = new OrdersService();
        }
        return OrdersService.instance;
    }

    async addNewOrder(order) {
        const newOrder = await this.orderRepository.create(order);
        return newOrder;
    }

    async getAllOrders(options) {
        const pagingAndSort = paginate(options);
        const countOrders = this.orderRepository.count();
        const orders = this.orderRepository.findAll(pagingAndSort);
        return Promise.all([countOrders, orders]).then((results) => {
            const [counts, data] = results;
            const totalPages = Math.ceil(counts[0].count / pagingAndSort.limit);
            return Promise.resolve({
                orders: data,
                totalPages,
                limit: pagingAndSort.limit,
                page: pagingAndSort.page,
                totalOrders: counts[0].count,
            });
        });
    }

    async findOneByOrderId(orderId) {
        const order = await this.orderRepository.getBy({ id: orderId });
        return order;
    }

    async updateOrder(orderId, orderBody) {
        const customerUpdate = await this.orderRepository.update(
            { id: orderId },
            { orderBody },
        );
        return customerUpdate;
    }

    async deleteOne(orderId) {
        const result = await this.orderRepository.deleteOne(orderId);
        return result;
    }
}

export default OrdersService;
