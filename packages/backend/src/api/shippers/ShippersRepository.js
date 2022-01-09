import BaseRepository from '../../infrastructure/Repositories/BaseRepository';

class ShippersRepository extends BaseRepository {
    static getShippersRepository() {
        if (!ShippersRepository.instance) {
            ShippersRepository.instance = new ShippersRepository();
        }
        return ShippersRepository.instance;
    }

    getTableName() {
        return 'shippers';
    }

    findAll(pagingAndSort) {
        return this.listByPagingAndSort(pagingAndSort);
    }

    findByShipperId(shipperId) {
        return this.getBy({ shipper_id: shipperId });
    }

    deleteOne(shipperId) {
        return this.delete({ shipper_id: shipperId });
    }
}

export default ShippersRepository;
