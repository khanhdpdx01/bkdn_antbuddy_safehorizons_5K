import Repository from './ShippersRepository';
import paginate from '../../utils/paginate';

class ShippersService {
    constructor() {
        this.shippersRepository = Repository.getShippersRepository();
    }

    static getShippersService() {
        if (!ShippersService.instance) {
            ShippersService.instance = new ShippersService();
        }
        return ShippersService.instance;
    }

    async addNewShipper(shipper) {
        const newShipper = await this.shippersRepository.create(shipper);
        return newShipper;
    }

    async getAllShippers(options) {
        const pagingAndSort = paginate(options);
        const countShippers = this.shippersRepository.count();
        const shippers = this.shippersRepository.findAll(pagingAndSort);
        return Promise.all([countShippers, shippers]).then((results) => {
            const [counts, data] = results;
            const totalPages = Math.ceil(counts[0].count / pagingAndSort.limit);
            return Promise.resolve({
                shippers: data,
                totalPages,
                limit: pagingAndSort.limit,
                page: pagingAndSort.page,
                totalShippers: counts[0].count,
            });
        });
    }

    async findOneByShipperId(shipperId) {
        const shipper = await this.shippersRepository.findByShipperId(shipperId);
        return shipper;
    }

    async updateShipper(shipperId, shipperBody) {
        const shipperUpdate = await this.shippersRepository.update(
            { shipper_id: shipperId },
            { ...shipperBody },
        );
        return shipperUpdate;
    }

    async deleteOne(shipperId) {
        const result = await this.shippersRepository.deleteOne(shipperId);
        return result;
    }
}

export default ShippersService;
