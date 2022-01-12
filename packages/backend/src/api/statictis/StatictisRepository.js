import BaseRepository from '../../infrastructure/Repositories/BaseRepository';

class StatictisRepository extends BaseRepository {
    static getStatictisRepository() {
        if (!StatictisRepository.instance) {
            StatictisRepository.instance = new StatictisRepository();
        }
        return StatictisRepository.instance;
    }

    getTableName() {
        return 'orders';
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

export default StatictisRepository;
