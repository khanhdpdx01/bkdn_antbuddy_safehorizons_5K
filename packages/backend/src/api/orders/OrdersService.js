import Repository from './OrdersRepository';
import paginate from '../../utils/paginate';
import ProductsRepository from '../products/ProductsRepository';
import CustomerRepository from '../customers/CustomersRepository';

class OrdersService {
    constructor() {
        this.orderRepository = Repository.getOrdersRepository();
        this.productRepository = ProductsRepository.getProductsRepository();
        this.customerRepository = CustomerRepository.getCustomersRepository();
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
            order_date: new Date()
        });
        await this.addOrderDetails(orderId, order.line_items);
        const result = await this.findOneByOrderId(orderId);
        return result;
    }

    async getAllOrders(options) {
        const pagingAndSort = paginate(options);
        const countOrders = this.orderRepository.count();
        const orders = this.orderRepository.findAll(pagingAndSort);
        
        const [counts, listOrder] = await Promise.all([countOrders, orders]);
        const totalPages = Math.ceil(counts[0].count / pagingAndSort.limit);
        const data = await Promise.all(listOrder.map(async function(order) {
            const newOrder = await OrdersService.getOrdersService().findOneByOrderId(order.order_id);
            return newOrder;
        }));

        return {
            orders: data,
            totalPages,
            limit: pagingAndSort.limit,
            page: pagingAndSort.page,
            totalOrders: counts[0].count,
        };
    }

    async findOneByOrderId(orderId) {
        const order = await this.orderRepository.getBy({order_id: orderId});
        const order_details = await this.findOrderDetails(orderId);
        const orders_status = await this.orderRepository
            .findOrdersStatus({orders_status_id: order.orders_status_id});
        const customer = await this.customerRepository
            .getBy({customer_id: order.customer_id});
        let subTotalPrice = 0, shippingFee = 0, totalPrice = 0; 

        order_details.forEach(function(orderDetail) {
            subTotalPrice += orderDetail.quantity * orderDetail.price * (100 - orderDetail.discount) / 100;
            shippingFee += orderDetail.ship_fee;
        })
        totalPrice = subTotalPrice + shippingFee;
            
        order.customer = customer;
        order.orders_status = orders_status;
        order.sub_tolal_price = subTotalPrice;
        order.ship_fee = shippingFee;
        order.total_price = totalPrice;
        order.line_items = order_details;
        delete order.orders_status_id;
        delete order.customer_id;
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
