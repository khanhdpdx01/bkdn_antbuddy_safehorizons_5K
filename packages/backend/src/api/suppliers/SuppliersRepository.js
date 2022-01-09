import BaseRepository from '../../infrastructure/Repositories/BaseRepository';

class SuppliersRepository extends BaseRepository {
    static getSuppliersRepository() {
        if (!SuppliersRepository.instance) {
            SuppliersRepository.instance = new SuppliersRepository();
        }
        return SuppliersRepository.instance;
    }

    getTableName() {
        return 'suppliers';
    }

    findAll(pagingAndSort) {
        return this.listByPagingAndSort(pagingAndSort);
    }

    findBySupplierId(supplierId) {
        return this.getBy({ supplier_id: supplierId });
    }

    deleteOne(supplierId) {
        return this.delete({ supplier_id: supplierId });
    }
}

export default SuppliersRepository;
