import Repository from './PaymentRepository';
import paginate from '../../utils/paginate';

class PaymentService {
    constructor() {
        this.paymentsRepository = Repository.getPaymentRepository();
    }

    static getPaymentService() {
        if (!PaymentService.instance) {
            PaymentService.instance = new PaymentService();
        }
        return PaymentService.instance;
    }

    async addNewPayment(payment) {
        const newPayment = await this.paymentsRepository.create(payment);
        return newPayment;
    }

    async getAllPayments(options) {
        const pagingAndSort = paginate(options);
        const countPayments = this.paymentsRepository.count();
        const payments = this.paymentsRepository.findAll(pagingAndSort);
        return Promise.all([countPayments, payments]).then((results) => {
            const [counts, data] = results;
            const totalPages = Math.ceil(counts[0].count / pagingAndSort.limit);
            return Promise.resolve({
                payments: data,
                totalPages,
                limit: pagingAndSort.limit,
                page: pagingAndSort.page,
                totalProducts: counts[0].count,
            });
        });
    }

    async findOneByPayment(paymentId) {
        const payment = await this.paymentsRepository.getBy({ id: paymentId });
        return payment;
    }

    async updateProduct(paymentId, paymentBody) {
        const paymentUpdate = await this.paymentsRepository.update(
            { id: paymentId },
            { paymentBody },
        );
        return paymentUpdate;
    }

    async deleteOne(paymentId) {
        const result = await this.paymentsRepository.deleteOne(paymentId);
        return result;
    }
}

export default PaymentService;
