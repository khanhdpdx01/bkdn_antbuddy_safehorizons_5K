import Repository from './OrdersStatusRepository';
import paginate from '../../utils/paginate';

class OrdersStatusService {
    constructor() {
        this.ordersStatusRepository = Repository.getOrdersStatusRepository();
    }

    static getOrdersStatusService() {
        if (!OrdersStatusService.instance) {
            OrdersStatusService.instance = new OrdersStatusService();
        }
        return OrdersStatusService.instance;
    }

    async addNewOrdersStatus(ordersStatus) {
        const newOrdersStatus = await this.ordersStatusRepository.create(ordersStatus);
        return newOrdersStatus;
    }

    async getAllOrdersStatus(options) {
        const pagingAndSort = paginate(options);
        const countOrdersStatus = this.ordersStatusRepository.count();
        const ordersStatus = this.ordersStatusRepository.findAll(pagingAndSort);
        return Promise.all([countOrdersStatus, ordersStatus]).then((results) => {
            const [counts, data] = results;
            const totalPages = Math.ceil(counts[0].count / pagingAndSort.limit);
            return Promise.resolve({
                ordersStatus: data,
                totalPages,
                limit: pagingAndSort.limit,
                page: pagingAndSort.page,
                totalProducts: counts[0].count,
            });
        });
    }

    async findOneByOrdersStatus(ordersStatusId) {
        const ordersStatus = await this.ordersStatusRepository.getBy({ id: ordersStatusId });
        return ordersStatus;
    }

    async updateProduct(ordersStatusId, ordersStatusBody) {
        const ordersStatusUpdate = await this.ordersStatusRepository.update(
            { id: ordersStatusId },
            { ordersStatusBody },
        );
        return ordersStatusUpdate;
    }

    async deleteOne(ordersStatusId) {
        const result = await this.ordersStatusRepository.deleteOne(ordersStatusId);
        return result;
    }
}

export default OrdersStatusService;
