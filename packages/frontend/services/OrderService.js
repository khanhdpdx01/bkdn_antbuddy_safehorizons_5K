import Service from './Service';

class OrderService {
    constructor(callback) {
        this.callback = callback;
    }

    async addOrder(data) {
        try {
            const order = await Service.post('/orders', JSON.stringify(data));
            return order.data;
        } catch (err) {
            return ({ error: JSON.stringify(err) });
        }
    }

}
export default new OrderService();