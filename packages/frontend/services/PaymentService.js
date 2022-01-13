import Service from './Service';

class PaymentService {
    constructor(callback) {
        this.callback = callback;
    }

    async getPayments(params) {
        try {
            const payments = await Service.get('/payments', { params });
            return payments.data;
        } catch (err) {
            return ({ error: JSON.stringify(err) });
        }
    }

}
export default new PaymentService();