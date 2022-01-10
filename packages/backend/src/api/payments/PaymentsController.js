import BaseController from '../../infrastructure/Controllers/BaseController';
import Service from './PaymentsService';
import {
    NotFoundError,
} from '../../errors/index';
import {
    PAYMENT_NOT_FOUND,
} from '../../constants/HttpMessage';

class PaymentsController extends BaseController {
    constructor() {
        super();
        this.paymentsService = Service.getPaymentsService();
    }

    static getPaymentsController() {
        if (!PaymentsController.instance) {
            PaymentsController.instance = new PaymentsController();
        }
        return PaymentsController.instance;
    }

    async getAllPayments(req, res) {
        const {
            sortBy, limit, page,
        } = req.query;
        const payments = await this.paymentsService.getAllPayments({
            sortBy, limit, page,
        });
        return res.status(200).json({ payments });
    }

    async getPayment(req, res, next) {
        try {
            const payment = await this.paymentsService.getBy({ id: req.params.paymentId });
            if (!payment) {
                throw new NotFoundError(PAYMENT_NOT_FOUND);
            }

            return res.status(200).json({ payment });
        } catch (err) {
            return next(err);
        }
    }

    async createPayment(req, res, next) {
        try {
            const payment = await this.paymentsService.addNewPayment(req.body);
            return res.status(201).json({ payment });
        } catch (err) {
            next(err);
        }
    }

    async updatePayment(req, res, next) {
        try {
            const { paymentId } = req.params;
            const payment = await this.paymentsService.findOneByPaymentId(paymentId);
            if (payment) {
                throw new NotFoundError(PAYMENT_NOT_FOUND);
            }

            const paymentUpdate = await this.paymentsService.updatePayment(
                paymentId,
                {
                    payment_name: req.body.payment_name,
                },
            );

            return res.status(200).json({ updatePayment });
        } catch (err) {
            next(err);
        }
    }

    async deleteOnePayment(req, res, next) {
        try {
            const result = await this.paymentsService.deleteOne(req.params.paymentId);
            if (result) {
                return res.status(200).json({
                    statusCode: 200,
                    message: 'Delete payment successfully completed',
                });
            }

            throw new NotFoundError(PAYMENT_NOT_FOUND);
        } catch (err) {
            next(err);
        }
    }
}
export default PaymentsController;
