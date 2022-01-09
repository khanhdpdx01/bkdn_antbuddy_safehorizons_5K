import Repository from './OrderDetailsRepository';
import paginate from '../../utils/paginate';

class OrderDetailsService {
    constructor() {
        this.orderDetailsRepository = Repository.getOrderDetailsRepository();
    }

    static getOrderDetailsService() {
        if (!OrderDetailsService.instance) {
            OrderDetailsService.instance = new OrderDetailsService();
        }
        return OrderDetailsService.instance;
    }

    async addNewOrderDetails(orderDetails) {
        const newOrderDetails = await this.orderDetailsRepository.create(orderDetails);
        return newOrderDetails;
    }

    async getAllOrderDetails(options) {
        const pagingAndSort = paginate(options);
        const countOrderDetails = this.orderDetailsRepository.count();
        const orderDetailss = this.orderDetailsRepository.findAll(pagingAndSort);
        return Promise.all([countOrderDetails, orderDetailss]).then((results) => {
            const [counts, data] = results;
            const totalPages = Math.ceil(counts[0].count / pagingAndSort.limit);
            return Promise.resolve({
                orderDetailss: data,
                totalPages,
                limit: pagingAndSort.limit,
                page: pagingAndSort.page,
                totalOrderDetails: counts[0].count,
            });
        });
    }

    async findOneByOrderId(orderId, productId) {
        const orderDetails = await this.orderDetailsRepository.getBy({ order_id: orderId, product_id: productId});
        return orderDetails;
    }

    async updateOrderDetails(orderId, productId, orderDetailsBody) {
        const customerUpdate = await this.orderDetailsRepository.update(
            { orderId: orderId },
            { productId: productId },
            { orderDetailsBody },
        );
        return customerUpdate;
    }

    async deleteOne(orderId, productId) {
        const result = await this.orderDetailsRepository.deleteOne(orderId, productId);
        return result;
    }
}

export default OrderDetailsService;
