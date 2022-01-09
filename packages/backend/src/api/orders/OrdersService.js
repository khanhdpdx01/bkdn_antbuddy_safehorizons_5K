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

    async addNewOrder(customerId, order) {
        const orderId = await this.orderRepository.create({
            customer_id: customerId,
            orders_status_id: order.orders_status_id,
            payment_id: order.payment_id,
            order_address: order.order_address,
            ship_fee: order.ship_fee,
        });
        await this.addOrderDetails(orderId, order.line_items);
        const result = await this.findOneByOrderId(orderId);
        return result;
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
        const order = await this.orderRepository.getBy({order_id: orderId});
        const order_details = await this.findOrderDetails(orderId);
        order.line_items = order_details;
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

    async addOrderDetails(orderId, lineItems) {
        const orderDetails = lineItems.map(function(lineItem) {
            return {
                order_id: orderId,
                product_id: lineItem.product_id,
                order_details_status_id: lineItem.order_details_status_id,
                quantity: lineItem.quantity,
                price: lineItem.price,
                discount: lineItem.discount
            }
        });

        const result = await this.orderRepository.addOrderDetails(orderDetails);
        return result;
    }

    async findOrderDetails(orderId) {
        const orderDetails = await this.orderRepository.findOrderDetails({
            order_id: orderId
        });
        return orderDetails;
    }
}

export default OrdersService;
