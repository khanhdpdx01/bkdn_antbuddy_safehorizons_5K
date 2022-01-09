import Repository from './OrderDetailsStatusRepository';
import paginate from '../../utils/paginate';

class OrderDetailsStatusService {
    constructor() {
        this.orderDetailsStatusRepository = Repository.getOrderDetailsStatusRepository();
    }

    static getOrderDetailsStatusService() {
        if (!OrderDetailsStatusService.instance) {
            OrderDetailsStatusService.instance = new OrderDetailsStatusService();
        }
        return OrderDetailsStatusService.instance;
    }

    async addNewOrderDetailsStatus(orderDetailsStatus) {
        const newOrderDetailsStatus = await this.orderDetailsStatusRepository.create(orderDetailsStatus);
        return newOrderDetailsStatus;
    }

    async getAllOrderDetailsStatus(options) {
        const pagingAndSort = paginate(options);
        const countOrderDetailsStatus = this.orderDetailsStatusRepository.count();
        const orderDetailsStatus = this.orderDetailsStatusRepository.findAll(pagingAndSort);
        return Promise.all([countOrderDetailsStatus, orderDetailsStatus]).then((results) => {
            const [counts, data] = results;
            const totalPages = Math.ceil(counts[0].count / pagingAndSort.limit);
            return Promise.resolve({
                orderDetailsStatus: data,
                totalPages,
                limit: pagingAndSort.limit,
                page: pagingAndSort.page,
                totalProducts: counts[0].count,
            });
        });
    }

    async findOneByOrderDetailsStatus(orderDetailsStatusId) {
        const orderDetailsStatus = await this.orderDetailsStatusRepository.getBy({ id: orderDetailsStatusId });
        return orderDetailsStatus;
    }

    async updateProduct(orderDetailsStatusId, orderDetailsStatusBody) {
        const orderDetailsStatusUpdate = await this.orderDetailsStatusRepository.update(
            { id: orderDetailsStatusId },
            { orderDetailsStatusBody },
        );
        return orderDetailsStatusUpdate;
    }

    async deleteOne(orderDetailsStatusId) {
        const result = await this.orderDetailsStatusRepository.deleteOne(orderDetailsStatusId);
        return result;
    }
}

export default OrderDetailsStatusService;
