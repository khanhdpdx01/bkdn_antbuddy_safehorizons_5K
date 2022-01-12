import Service from './Services';

class OrderService {
    constructor(callback) {
        this.callback = callback;
    }

    async getOrders(params) {
        try {
            const orders = await Service.get('/orders', { params });
            console.log(orders.data)
            return orders.data;
        } catch (err) {
            console.log(err);
            return ({ error: JSON.stringify(err) });
        }
    }
}
export default new OrderService();