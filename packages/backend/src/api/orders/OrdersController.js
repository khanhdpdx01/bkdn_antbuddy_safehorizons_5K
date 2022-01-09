import BaseController from '../../infrastructure/Controllers/BaseController';
import Service from './OrdersService';
import {
    NotFoundError,
} from '../../errors/index';
import {
    ORDER_NOT_FOUND,
} from '../../constants/HttpMessage';

class OrderController extends BaseController {
    constructor() {
        super();
        this.orderService = Service.getOrdersService();
    }

    static getOrdersController() {
        if (!OrderController.instance) {
            OrderController.instance = new OrderController();
        }
        return OrderController.instance;
    }

    async getAllOrders(req, res) {
        const {
            sortBy, limit, page,
        } = req.query;
        const orders = await this.orderService.getAllOrders({
            sortBy, limit, page,
        });
        return res.status(200).json({ orders });
    }

    async getOrder(req, res, next) {
        try {
            const order = await this.orderService.getBy({ id: req.params.orderId });
            if (!order) {
                throw new NotFoundError(ORDER_NOT_FOUND);
            }

            return res.status(200).json({ order });
        } catch (err) {
            return next(err);
        }
    }

    async createOrder(req, res, next) {
        try {
            const order = await this.orderService.addNewOrder(req.body);
            return res.status(201).json({ order });
        } catch (err) {
            next(err);
        }
    }

    async updateOrder(req, res, next) {
        try {
            const { orderId } = req.params;
            const order = await this.orderService.findOneByCustomerId(orderId);
            if (order) {
                throw new NotFoundError(ORDER_NOT_FOUND);
            }

            const orderUpdate = await this.orderService.updateOrder(
                orderId,
                {
                    customer_id: req.body.customer_id,
                    employee_id: req.body.employee_id,
                    shipper_id: req.body.shipper_id,
                    orders_status_id: req.body.orders_status_id,
                    payment_id: req.body.payment_id,
                    order_date: req.body.order_date,
                    order_address: req.body.order_address,
                    ship_fee: req.body.ship_fee,
                    created_at: req.body.created_at,
                    updated_at: req.body.updated_at,
                },
            );

            return res.status(200).json({ updateOrder });
        } catch (err) {
            next(err);
        }
    }

    async deleteOneOrder(req, res, next) {
        try {
            const result = await this.orderService.deleteOne(req.params.orderId);
            if (result) {
                return res.status(200).json({
                    statusCode: 200,
                    message: 'Delete order successfully completed',
                });
            }

            throw new NotFoundError(ORDER_NOT_FOUND);
        } catch (err) {
            next(err);
        }
    }
}
export default OrderController;
