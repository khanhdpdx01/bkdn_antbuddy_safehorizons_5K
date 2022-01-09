import BaseController from '../../infrastructure/Controllers/BaseController';
import Service from './OrderDetailsService';
import {
    NotFoundError,
} from '../../errors/index';
import {
    ORDER_NOT_FOUND,
} from '../../constants/HttpMessage';

class OrderDetailsController extends BaseController {
    constructor() {
        super();
        this.orderDetailsService = Service.getOrderDetailsService();
    }

    static getOrderDetailsController() {
        if (!OrderDetailsController.instance) {
            OrderDetailsController.instance = new OrderDetailsController();
        }
        return OrderDetailsController.instance;
    }

    async getAllOrderDetails(req, res) {
        const {
            sortBy, limit, page,
        } = req.query;
        const orderDetails = await this.orderDetailsService.getAllOrderDetails({
            sortBy, limit, page,
        });
        return res.status(200).json({ orderDetails });
    }

    async getOrderDetails(req, res, next) {
        try {
            const orderDetails = await this.orderDetailsService.getBy({ id: req.params.orderDetailsId });
            if (!orderDetails) {
                throw new NotFoundError(ORDER_NOT_FOUND);
            }

            return res.status(200).json({ orderDetails });
        } catch (err) {
            return next(err);
        }
    }

    async createOrderDetails(req, res, next) {
        try {
            const orderDetails = await this.orderDetailsService.addNewOrderDetails(req.body);
            return res.status(201).json({ orderDetails });
        } catch (err) {
            next(err);
        }
    }

    async updateOrderDetails(req, res, next) {
        try {
            const { orderDetailsId } = req.params;
            const orderDetails = await this.orderDetailsService.findOneByCustomerId(orderDetailsId);
            if (orderDetails) {
                throw new NotFoundError(ORDER_NOT_FOUND);
            }

            const orderDetailsUpdate = await this.orderDetailsService.updateOrderDetails(
                orderDetailsId,
                {
                    customer_id: req.body.customer_id,
                    employee_id: req.body.employee_id,
                    shipper_id: req.body.shipper_id,
                    orderDetails_status_id: req.body.orderDetails_status_id,
                    payment_id: req.body.payment_id,
                    orderDetails_date: req.body.orderDetails_date,
                    orderDetails_address: req.body.orderDetails_address,
                    ship_fee: req.body.ship_fee,
                    created_at: req.body.created_at,
                    updated_at: req.body.updated_at,
                },
            );

            return res.status(200).json({ updateOrderDetails });
        } catch (err) {
            next(err);
        }
    }

    async deleteOneOrderDetails(req, res, next) {
        try {
            const result = await this.orderDetailsService.deleteOne(req.params.orderDetailsId);
            if (result) {
                return res.status(200).json({
                    statusCode: 200,
                    message: 'Delete orderDetails successfully completed',
                });
            }

            throw new NotFoundError(ORDER_NOT_FOUND);
        } catch (err) {
            next(err);
        }
    }
}
export default OrderDetailsController;
